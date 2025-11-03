import { Router } from 'express';
import axios from 'axios';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { query } from '../config/database';
import logger from '../config/logger';

const router = Router();
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

// Get job listings
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { role, location, minSalary, limit = 50, offset = 0 } = req.query;

    let queryText = 'SELECT * FROM job_listings WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (role) {
      queryText += ` AND title ILIKE $${paramIndex}`;
      params.push(`%${role}%`);
      paramIndex++;
    }

    if (location) {
      queryText += ` AND location ILIKE $${paramIndex}`;
      params.push(`%${location}%`);
      paramIndex++;
    }

    queryText += ` ORDER BY posted_date DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(queryText, params);

    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job details with AI matching
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Get job details
    const jobResult = await query(
      'SELECT * FROM job_listings WHERE id = $1',
      [id]
    );

    if (jobResult.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = jobResult.rows[0];

    // Get user tech stack
    const userResult = await query(
      'SELECT current_tech_stack FROM users WHERE id = $1',
      [req.user!.id]
    );

    const userTechStack = userResult.rows[0]?.current_tech_stack || [];

    // Call AI engine for matching
    const matchResult = await axios.post(`${AI_ENGINE_URL}/api/match-job`, {
      job_description: job.description_text,
      required_skills: job.required_skills,
      user_skills: userTechStack,
    });

    res.json({
      ...job,
      ...matchResult.data,
    });
  } catch (error) {
    logger.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

export default router;
