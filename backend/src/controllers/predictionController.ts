import { Request, Response } from 'express';
import { sendPredictionRequest } from '../services/predictionService';

export const predictRole = async (req: Request, res: Response) => {
    try{
  
        const data = req.body;

        const prediction = await sendPredictionRequest(data);

        res.json({ prediction });
    } catch (error) {
        console.error('Erro na predição', error);
        res.status(500).json({ error: 'Erro interno' });
    }
  
};
