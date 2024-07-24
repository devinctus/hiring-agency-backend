export const corsOptions = {
    origin: 'http://localhost:4200', // Your Angular app's URL
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204,
};
