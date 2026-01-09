# 🚀 DEPLOY DAS EDGE FUNCTIONS NO SUPABASE

## ✅ O QUE FOI CRIADO:

Criei 3 Edge Functions no Supabase para substituir o server.js:

1. **asaas-create-customer** - Cria clientes no Asaas
2. **asaas-create-subscription** - Cria assinaturas recorrentes
3. **asaas-get-pix** - Busca pagamentos e QR Code PIX

---

## 📋 COMO FAZER DEPLOY:

### **Opção 1: Deploy Manual (Via Painel Supabase)** ⭐ MAIS FÁCIL

1. **Acesse o Supabase Dashboard:**
   - https://supabase.com/dashboard/project/idtlkuptncfihggnhdrr

2. **Vá em Edge Functions → Create a new function**

3. **Crie as 3 funções:**

#### **Função 1: asaas-create-customer**
- Nome: `asaas-create-customer`
- Cole o código de: `supabase/functions/asaas-create-customer/index.ts`
- Deploy

#### **Função 2: asaas-create-subscription**
- Nome: `asaas-create-subscription`
- Cole o código de: `supabase/functions/asaas-create-subscription/index.ts`
- Deploy

#### **Função 3: asaas-get-pix**
- Nome: `asaas-get-pix`
- Cole o código de: `supabase/functions/asaas-get-pix/index.ts`
- Deploy

4. **Configurar Secrets (Variáveis de Ambiente):**
   - No painel, vá em **Settings → Edge Functions → Secrets**
   - Adicione:
     ```
     ASAAS_API_KEY = $aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjFmYjE5MjlkLWNiODgtNGY5YS1hNzIxLTRlMzk0NzYyZjgxMDo6JGFhY2hfZDdjMzQ3NmEtNzlmZC00YjE0LTkzMzYtNTVmMTRmMTZjYTRj
     ASAAS_ENDPOINT = https://api.asaas.com/v3
     ```

---

### **Opção 2: Deploy via CLI** (Requer Supabase CLI instalado)

Se conseguir instalar o Supabase CLI:

```bash
# Login no Supabase
supabase login

# Link ao projeto
supabase link --project-ref idtlkuptncfihggnhdrr

# Configurar secrets
supabase secrets set ASAAS_API_KEY="$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjFmYjE5MjlkLWNiODgtNGY5YS1hNzIxLTRlMzk0NzYyZjgxMDo6JGFhY2hfZDdjMzQ3NmEtNzlmZC00YjE0LTkzMzYtNTVmMTRmMTZjYTRj"
supabase secrets set ASAAS_ENDPOINT="https://api.asaas.com/v3"

# Deploy todas as funções
supabase functions deploy asaas-create-customer
supabase functions deploy asaas-create-subscription
supabase functions deploy asaas-get-pix
```

---

## ⚠️ IMPORTANTE:

### **Após fazer deploy:**

1. **Teste as funções** diretamente no painel do Supabase
2. **Atualize o código frontend** - já está pronto! Só precisa rodar:
   ```bash
   npm run dev
   ```

3. **Remova o server.js** (não precisa mais):
   ```bash
   rm server.js
   ```

---

## 🔍 TESTAR AS EDGE FUNCTIONS:

Você pode testar diretamente no terminal com `curl`:

```bash
# Testar criação de cliente
curl -X POST 'https://idtlkuptncfihggnhdrr.supabase.co/functions/v1/asaas-create-customer' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Teste",
    "email": "teste@teste.com",
    "cpfCnpj": "12345678901",
    "mobilePhone": "27999999999"
  }'
```

---

## ✅ VANTAGENS DAS EDGE FUNCTIONS:

- ✅ **Serverless** - Escala automático
- ✅ **Sem servidor para manter** - Supabase gerencia tudo
- ✅ **Integrado ao Supabase** - Usa a mesma conta e billing
- ✅ **CORS resolvido** - Sem problemas de bloqueio
- ✅ **Logs centralizados** - Veja tudo no painel do Supabase

---

## 📞 PRÓXIMOS PASSOS:

1. Fazer deploy das 3 Edge Functions
2. Configurar os Secrets (ASAAS_API_KEY e ASAAS_ENDPOINT)
3. Testar o checkout no site
4. Deletar o server.js

**Precisa de ajuda com algum passo?** 🚀
