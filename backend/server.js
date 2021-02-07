import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const tweets = [];
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('server is ready at http://localhost:5000');
});
