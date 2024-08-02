import express from 'express';
import {
    createVacancy,
    getVacancies,
    getVacancyById,
    updateVacancy,
    deleteVacancy,
    changeStatusVacancy,
} from '../controllers/vacancyController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vacancies
 *   description: API to manage vacancies.
 */

/**
 * @swagger
 * /api/vacancies/all:
 *   get:
 *     summary: Get all vacancies
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all vacancies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   employer:
 *                     type: string
 *                   jobPosition:
 *                     type: string
 *                   professionalArea:
 *                     type: string
 *                   salary:
 *                     type: number
 *                   isOpen:
 *                     type: boolean
 *       401:
 *         description: Not authorized.
 */
router.get('/all', auth, getVacancies);

/**
 * @swagger
 * /api/vacancies/{id}:
 *   get:
 *     summary: Get a vacancy by ID
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Vacancy ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     responses:
 *       200:
 *         description: Vacancy retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   _id:
 *                     type: string
 *                   employer:
 *                     type: string
 *                   jobPosition:
 *                     type: string
 *                   professionalArea:
 *                     type: string
 *                   salary:
 *                     type: number
 *                   isOpen:
 *                     type: boolean
 *       404:
 *         description: Vacancy not found.
 */
router.get('/:id', auth, getVacancyById);

/**
 * @swagger
 * /api/vacancies/create:
 *   post:
 *     summary: Create a new vacancy
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employerId:
 *                 type: string
 *               jobPosition:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               salary:
 *                 type: number
 *               isOpen:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Vacancy created successfully.
 *       400:
 *         description: Invalid vacancy data.
 */
router.post('/create', auth, createVacancy);

/**
 * @swagger
 * /api/vacancies/update/{id}:
 *   put:
 *     summary: Update a vacancy
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Vacancy ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     requestBody:
 *       description: Only updated fields needed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employerId:
 *                 type: string
 *               jobPosition:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               salary:
 *                 type: number
 *               isOpen:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Vacancy updated successfully.
 *       400:
 *         description: Invalid vacancy data.
 *       404:
 *         description: Vacancy not found.
 */
router.put('/update/:id', auth, updateVacancy);

/**
 * @swagger
 * /api/vacancies/delete/{id}:
 *   delete:
 *     summary: Delete a vacancy
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Vacancy ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     responses:
 *       202:
 *         description: Vacancy deleted successfully.
 *       404:
 *         description: Vacancy not found.
 */
router.delete('/delete/:id', auth, deleteVacancy);

/**
 * @swagger
 * /api/vacancies/change-status/{id}:
 *   put:
 *     summary: Change status a vacancy
 *     tags: [Vacancies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Vacancy ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isOpen:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Vacancy isOpen status changed successfully.
 *       404:
 *         description: Vacancy not found.
 */
router.put('/change-status/:id', auth, changeStatusVacancy);

export default router;
