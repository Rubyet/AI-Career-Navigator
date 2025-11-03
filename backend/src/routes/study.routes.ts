import { Router } from 'express';
import axios from 'axios';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { query } from '../config/database';

const router = Router();
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

// Get study topics
router.get('/topics', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM skill_topics WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user!.id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch study topics' });
  }
});

// Create study topic
router.post('/topics', authenticate, async (req: AuthRequest, res) => {
  try {
    const { topic_name, source_job_id } = req.body;

    // Generate study content via AI engine
    const contentResponse = await axios.post(`${AI_ENGINE_URL}/api/generate-content`, {
      topic: topic_name,
    });

    // Save topic
    const topicResult = await query(
      `INSERT INTO skill_topics (user_id, topic_name, source_job_id, is_mastered, progress)
       VALUES ($1, $2, $3, false, 0)
       RETURNING *`,
      [req.user!.id, topic_name, source_job_id]
    );

    const topic = topicResult.rows[0];

    // Save study content
    await query(
      `INSERT INTO study_content (topic_id, interview_q_a, explanations_text)
       VALUES ($1, $2, $3)`,
      [topic.id, JSON.stringify(contentResponse.data.questions), contentResponse.data.explanation]
    );

    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create study topic' });
  }
});

// Update topic progress
router.put('/topics/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { progress, is_mastered } = req.body;

    const result = await query(
      `UPDATE skill_topics 
       SET progress = COALESCE($1, progress),
           is_mastered = COALESCE($2, is_mastered)
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [progress, is_mastered, id, req.user!.id]
    );

    // If mastered, add to user's tech stack
    if (is_mastered) {
      await query(
        `UPDATE users 
         SET current_tech_stack = array_append(current_tech_stack, $1)
         WHERE id = $2 AND NOT ($1 = ANY(current_tech_stack))`,
        [result.rows[0].topic_name, req.user!.id]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update topic' });
  }
});

// Get study content
router.get('/topics/:id/content', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'SELECT * FROM study_content WHERE topic_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Chat with AI
router.post('/chat', authenticate, async (req: AuthRequest, res) => {
  try {
    const { topic_id, message } = req.body;

    // Get topic and content
    const topicResult = await query(
      'SELECT * FROM skill_topics WHERE id = $1 AND user_id = $2',
      [topic_id, req.user!.id]
    );

    if (topicResult.rows.length === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    const contentResult = await query(
      'SELECT * FROM study_content WHERE topic_id = $1',
      [topic_id]
    );

    // Call AI engine
    const response = await axios.post(`${AI_ENGINE_URL}/api/chat`, {
      topic: topicResult.rows[0].topic_name,
      context: contentResult.rows[0]?.explanations_text,
      message,
    });

    // Save chat history
    await query(
      `INSERT INTO chat_history (user_id, topic_id, message_role, message_text)
       VALUES ($1, $2, 'user', $3), ($1, $2, 'ai', $4)`,
      [req.user!.id, topic_id, message, response.data.response]
    );

    res.json({ response: response.data.response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

export default router;
