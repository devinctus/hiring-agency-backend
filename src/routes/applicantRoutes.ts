import express from 'express';
import {
    createApplicant,
    getApplicants,
    updateApplicant,
    deleteApplicant,
    hireApplicant,
} from '../controllers/applicantController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applicants
 *   description: API to manage applicants.
 */

/**
 * @swagger
 * /api/applicants/all:
 *   get:
 *     summary: Get all applicants
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all applicants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   patronymic:
 *                     type: string
 *                   qualification:
 *                     type: string
 *                   professionalArea:
 *                     type: string
 *                   salary:
 *                     type: number
 *                   isHired:
 *                     type: boolean
 *       401:
 *         description: Not authorized.
 */
router.get('/all', auth, getApplicants);

/**
 * @swagger
 * /api/applicants/create:
 *   post:
 *     summary: Create a new applicant
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               patronymic:
 *                 type: string
 *               qualification:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               salary:
 *                 type: number
 *               isHired:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Applicant created successfully.
 *       400:
 *         description: Applicant already exists.
 */
router.post('/create', auth, createApplicant);

/**
 * @swagger
 * /api/applicants/update/{id}:
 *   put:
 *     summary: Update an applicant
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Applicant ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     requestBody:
 *       description: Only updated fields needed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               patronymic:
 *                 type: string
 *               qualification:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               salary:
 *                 type: number
 *               isHired:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Applicant updated successfully.
 *       400:
 *         description: Invalid applicant data.
 *       404:
 *         description: Applicant not found.
 */
router.put('/update/:id', auth, updateApplicant);

/**
 * @swagger
 * /api/applicants/delete/{id}:
 *   delete:
 *     summary: Delete an applicant
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Applicant ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     responses:
 *       202:
 *         description: Applicant deleted successfully.
 *       404:
 *         description: Applicant not found.
 */
router.delete('/delete/:id', auth, deleteApplicant);

/**
 * @swagger
 * /api/applicants/hire/{id}:
 *   put:
 *     summary: Hire an applicant
 *     tags: [Applicants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Applicant ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     responses:
 *       202:
 *         description: Applicant hired successfully.
 *       404:
 *         description: Applicant not found.
 */
router.put('/hire/:id', auth, hireApplicant);

export default router;
