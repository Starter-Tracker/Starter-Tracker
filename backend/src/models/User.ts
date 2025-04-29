import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Senha com hash
    isVerified: { type: Boolean, default: false }, // Verificação de email
    createdAt: { type: Date, default: Date.now }, // Data de criação
});

export default mongoose.model('User', userSchema);