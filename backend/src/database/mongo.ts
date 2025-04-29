import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI não definida no arquivo .env');
        }

        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB Atlas');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao conectar ao MongoDB:', error.message);
        } else {
            console.error('Erro ao conectar ao MongoDB:', error);
        }
        process.exit(1);
    }
};

export default connectDB;