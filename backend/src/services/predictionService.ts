import axios from 'axios';

interface PredictionResponse {
  prediction: string;
}

export const sendPredictionRequest = async (data: any): Promise<string> => {
  const response = await axios.post<PredictionResponse>(
    process.env.PYTHON_API_URL!,
    data
  );

  return response.data.prediction;
};