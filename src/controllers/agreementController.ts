// backend/controllers/agreementController.ts
import { Request, Response } from 'express';
import Agreement from '../models/Agreement';
import Employer from '../models/Employer';
import Applicant from '../models/Applicant';
import asyncHandler from 'express-async-handler';

export const getAgreements = asyncHandler(
    async (req: Request, res: Response) => {
        const agreements = await Agreement.find()
            .populate({
                path: 'employer applicant',
                select: '-createdAt -updatedAt -__v',
            })
            .select('-createdAt -updatedAt -__v');
        res.status(200).json(agreements);
    },
);

export const createAgreement = asyncHandler(
    async (req: Request, res: Response) => {
        const { employerId, applicantId, jobPosition, fees } = req.body;
        const employer = await Employer.findById(employerId);
        const applicant = await Applicant.findById(applicantId);

        if (employer && applicant) {
            const agreement = new Agreement({
                employer,
                applicant,
                jobPosition,
                fees,
            });

            const createdAgreement = await agreement.save();
            res.status(201).json(createdAgreement);
        } else {
            res.status(404).json({
                message: `Employer or applicant not found`,
            });
        }
    },
);

export const updateAgreement = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const agreement = await Agreement.findById(id);

        if (agreement) {
            const employer =
                (await Employer.findById(req.body.employerId)) ||
                agreement.employer;
            const applicant =
                (await Applicant.findById(req.body.applicantId)) ||
                agreement.applicant;
            const jobPosition = req.body.jobPosition || agreement.jobPosition;
            const fees = req.body.fees || agreement.fees;

            const updatedVacancy = await Agreement.findByIdAndUpdate(
                id,
                { employer, applicant, jobPosition, fees },
                { returnOriginal: false },
            );
            res.status(201).json({
                message: 'Agreement updated',
                updatedVacancy,
            });
        } else {
            res.status(404).json({ message: 'Agreement not found' });
        }
    },
);

export const deleteAgreement = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const agreement = await Agreement.findById(id);

        if (agreement) {
            res.status(202).json({ message: 'Agreement deleted' });
        } else {
            res.status(404).json({ message: 'Agreement not found' });
        }
    },
);
