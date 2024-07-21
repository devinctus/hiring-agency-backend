// backend/controllers/applicantController.ts
import { Request, Response } from 'express';
import Applicant from '../models/Applicant';
import asyncHandler from 'express-async-handler';

export const getApplicants = asyncHandler(
    async (req: Request, res: Response) => {
        const applicants = await Applicant.find().select(
            '-createdAt -updatedAt -__v',
        );
        res.status(200).json(applicants);
    },
);

export const createApplicant = asyncHandler(
    async (req: Request, res: Response) => {
        const {
            name,
            surname,
            patronymic,
            qualification,
            professionalArea,
            salary,
        } = req.body;
        const applicantExists = await Applicant.findOne({
            name,
            surname,
            patronymic,
        });

        if (applicantExists) {
            res.status(400).json({ message: 'Applicant already exists' });
            return;
        }

        const applicant = new Applicant({
            name,
            surname,
            patronymic,
            qualification,
            professionalArea,
            salary,
        });

        const createdApplicant = await applicant.save();
        res.status(201).json({
            message: 'Applicant created',
            createdApplicant,
        });
    },
);

export const updateApplicant = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const applicant = await Applicant.findById(id);

        if (applicant) {
            const name = req.body.name || applicant.name;
            const surname = req.body.surname || applicant.surname;
            const patronymic = req.body.patronymic || applicant.patronymic;
            const qualification =
                req.body.qualification || applicant.qualification;
            const professionalArea =
                req.body.professionalArea || applicant.professionalArea;
            const salary = req.body.salary || applicant.salary;
            const applicantExists = await Applicant.findOne({
                name,
                surname,
                patronymic,
                _id: { $ne: id },
            });

            if (applicantExists) {
                res.status(400).json({ message: 'Applicant already exists' });
                return;
            }

            const updatedApplicant = await Applicant.findByIdAndUpdate(
                id,
                {
                    name,
                    surname,
                    patronymic,
                    qualification,
                    professionalArea,
                    salary,
                },
                { returnOriginal: false },
            );
            res.status(201).json({
                message: 'Applicant updated',
                updatedApplicant,
            });
        } else {
            res.status(404).json({ message: 'Applicant not found' });
        }
    },
);

export const deleteApplicant = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const applicant = await Applicant.findByIdAndDelete(id);

        if (applicant) {
            res.status(202).json({ message: 'Applicant deleted' });
        } else {
            res.status(404).json({ message: 'Applicant not found' });
        }
    },
);

export const hireApplicant = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const applicant = await Applicant.findByIdAndUpdate(id, {
            isHired: true,
        });

        if (applicant) {
            res.status(202).json({ message: 'Applicant hired' });
        } else {
            res.status(404).json({ message: 'Applicant not found' });
        }
    },
);
