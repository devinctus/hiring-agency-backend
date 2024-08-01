import mongoose, { Document, Schema } from 'mongoose';

export interface IApplicant extends Document {
    name: string;
    surname: string;
    patronymic: string;
    qualification: string;
    professionalArea: string;
    salary: number;
    isHired: boolean;
}

const applicantSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [2, 'Name must be at least 2 characters long'],
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            minlength: [2, 'Surname must be at least 2 characters long'],
        },
        patronymic: {
            type: String,
            required: [true, 'Patronymic is required'],
            minlength: [2, 'Patronymic must be at least 2 characters long'],
        },
        qualification: {
            type: String,
            required: [true, 'Qualification is required'],
            minlength: [2, 'Qualification must be at least 2 characters long'],
        },
        professionalArea: {
            type: String,
            required: [true, 'Professional area is required'],
            minlength: [
                2,
                'Professional area must be at least 2 characters long',
            ],
        },
        salary: {
            type: Number,
            required: [true, 'Salary is required'],
            min: [1, 'Salary must be greater than 0'],
        },
        isHired: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Applicant = mongoose.model<IApplicant>('Applicant', applicantSchema);

export default Applicant;
