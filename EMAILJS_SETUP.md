# 📧 Configuração EmailJS + WhatsApp Redirect

## O Fluxo Funcionando Agora:

1. Cliente preenche: **Nome, WhatsApp, Cidade**
2. Clica em "Receber Proposta"
3. Acontecem 2 coisas automaticamente:
   - ✅ Email é enviado para você com os dados do lead
   - ✅ WhatsApp do cliente abre com mensagem pronta

---

## ⚙️ Configuração do EmailJS (Grátis)

### Passo 1: Criar conta em EmailJS
- Acesse: https://www.emailjs.com/
- Clique em "Sign Up" (grátis)
- Confirme seu email

### Passo 2: Configurar o Email Service
1. Na dashboard, vá em **"Email Services"**
2. Clique em **"Add Service"**
3. Escolha seu provedor de email (Gmail, Outlook, etc)
4. Siga as instruções para conectar
5. **Copie o Service ID** (ex: `service_xyz123`)

### Passo 3: Criar um Template de Email
1. Vá em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Cole este template:

```
Name: Novo Lead Funerária
Subject: 🔥 NOVO LEAD: {{nome}}

Body:
---
📱 NOVO LEAD RECEBIDO

Nome: {{nome}}
WhatsApp: {{whatsapp}}
Cidade: {{cidade}}

Plano de Interesse: {{plano}}
Valor: {{valor}}/mês

Data/Hora: {{data_hora}}

---
AÇÃO IMEDIATA:
👉 Envie uma mensagem no WhatsApp: {{whatsapp}}

---
Funerária Príncipe da Paz
```

4. **Copie o Template ID** (ex: `template_abc456`)

### Passo 4: Pegar sua Public Key
1. Vá em **"Account"**
2. Copie a **Public Key** (ex: `pk_live_xyz123`)

### Passo 5: Atualizar o código
No arquivo `src/components/LeadCapture.jsx`, substitua:

```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Sua Public Key aqui
```

E no handleSubmit, substitua:
```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',    // Seu Service ID aqui
  'YOUR_TEMPLATE_ID',   // Seu Template ID aqui
  {
    to_email: 'seu-email@funeraria.com', // Seu email aqui
    ...
  }
);
```

---

## 📱 WhatsApp Redirect (Já Configurado!)

Quando o cliente clica em "Receber Proposta":
1. Os dados são validados
2. Email é enviado automaticamente
3. WhatsApp abre com mensagem pré-formatada

**Seu número está configurado como:** `5527997363659`

Se precisar alterar, edite este trecho:
```javascript
const whatsappURL = `https://wa.me/5527997363659?text=${encodeURIComponent(mensagem)}`;
```

---

## ✅ Teste Local

1. Preencha o formulário
2. Clique em "Receber Proposta"
3. Você receberá um email (check spam!)
4. WhatsApp abrirá com a mensagem pronta

---

## 🎯 Próximas Melhorias (Opcional)

- [ ] Adicionar Google Sheets para backup automático
- [ ] Integrar com Make.com para automações
- [ ] Adicionar webhook para notificação no Slack
- [ ] Salvar histórico de leads localmente

---

## 💡 Dica de Produção

Se EmailJS começar a dar limite (200 emails/mês), você pode:
1. Upgrade para plano pago (barato)
2. Integrar com backend simples (Node.js + Nodemailer)
3. Usar Google Sheets + Make.com (grátis)

---

**Seu site está 100% pronto para começar a capturar leads HIGH-TOUCH agora!** 🚀
