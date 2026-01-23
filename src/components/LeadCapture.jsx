import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Check, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Inicializar EmailJS com sua Public Key
emailjs.init('p1fNQjoa00Hdr855T');

const LeadCapture = ({ isOpen, onClose, selectedPlan }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ nome: '', whatsapp: '', cidade: '' });
  const [error, setError] = useState('');

  // Garante que o preço aparece mesmo quando o plano só tem a prop "price"
  const planPrice = selectedPlan?.monthlyPrice ?? selectedPlan?.price;

  const formatWhatsApp = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  };

  const handleWhatsAppChange = (e) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData({ ...formData, whatsapp: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validação
      if (!formData.nome.trim()) {
        setError('Por favor, preencha seu nome.');
        setLoading(false);
        return;
      }

      const whatsappLimpo = formData.whatsapp.replace(/\D/g, '');
      if (whatsappLimpo.length < 10) {
        setError('WhatsApp deve ter pelo menos 10 dígitos.');
        setLoading(false);
        return;
      }

      if (!formData.cidade.trim()) {
        setError('Por favor, indique sua cidade.');
        setLoading(false);
        return;
      }

      // Enviar email via EmailJS
      try {
        await emailjs.send(
          'service_ofa3roa',
          'template_i2qbn9h',
          {
            to_email: 'assistenciaprincipadapaz@gmail.com',
            nome: formData.nome,
            whatsapp: formData.whatsapp,
            whatsapp_limpo: whatsappLimpo,
            cidade: formData.cidade,
            plano: selectedPlan?.name || 'Não especificado',
            valor: selectedPlan?.monthlyPrice || 'A definir',
            data_hora: new Date().toLocaleString('pt-BR'),
          }
        );
        console.log('Email enviado com sucesso!');
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError);
        // Continua mesmo se o email falhar (não interrompe o fluxo)
      }

      // Redirecionar para WhatsApp com mensagem pré-formatada
      const mensagem = `Olá! Sou ${formData.nome}, sou de ${formData.cidade} e acabei de preencher o formulário no site. Gostaria de receber a proposta do plano ${selectedPlan?.name || 'funerário'}.`;
      const whatsappURL = `https://wa.me/5527997363659?text=${encodeURIComponent(mensagem)}`;

      setSuccess(true);
      
      // Aguarda um pouco e depois redireciona
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        setFormData({ nome: '', whatsapp: '', cidade: '' });
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao processar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            {!success ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#2C2C2C]">
                      Receber Proposta
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Respondemos na hora
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Plano Selecionado */}
                {selectedPlan && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 mb-6">
                    <p className="text-xs text-amber-700 font-semibold">Seu Interesse:</p>
                    <p className="text-lg font-bold text-amber-900">{selectedPlan.name}</p>
                    {planPrice ? (
                      <p className="text-sm text-amber-800">R$ {planPrice}/mês</p>
                    ) : (
                      <p className="text-sm text-amber-800">Vamos confirmar o valor na ligação</p>
                    )}
                  </div>
                )}

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="João Silva"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={handleWhatsAppChange}
                      placeholder="(27) 99999-9999"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Receba a proposta direto no seu WhatsApp
                    </p>
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Sua Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      placeholder="Vitória, Cariacica, etc"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  {/* Erro */}
                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {/* Aviso */}
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                    <p className="text-xs text-green-800 font-semibold">
                      ✓ Sem compromisso • Sem dados bancários • Sem fidelidade
                    </p>
                  </div>

                  {/* Botão */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold rounded-lg hover:from-amber-800 hover:to-amber-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={20} />
                        Receber Proposta no WhatsApp
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Sucesso */
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Check className="mx-auto text-green-600 mb-4" size={80} />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-green-700 mb-2">
                    Tudo Pronto!
                  </h3>
                  <p className="text-gray-700">
                    Redirecionando você para o <strong>WhatsApp</strong>...
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Você receberá resposta em <strong>até 5 minutos</strong>
                  </p>
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900 font-semibold">
                    📲 Nossa equipe está aguardando no WhatsApp
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCapture;
