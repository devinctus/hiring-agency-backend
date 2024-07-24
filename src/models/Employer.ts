import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployer extends Document {
    companyName: string;
    professionalArea: string;
    address: string;
    phone: string;
}

const employerSchema: Schema<IEmployer> = new Schema(
    {
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            minlength: [2, 'Company name must be at least 2 characters long'],
        },
        professionalArea: {
            type: String,
            required: [true, 'Professional area is required'],
            minlength: [
                2,
                'Professional area must be at least 2 characters long',
            ],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            minlength: [8, 'Address must be at least 8 characters long'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [
                /^\(\d{3}\)\d{3}-\d{4}$/,
                'Please fill a valid phone number mask (xxx)xxx-xxxx',
            ],
        },
    },
    {
        timestamps: true,
    },
);

const Employer = mongoose.model<IEmployer>('Employer', employerSchema);

export default Employer;
