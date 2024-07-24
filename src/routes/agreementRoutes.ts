import express from 'express';
import {
    createAgreement,
    getAgreements,
    updateAgreement,
    deleteAgreement,
} from '../controllers/agreementController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Agreements
 *   description: API to manage agreements.
 */

/**
 * @swagger
 * /api/agreements/all:
 *   get:
 *     summary: Get all agreements
 *     tags: [Agreements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all agreements.
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
 *                   applicant:
 *                     type: string
 *                   jobPosition:
 *                     type: string
 *                   professionalArea:
 *                     type: string
 *                   fees:
 *                     type: number
 *       401:
 *         description: Not authorized.
 */
router.get('/all', auth, getAgreements);

/**
 * @swagger
 * /api/agreements/create:
 *   post:
 *     summary: Create a new agreement
 *     tags: [Agreements]
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
 *               applicantId:
 *                 type: string
 *               jobPosition:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               fees:
 *                 type: number
 *     responses:
 *       201:
 *         description: Agreement created successfully.
 *       400:
 *         description: Invalid agreement data.
 */
router.post('/create', auth, createAgreement);

/**
 * @swagger
 * /api/agreements/update/{id}:
 *   put:
 *     summary: Update an agreement
 *     tags: [Agreements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Agreement ID (e.g. 66981d223c9f4c4b52f8b87b)
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
 *               applicantId:
 *                 type: string
 *               jobPosition:
 *                 type: string
 *               professionalArea:
 *                 type: string
 *               fees:
 *                 type: number
 *     responses:
 *       201:
 *         description: Agreement updated successfully.
 *       400:
 *         description: Invalid agreement data.
 *       404:
 *         description: Agreement not found.
 */
router.put('/update/:id', auth, updateAgreement);

/**
 * @swagger
 * /api/agreements/delete/{id}:
 *   delete:
 *     summary: Delete an agreement
 *     tags: [Agreements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Agreement ID (e.g. 66981d223c9f4c4b52f8b87b)
 *     responses:
 *       202:
 *         description: Agreement deleted successfully.
 *       404:
 *         description: Agreement not found.
 */
router.delete('/delete/:id', auth, deleteAgreement);

export default router;
