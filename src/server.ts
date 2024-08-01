import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes';
import employerRoutes from './routes/employerRoutes';
import applicantRoutes from './routes/applicantRoutes';
import vacancyRoutes from './routes/vacancyRoutes';
import agreementRoutes from './routes/agreementRoutes';
import { setupSwagger } from './config/swaggerConfig';
import { corsOptions } from './config/corsConfig';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors(corsOptions));

setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/vacancies', vacancyRoutes);
app.use('/api/agreements', agreementRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
