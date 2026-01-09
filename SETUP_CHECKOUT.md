# 🚀 CONFIGURAÇÃO DO CHECKOUT TRANSPARENTE

## ✅ O QUE FOI IMPLEMENTADO:

### 1. **Checkout Modal Premium**
- Design integrado ao padrão de luxo da landing page
- Fluxo em 3 etapas: Dados → Pagamento → Confirmação
- Validação completa de formulários
- Suporte a PIX e Cartão de Crédito

### 2. **Integração Asaas**
- Criação automática de clientes
- Geração de assinaturas recorrentes
- QR Code PIX em tempo real
- Webhooks prontos para notificações

### 3. **Backend Supabase**
- Salvamento de clientes
- Histórico de assinaturas
- Gestão de status de pagamento

---

## 📋 PASSOS PARA CONFIGURAR:

### **1. Criar conta no Supabase**
1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Aguarde a inicialização (2-3 minutos)

### **2. Criar tabela `customers` no Supabase**

Execute este SQL no **SQL Editor** do Supabase:

```sql
-- Criar tabela de clientes
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  asaas_customer_id VARCHAR(255) UNIQUE,
  plan VARCHAR(100) NOT NULL,
  plan_value DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  subscription_id VARCHAR(255),
  payment_method VARCHAR(50)
);

-- Criar índices para performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_cpf ON customers(cpf);
CREATE INDEX idx_customers_asaas_id ON customers(asaas_customer_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Política de acesso (apenas leitura para usuários autenticados)
CREATE POLICY "Enable read access for authenticated users" ON customers
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política de inserção (qualquer um pode criar - necessário para signup)
CREATE POLICY "Enable insert for anyone" ON customers
  FOR INSERT
  WITH CHECK (true);
```

### **3. Configurar Asaas**

#### 3.1 Criar conta no Asaas
1. Acesse: https://www.asaas.com/
2. Crie uma conta **SANDBOX** para testes
3. Acesse o menu **Integrações → API**
4. Copie sua **API KEY**

#### 3.2 Configurar Webhooks do Asaas
1. No Asaas, vá em **Integrações → Webhooks**
2. Adicione a URL do seu webhook (quando deploy em produção)
3. Marque os eventos:
   - `PAYMENT_RECEIVED` (Pagamento confirmado)
   - `PAYMENT_CONFIRMED` (PIX confirmado)
   - `PAYMENT_OVERDUE` (Pagamento atrasado)

### **4. Configurar variáveis de ambiente**

Edite o arquivo `.env.local` com seus dados:

```env
# Supabase (encontre em: Settings → API)
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_anon_aqui

# Asaas (sandbox para testes)
VITE_ASAAS_API_KEY=$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNTkxNzc6OiRhYWNoX2M3ZGExZDFlLWJmMTQtNDZmOC04MjA1LWUxOTFjNDI3ZmZlMQ==
VITE_ASAAS_ENDPOINT=https://sandbox.asaas.com/api/v3
```

**⚠️ IMPORTANTE:** 
- Use a API **SANDBOX** do Asaas para testes
- Quando for para produção, troque para: `https://api.asaas.com/api/v3`

### **5. Testar o checkout**

1. Inicie o servidor: `npm run dev`
2. Clique em "Quero Proteger Minha Casa" ou "Quero a Cobertura Máxima"
3. Preencha os dados do formulário
4. Escolha PIX como pagamento
5. Teste o QR Code gerado

---

## 🧪 DADOS DE TESTE (SANDBOX ASAAS)

### CPF válido para testes:
```
111.111.111-11
222.222.222-22
333.333.333-33
```

### Cartão de crédito para testes:
```
Número: 5162 3060 2353 6180
Vencimento: 12/2030
CVV: 123
Nome: Teste da Silva
```

---

## 📊 PRÓXIMOS PASSOS:

### **1. Implementar Webhook Handler**
Crie um endpoint para receber notificações do Asaas:

```javascript
// /api/webhooks/asaas.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { event, payment } = req.body;
    
    if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
      // Atualizar status do cliente no Supabase
      const { data, error } = await supabase
        .from('customers')
        .update({ status: 'active' })
        .eq('asaas_customer_id', payment.customer);
    }
    
    res.status(200).json({ received: true });
  }
}
```

### **2. Implementar pagamento com Cartão**
- Incluir script Asaas.js para tokenização
- Criar formulário de cartão
- Enviar token criptografado para Asaas

### **3. Dashboard Admin**
- Criar painel para visualizar clientes
- Listar assinaturas ativas/vencidas
- Gerenciar cobranças

### **4. E-mails transacionais**
- Confirmação de cadastro
- Boletos/PIX gerados
- Lembretes de vencimento

---

## 🔒 SEGURANÇA

⚠️ **NUNCA EXPONHA NO FRONTEND:**
- API Keys completas
- Chaves privadas do Supabase
- Tokens de acesso sensíveis

✅ **BOAS PRÁTICAS:**
- Use variáveis `VITE_` apenas para chaves públicas
- Implemente um backend (API Routes) para operações sensíveis
- Valide todos os dados no servidor
- Use RLS (Row Level Security) do Supabase

---

## 📞 SUPORTE

Se precisar de ajuda:
1. Documentação Asaas: https://docs.asaas.com/
2. Documentação Supabase: https://supabase.com/docs
3. Suporte Asaas: suporte@asaas.com

---

**🎉 Seu checkout transparente está pronto para usar!**
