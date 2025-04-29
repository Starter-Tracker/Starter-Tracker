import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import connectDB from './database/mongo';
import authRoutes from './routes/authRoutes'; // Importando as rotas de autenticação
import cors from 'cors';

const app = express();

app.use(cors());

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Conectar ao MongoDB
connectDB();

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);

// Iniciar servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
