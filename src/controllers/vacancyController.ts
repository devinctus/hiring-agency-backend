import { Request, Response } from 'express';
import Vacancy from '../models/Vacancy';
import Employer from '../models/Employer';
import asyncHandler from 'express-async-handler';

export const getVacancies = asyncHandler(
    async (_req: Request, res: Response) => {
        const vacancies = await Vacancy.find()
            .populate({
                path: 'employer',
                select: '-createdAt -updatedAt -__v',
            })
            .select('-createdAt -updatedAt -__v');
        res.status(200).json(vacancies);
    },
);

export const getVacancyById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const vacancy = await Vacancy.findById(id).select(
            '-createdAt -updatedAt -__v',
        );

        if (vacancy) {
            res.status(200).json(vacancy);
        } else {
            res.status(404).json({ message: 'Vacancy not found' });
        }
    },
);

export const createVacancy = asyncHandler(
    async (req: Request, res: Response) => {
        const { employerId, jobPosition, professionalArea, salary } = req.body;
        const employer = await Employer.findById(employerId);

        if (employer) {
            const vacancy = new Vacancy({
                employer,
                jobPosition,
                professionalArea,
                salary,
            });

            const createdVacancy = await vacancy.save();
            res.status(201).json(createdVacancy);
        } else {
            res.status(404).json({
                message: `Employer with id: ${employerId} not found`,
            });
        }
    },
);

export const updateVacancy = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const vacancy = await Vacancy.findById(id);

        if (vacancy) {
            const employer =
                (await Employer.findById(req.body.employerId)) ||
                vacancy.employer;
            const jobPosition = req.body.jobPosition || vacancy.jobPosition;
            const professionalArea =
                req.body.professionalArea || vacancy.professionalArea;
            const salary = req.body.salary || vacancy.salary;

            const updatedVacancy = await Vacancy.findByIdAndUpdate(
                id,
                { employer, jobPosition, professionalArea, salary },
                { returnOriginal: false },
            );
            res.status(201).json({
                message: 'Vacancy updated',
                updatedVacancy,
            });
        } else {
            res.status(404).json({ message: 'Vacancy not found' });
        }
    },
);

export const deleteVacancy = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const vacancy = await Vacancy.findByIdAndDelete(id);

        if (vacancy) {
            res.status(202).json({ message: 'Vacancy deleted' });
        } else {
            res.status(404).json({ message: 'Vacancy not found' });
        }
    },
);

export const changeStatusVacancy = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const vacancy = await Vacancy.findByIdAndUpdate(id, {
            isOpen: req.body.isOpen,
        });

        if (vacancy) {
            res.status(201).json({ message: 'Vacancy isOpen status changed' });
        } else {
            res.status(404).json({ message: 'Vacancy not found' });
        }
    },
);
