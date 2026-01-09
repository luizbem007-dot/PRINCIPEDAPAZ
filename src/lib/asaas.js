import axios from 'axios';

const asaasApi = axios.create({
  baseURL: 'http://localhost:3001/api/asaas',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createCustomer = async (customerData) => {
  try {
    console.log('Criando cliente com dados:', customerData);
    const response = await asaasApi.post('/asaas-create-customer', customerData);
    console.log('Cliente criado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro detalhado ao criar cliente:', error.response?.data || error.message);
    throw error;
  }
};

export const createSubscription = async (subscriptionData) => {
  try {
    const response = await asaasApi.post('/asaas-create-subscription', subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    throw error;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await asaasApi.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    throw error;
  }
};

export const getPixQrCode = async (paymentId) => {
  try {
    const response = await asaasApi.get(`/asaas-get-pix?paymentId=${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter QR Code PIX:', error);
    throw error;
  }
};

export default asaasApi;
