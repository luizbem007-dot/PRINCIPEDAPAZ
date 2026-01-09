import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Check,
  Loader2,
  AlertCircle,
  Copy
} from 'lucide-react';
import { createCustomer, createSubscription, getPixQrCode } from '../lib/asaas';
import { supabase } from '../lib/supabase';

const CheckoutModal = ({ isOpen, onClose, selectedPlan }) => {
  const [step, setStep] = useState(1); // 1: Dados, 2: Pagamento, 3: Confirmação
  const [paymentMethod, setPaymentMethod] = useState('pix'); // pix ou creditCard
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pixData, setPixData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const onSubmitData = async (data) => {
    setLoading(true);
    setError('');

    try {
      console.log('Dados recebidos do formulário:', data);
      
      // Criar cliente no Asaas
      const customerPayload = {
        name: data.name,
        email: data.email,
        cpfCnpj: data.cpf.replace(/\D/g, ''),
        mobilePhone: data.phone.replace(/\D/g, ''),
        postalCode: data.cep.replace(/\D/g, ''),
        address: data.address,
        addressNumber: data.number,
        province: data.neighborhood,
        externalReference: `WEB_${Date.now()}`,
        notificationDisabled: false
      };
      
      if (data.complement) {
        customerPayload.addressComplement = data.complement;
      }
      
      console.log('Payload enviado para Asaas:', customerPayload);
      
      const asaasCustomer = await createCustomer(customerPayload);

      // Salvar no Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('customers')
        .insert([
          {
            name: data.name,
            email: data.email,
            cpf: data.cpf.replace(/\D/g, ''),
            phone: data.phone.replace(/\D/g, ''),
            postal_code: data.cep,
            address: data.address,
            address_number: data.number,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            asaas_customer_id: asaasCustomer.id,
            plan_name: selectedPlan.name,
            plan_value: parseFloat(selectedPlan.price.replace(',', '.')),
            subscription_status: 'pending'
          }
        ])
        .select();

      if (supabaseError) throw supabaseError;

      setCustomerData({ 
        ...data, 
        asaasId: asaasCustomer.id,
        supabaseId: supabaseData[0].id 
      });
      setStep(2);
    } catch (err) {
      console.error('Erro completo:', err);
      console.error('Resposta:', err.response?.data);
      setError(err.response?.data?.errors?.[0]?.detail || 'Erro ao processar seus dados. Verifique as informações e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    setLoading(true);
    setError('');

    try {
      if (paymentMethod === 'pix') {
        // Calcular próxima data de vencimento (hoje + 5 dias)
        const nextDueDate = new Date();
        nextDueDate.setDate(nextDueDate.getDate() + 5);
        const formattedDueDate = nextDueDate.toISOString().split('T')[0];

        // Criar assinatura recorrente com PIX
        const subscription = await createSubscription({
          customer: customerData.asaasId,
          billingType: 'PIX',
          value: parseFloat(selectedPlan.price.replace(',', '.')),
          nextDueDate: formattedDueDate,
          cycle: 'MONTHLY',
          description: `Assinatura ${selectedPlan.name} - Funerária Príncipe da Paz`
        });

        // Atualizar dados no Supabase
        await supabase
          .from('customers')
          .update({ 
            subscription_id: subscription.id,
            subscription_status: 'pending',
            payment_method: 'pix',
            next_due_date: formattedDueDate
          })
          .eq('id', customerData.supabaseId);

        // Buscar a primeira cobrança gerada pela assinatura
        const paymentsResponse = await fetch(
          `http://localhost:3001/api/asaas/subscriptions/${subscription.id}/payments`
        );
        
        const paymentsData = await paymentsResponse.json();
        const firstPayment = paymentsData.data[0];

        if (firstPayment) {
          // Obter QR Code da primeira cobrança
          const pixQrCode = await getPixQrCode(firstPayment.id);
          setPixData(pixQrCode);

          // Salvar pagamento no histórico
          await supabase
            .from('payments')
            .insert([{
              customer_id: customerData.supabaseId,
              asaas_payment_id: firstPayment.id,
              value: parseFloat(selectedPlan.price.replace(',', '.')),
              status: 'pending',
              payment_method: 'pix',
              due_date: formattedDueDate,
              description: `Primeira mensalidade - ${selectedPlan.name}`
            }]);
        }

        setStep(3);
      } else {
        // Pagamento com cartão será implementado
        setError('Pagamento com cartão em breve. Use PIX por enquanto.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixData.payload);
    alert('Código PIX copiado!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-amber-200 px-8 py-6 flex justify-between items-center rounded-t-3xl z-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#3E2723]">
                {step === 1 ? 'Seus Dados' : step === 2 ? 'Pagamento' : 'Confirmação'}
              </h2>
              <p className="text-amber-700 mt-1">
                {selectedPlan.name} - R$ {selectedPlan.price}/mês
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-amber-700 hover:text-amber-900 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Step 1: Dados do Cliente */}
            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmitData)} className="space-y-5">
                <div>
                  <label className="block text-[#3E2723] font-semibold mb-2">
                    Nome Completo *
                  </label>
                  <input
                    {...register('name', { required: 'Nome é obrigatório' })}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="João da Silva"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      CPF *
                    </label>
                    <input
                      {...register('cpf', { 
                        required: 'CPF é obrigatório',
                        pattern: {
                          value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                          message: 'CPF inválido'
                        }
                      })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="000.000.000-00"
                      onChange={(e) => e.target.value = formatCPF(e.target.value)}
                      maxLength={14}
                    />
                    {errors.cpf && <p className="text-red-600 text-sm mt-1">{errors.cpf.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      Telefone *
                    </label>
                    <input
                      {...register('phone', { required: 'Telefone é obrigatório' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="(27) 99999-9999"
                      onChange={(e) => e.target.value = formatPhone(e.target.value)}
                      maxLength={15}
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[#3E2723] font-semibold mb-2">
                    E-mail *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'E-mail é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="seuemail@exemplo.com"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="md:col-span-1">
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      CEP *
                    </label>
                    <input
                      {...register('cep', { required: 'CEP é obrigatório' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="29000-000"
                      maxLength={9}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      Endereço *
                    </label>
                    <input
                      {...register('address', { required: 'Endereço é obrigatório' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Rua, Avenida..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      Número *
                    </label>
                    <input
                      {...register('number', { required: 'Número é obrigatório' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="123"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      Bairro *
                    </label>
                    <input
                      {...register('neighborhood', { required: 'Bairro é obrigatório' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Centro"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      Cidade *
                    </label>
                    <input
                      {...register('city', { required: 'Cidade é obrigatória' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Vila Velha"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3E2723] font-semibold mb-2">
                      Estado *
                    </label>
                    <select
                      {...register('state', { required: 'Estado é obrigatório' })}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES" selected>ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#3E2723] font-semibold mb-2">
                    Complemento
                  </label>
                  <input
                    {...register('complement')}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Apto, Bloco..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-gold text-white py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processando...
                    </>
                  ) : (
                    'Continuar para Pagamento'
                  )}
                </button>
              </form>
            )}

            {/* Step 2: Escolha de Pagamento */}
            {step === 2 && (
              <div className="space-y-6">
                <p className="text-amber-900 text-center mb-6">
                  Escolha a forma de pagamento para sua assinatura mensal
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <Smartphone className="mx-auto mb-3 text-amber-600" size={40} />
                    <h3 className="font-bold text-[#3E2723] mb-2">PIX</h3>
                    <p className="text-sm text-amber-800">Aprovação instantânea</p>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('creditCard')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      paymentMethod === 'creditCard'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <CreditCard className="mx-auto mb-3 text-amber-600" size={40} />
                    <h3 className="font-bold text-[#3E2723] mb-2">Cartão de Crédito</h3>
                    <p className="text-sm text-amber-800">Débito automático mensal</p>
                  </button>
                </div>

                <button
                  onClick={processPayment}
                  disabled={loading}
                  className="w-full gradient-gold text-white py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processando...
                    </>
                  ) : (
                    `Pagar com ${paymentMethod === 'pix' ? 'PIX' : 'Cartão'}`
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Confirmação PIX */}
            {step === 3 && pixData && (
              <div className="space-y-6 text-center">
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <Check className="mx-auto text-green-600 mb-4" size={60} />
                  <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-2">
                    Quase lá!
                  </h3>
                  <p className="text-amber-900">
                    Escaneie o QR Code PIX abaixo para concluir seu pagamento
                  </p>
                </div>

                <div className="bg-white border-2 border-amber-200 rounded-2xl p-6">
                  <img 
                    src={`data:image/png;base64,${pixData.encodedImage}`}
                    alt="QR Code PIX"
                    className="mx-auto w-64 h-64"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-900 mb-2">Ou copie o código PIX:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pixData.payload}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={copyPixCode}
                      className="gradient-gold text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Copy size={18} />
                      Copiar
                    </button>
                  </div>
                </div>

                <p className="text-sm text-amber-800">
                  Após o pagamento, sua assinatura será ativada automaticamente.<br />
                  Você receberá um e-mail de confirmação.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
