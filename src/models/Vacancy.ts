import mongoose, { Document, Schema } from 'mongoose';

export interface IVacancy extends Document {
    employer: mongoose.Types.ObjectId;
    jobPosition: string;
    professionalArea: string;
    salary: number;
    isOpen: boolean;
}

const vacancySchema: Schema<IVacancy> = new Schema(
    {
        employer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employer',
            required: [true, 'Employer is required'],
            validate: {
                validator: function (v: string) {
                    return mongoose.Types.ObjectId.isValid(v);
                },
                message: (props) => `${props.value} is not a valid Employer Id`,
            },
        },
        jobPosition: {
            type: String,
            required: [true, 'Job position is required'],
            minlength: [2, 'Job position must be at least 2 characters long'],
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
        isOpen: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

const Vacancy = mongoose.model<IVacancy>('Vacancy', vacancySchema);

export default Vacancy;
