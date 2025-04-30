import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './database/mongo';
import authRoutes from './routes/authRoutes';
import predictionRoutes from './routes/predictionRoutes';

dotenv.config();

const app = express();

// Ativa o CORS para todas as rotas
app.use(cors());

// Middleware para parsing de JSON
app.use(bodyParser.json());
app.use(express.json()); // Ambos fazem parsing de JSON, mas você pode escolher um deles

// Conectar ao MongoDB
connectDB();

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

// Usar as rotas de previsão
app.use('/api', predictionRoutes);

// Iniciar servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

export default app;