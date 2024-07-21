import express from 'express';
import {
    createEmployer,
    getEmployers,
    updateEmployer,
    deleteEmployer,
} from '../controllers/employerController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employers
 *   description: API to manage employers.
 */

/**
 * @swagger
 * /api/employers/all:
 *   get:
 *     summary: Get all employers
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all employers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   companyName:
 *                     type: string
 *                   professionalArea:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phone:
 *                     type: string
 *       401:
 *         description: Not authorized.
 */
router.get('/all', auth, getEmployers);

/**
 * @swagger
 * /api/employers/create:
 *   post:
 *     summary: Create a new employer
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employer created successfully.
 *       400:
 *         description: Invalid employer data.
 */
router.post('/create', auth, createEmployer);

/**
 * @swagger
 * /api/employers/update/{id}:
 *   put:
 *     summary: Update an employer
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     requestBody:
 *       description: Only updated fields needed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employer updated successfully.
 *       400:
 *         description: Invalid employer data.
 *       404:
 *         description: Employer not found.
 */
router.put('/update/:id', auth, updateEmployer);

/**
 * @swagger
 * /api/employers/delete/{id}:
 *   delete:
 *     summary: Delete an employer
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employer ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     responses:
 *       202:
 *         description: Employer deleted successfully.
 *       404:
 *         description: Employer not found.
 */
router.delete('/delete/:id', auth, deleteEmployer);

export default router;
