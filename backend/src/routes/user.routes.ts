import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { query } from '../config/database';

const router = Router();

// Get user profile
router.get('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT id, email, name, preferences, current_tech_stack FROM users WHERE id = $1',
      [req.user!.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const { name, preferences, current_tech_stack } = req.body;

    const result = await query(
      'UPDATE users SET name = $1, preferences = $2, current_tech_stack = $3 WHERE id = $4 RETURNING id, email, name, preferences, current_tech_stack',
      [name, JSON.stringify(preferences), current_tech_stack, req.user!.id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
