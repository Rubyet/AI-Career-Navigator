import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { query } from '../config/database';

const router = Router();

// Get all applications for user
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM job_applications WHERE user_id = $1 ORDER BY application_date DESC',
      [req.user!.id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Create application
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { job_id, deadline, notes } = req.body;

    const result = await query(
      `INSERT INTO job_applications (user_id, job_id, status, deadline, notes, application_date)
       VALUES ($1, $2, 'interested', $3, $4, NOW())
       RETURNING *`,
      [req.user!.id, job_id, deadline, notes]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Update application
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status, deadline, notes, outcome, shortcomings } = req.body;

    const result = await query(
      `UPDATE job_applications 
       SET status = COALESCE($1, status),
           deadline = COALESCE($2, deadline),
           notes = COALESCE($3, notes),
           outcome = COALESCE($4, outcome),
           shortcomings = COALESCE($5, shortcomings)
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [status, deadline, notes, outcome, shortcomings, id, req.user!.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Delete application
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await query(
      'DELETE FROM job_applications WHERE id = $1 AND user_id = $2',
      [id, req.user!.id]
    );

    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

export default router;
