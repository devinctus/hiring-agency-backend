// backend/models/Agreement.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAgreement extends Document {
    employer: mongoose.Types.ObjectId;
    applicant: mongoose.Types.ObjectId;
    jobPosition: string;
    fees: number;
}

const agreementSchema: Schema<IAgreement> = new Schema(
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
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Applicant',
            required: [true, 'Applicant is required'],
            validate: {
                validator: function (v: string) {
                    return mongoose.Types.ObjectId.isValid(v);
                },
                message: (props) =>
                    `${props.value} is not a valid Applicant Id`,
            },
        },
        jobPosition: {
            type: String,
            required: [true, 'Job position is required'],
            minlength: [2, 'Job position must be at least 2 characters long'],
        },
        fees: {
            type: Number,
            required: [true, 'Fees are required'],
            min: [1, 'Fees must be greater than 0'],
        },
    },
    {
        timestamps: true,
    },
);

const Agreement = mongoose.model<IAgreement>('Agreement', agreementSchema);

export default Agreement;
