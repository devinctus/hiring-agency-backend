/**
 * FOR TECHMAGIC!!!!!
 *
 * Seed Script for Generating Fake Data
 *
 * Data was created so no nessesery to run this script untill you want to create some new database data
 *
 * How to Use:
 * 1. Make sure you have the necessary packages installed:
 *    - mongoose
 *    - @faker-js/faker
 *    - dotenv
 * 2. Configure your MongoDB URI in a .env file:
 *    MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/<database>?retryWrites=true&w=majority
 * 3. Run the seed script:
 *    npx ts-node src/seed.ts
 *
 * WARNING: This script will insert new documents into your database, which might
 *          overwrite existing data with the same unique fields. Use it only in a
 *          development or testing environment.
 */
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import Employer from './models/Employer';
import Applicant from './models/Applicant';
import Vacancy from './models/Vacancy';
// import Agreement from './models/Agreement';
import { IEmployer } from './models/Employer';
import { IApplicant } from './models/Applicant';
import { IVacancy } from './models/Vacancy';
// import { IAgreement } from './models/Agreement';
import { professionalAreas } from './constants/jobsAndAreas';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const generateEmployers = async () => {
    const generatePhoneNumber = () => {
        const areaCode = Math.floor(Math.random() * (989 - 201 + 1)) + 201;
        const centralOfficeCode = faker.string.numeric(3);
        const lineNumber = faker.string.numeric(4);
        return `(${areaCode})${centralOfficeCode}-${lineNumber}`;
    };

    const employers: IEmployer[] = [];
    for (let i = 0; i < 100; i++) {
        const address = [
            faker.location.streetAddress(),
            faker.location.city(),
            faker.location.state(),
        ].join(', ');
        employers.push(
            new Employer({
                companyName: faker.company.name(),
                professionalArea: faker.helpers.objectKey(professionalAreas),
                address,
                phone: generatePhoneNumber(),
            }),
        );
    }
    await Employer.insertMany(employers);
    console.log('Employers generated');
};

const generateApplicants = async () => {
    const applicants: IApplicant[] = [];
    for (let i = 0; i < 800; i++) {
        const profArea = faker.helpers.objectKey(professionalAreas);
        applicants.push(
            new Applicant({
                name: faker.person.firstName(),
                surname: faker.person.lastName(),
                patronymic: faker.person.middleName(),
                qualification: faker.helpers.arrayElement(
                    professionalAreas[profArea],
                ),
                professionalArea: profArea,
                salary: faker.number.int({ min: 30000, max: 150000 }),
            }),
        );
    }
    await Applicant.insertMany(applicants);
    console.log('Applicants generated');
    console.log(applicants);
};

const generateVacancies = async () => {
    const employers = await Employer.find().exec();
    const vacancies: IVacancy[] = [];

    for (let i = 0; i < 400; i++) {
        const employer = faker.helpers.arrayElement(employers);
        vacancies.push(
            new Vacancy({
                employer: employer._id,
                jobPosition: faker.helpers.arrayElement(
                    professionalAreas[employer.professionalArea],
                ),
                professionalArea: employer.professionalArea,
                salary: faker.number.int({ min: 50000, max: 200000 }),
            }),
        );
    }
    await Vacancy.insertMany(vacancies);
    console.log('Vacancies generated');
};

// const generateAgreements = async () => {
//     const employers = await Employer.find().exec();
//     const applicants = await Applicant.find().exec();

//     const agreements: IAgreement[] = [];
//     for (let i = 0; i < 20; i++) {
//         agreements.push(
//             new Agreement({
//                 employer: faker.helpers.arrayElement(employers)._id,
//                 applicant: faker.helpers.arrayElement(applicants)._id,
//                 jobPosition: faker.person.jobTitle(),
//                 fees: faker.number.int({ min: 1000, max: 10000 }),
//             }),
//         );
//     }
//     await Agreement.insertMany(agreements);
//     console.log('Agreements generated');
// };

mongoose
    .connect(MONGO_URI!)
    .then(async () => {
        console.log('Connected to MongoDB');
        await generateEmployers();
        await generateApplicants();
        await generateVacancies();
        // await generateAgreements();
        mongoose.disconnect();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });
