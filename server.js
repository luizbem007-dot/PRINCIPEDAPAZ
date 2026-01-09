import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Cliente Axios para Asaas
const asaasApi = axios.create({
  baseURL: process.env.VITE_ASAAS_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'access_token': process.env.VITE_ASAAS_API_KEY
  }
});

// Criar cliente
app.post('/api/asaas/customers', async (req, res) => {
  try {
    console.log('📝 Criando cliente no Asaas:', req.body);
    const response = await asaasApi.post('/customers', req.body);
    console.log('✅ Cliente criado:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao criar cliente:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: error.message }
    });
  }
});

// Criar assinatura
app.post('/api/asaas/subscriptions', async (req, res) => {
  try {
    console.log('📝 Criando assinatura:', req.body);
    const response = await asaasApi.post('/subscriptions', req.body);
    console.log('✅ Assinatura criada:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao criar assinatura:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: error.message }
    });
  }
});

// Buscar pagamentos da assinatura
app.get('/api/asaas/subscriptions/:id/payments', async (req, res) => {
  try {
    const response = await asaasApi.get(`/subscriptions/${req.params.id}/payments`);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao buscar pagamentos:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: error.message }
    });
  }
});

// Buscar QR Code PIX
app.get('/api/asaas/payments/:id/pixQrCode', async (req, res) => {
  try {
    const response = await asaasApi.get(`/payments/${req.params.id}/pixQrCode`);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao buscar QR Code:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: error.message }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
  console.log(`📡 Endpoint Asaas: ${process.env.VITE_ASAAS_ENDPOINT}`);
});
