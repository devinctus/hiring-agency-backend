import { Request, Response } from 'express';
import Employer from '../models/Employer';
import asyncHandler from 'express-async-handler';

export const getEmployers = asyncHandler(
    async (req: Request, res: Response) => {
        const employers = await Employer.find().select(
            '-createdAt -updatedAt -__v',
        );
        res.status(200).json(employers);
    },
);

export const getEmployerById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const employer = await Employer.findById(id).select(
            '-createdAt -updatedAt -__v',
        );

        if (employer) {
            res.status(200).json(employer);
        } else {
            res.status(404).json({ message: 'Employer not found' });
        }
    },
);

export const createEmployer = asyncHandler(
    async (req: Request, res: Response) => {
        const { companyName, professionalArea, address, phone } = req.body;
        const employerExists = await Employer.findOne({ companyName });

        if (employerExists) {
            res.status(400).json({ message: 'Employer already exists' });
            return;
        }

        const employer = new Employer({
            companyName,
            professionalArea,
            address,
            phone,
        });

        const createdEmployer = await employer.save();
        res.status(201).json({ message: 'Employer created', createdEmployer });
    },
);

export const updateEmployer = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const employer = await Employer.findById(id);

        if (employer) {
            const companyName = req.body.companyName || employer.companyName;
            const professionalArea =
                req.body.professionalArea || employer.professionalArea;
            const address = req.body.address || employer.address;
            const phone = req.body.phone || employer.phone;
            const employerExists = await Employer.findOne({
                companyName,
                _id: { $ne: id },
            });

            if (employerExists) {
                res.status(400).json({ message: 'Employer already exists' });
                return;
            }

            const updatedEmployer = await Employer.findByIdAndUpdate(
                id,
                { companyName, professionalArea, address, phone },
                { returnOriginal: false },
            );
            res.status(201).json({
                message: 'Employer updated',
                updatedEmployer,
            });
        } else {
            res.status(404).json({ message: 'Employer not found' });
        }
    },
);

export const deleteEmployer = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const employer = await Employer.findByIdAndDelete(id);

        if (employer) {
            res.status(202).json({ message: 'Employer deleted' });
        } else {
            res.status(404).json({ message: 'Employer not found' });
        }
    },
);
