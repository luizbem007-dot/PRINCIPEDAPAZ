import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  X, 
  Check,
  Loader2,
  AlertCircle,
  FileText,
  CheckCircle2
} from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, selectedPlan }) => {
  const [step, setStep] = useState(1); // 1: Dados, 2: Confirmação, 3: Sucesso
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customerData, setCustomerData] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [assinaturaDigital, setAssinaturaDigital] = useState('');
  const [aceitouContrato, setAceitouContrato] = useState(false);
  const [dataAssinatura, setDataAssinatura] = useState(null);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

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

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const buscarCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setValue('rua', data.logradouro || '');
        setValue('bairro', data.bairro || '');
        setValue('cidade', data.localidade || '');
        setValue('estado', data.uf || '');
      }
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
    } finally {
      setLoadingCep(false);
    }
  };

  const onSubmitData = async (data) => {
    setLoading(true);
    setError('');

    try {
      console.log('Dados recebidos:', data);

      // Validação da assinatura digital
      if (!aceitouContrato || !assinaturaDigital.trim()) {
        setError('Você deve assinar digitalmente o contrato para continuar.');
        setLoading(false);
        return;
      }

      // Verifica se a assinatura corresponde ao nome
      const nomeCompleto = data.name.toLowerCase().trim();
      const assinatura = assinaturaDigital.toLowerCase().trim();
      
      if (nomeCompleto !== assinatura) {
        setError('A assinatura digital deve ser idêntica ao seu nome completo.');
        setLoading(false);
        return;
      }

      // Registra data/hora da assinatura
      const dataHora = new Date().toLocaleString('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'medium'
      });
      setDataAssinatura(dataHora);

      // Apenas armazena os dados localmente
      setCustomerData({
        ...data,
        assinaturaDigital,
        dataAssinatura: dataHora,
        ipAssinatura: 'Registrado' // Placeholder
      });
      setStep(2);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao processar seus dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmation = () => {
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setError('');
    setCustomerData(null);
    setAssinaturaDigital('');
    setAceitouContrato(false);
    setDataAssinatura(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-amber-800 to-amber-700 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-serif font-bold">
              {step === 1 && 'Seus Dados'}
              {step === 2 && 'Confirme suas Informações'}
              {step === 3 && 'Sucesso!'}
            </h2>
            <button
              onClick={handleClose}
              className="hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="text-red-600" size={20} />
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}

            {/* PASSO 1: Formulário de Dados */}
            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmitData)} className="space-y-6">
                {/* Dados Pessoais */}
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-4">Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      {...register('name', { required: 'Nome é obrigatório' })}
                      placeholder="Nome completo"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      {...register('cpf', { required: 'CPF é obrigatório' })}
                      placeholder="CPF"
                      maxLength="14"
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value);
                        e.target.value = formatted;
                      }}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      {...register('phone', { required: 'Celular é obrigatório' })}
                      placeholder="Celular"
                      maxLength="15"
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        e.target.value = formatted;
                      }}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-4">Endereço</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        {...register('cep', {
                          onChange: (e) => {
                            const formatted = formatCEP(e.target.value);
                            e.target.value = formatted;
                            if (formatted.replace(/\D/g, '').length === 8) {
                              buscarCEP(formatted);
                            }
                          }
                        })}
                        placeholder="CEP"
                        maxLength="9"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                      />
                      {loadingCep && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Loader2 size={20} className="animate-spin text-amber-700" />
                        </div>
                      )}
                    </div>
                    <input
                      {...register('rua')}
                      placeholder="Rua"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        {...register('numero')}
                        placeholder="Número"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                      />
                      <input
                        {...register('bairro')}
                        placeholder="Bairro"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                      />
                      <input
                        {...register('estado')}
                        placeholder="Estado"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                    <input
                      {...register('cidade')}
                      placeholder="Cidade"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      {...register('complemento')}
                      placeholder="Complemento"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Contrato */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-amber-700" size={24} />
                    <h3 className="font-bold text-amber-900 text-lg">Contrato de Prestação de Serviços</h3>
                  </div>
                  
                  {/* Área do Contrato - Scroll */}
                  <div className="bg-white border-2 border-amber-300 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <p className="text-xs text-gray-700 leading-relaxed mb-2">
                      <strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS FUNERÁRIOS</strong>
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      Pelo presente instrumento, de um lado <strong>FUNERÁRIA PRÍNCIPE DA PAZ</strong>, 
                      doravante denominada CONTRATADA, e de outro lado o CONTRATANTE qualificado neste formulário, 
                      têm entre si justo e acordado o seguinte:
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      <strong>CLÁUSULA 1ª - DO OBJETO:</strong> O presente contrato tem por objeto a prestação 
                      de serviços funerários completos, incluindo assistência funeral 24 horas, fornecimento 
                      de urna, transporte, preparação do corpo, flores, véu, registro de óbito e demais 
                      serviços conforme plano contratado.
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      <strong>CLÁUSULA 2ª - DO PAGAMENTO:</strong> O CONTRATANTE compromete-se ao pagamento 
                      mensal conforme o plano escolhido, sendo o pagamento realizado através de boleto 
                      bancário enviado via WhatsApp.
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      <strong>CLÁUSULA 3ª - DA VIGÊNCIA:</strong> O contrato entra em vigor na data da 
                      assinatura e tem prazo indeterminado, podendo ser cancelado a qualquer momento sem 
                      fidelidade ou multa.
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>CLÁUSULA 4ª - DAS CONDIÇÕES GERAIS:</strong> O CONTRATANTE declara ter lido 
                      e compreendido todas as cláusulas deste contrato, concordando integralmente com seus termos.
                    </p>
                  </div>

                  {/* Checkbox de Aceite */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceitouContrato}
                      onChange={(e) => setAceitouContrato(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-amber-700"
                    />
                    <span className="text-sm text-amber-900 leading-relaxed">
                      Declaro que li e compreendi todas as cláusulas do{' '}
                      <strong>Contrato de Prestação de Serviços Funerários</strong> acima, 
                      e concordo integralmente com seus termos e condições.
                    </span>
                  </label>

                  {/* Campo de Assinatura Digital */}
                  {aceitouContrato && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <div className="bg-white border-2 border-amber-400 rounded-lg p-4">
                        <label className="block mb-2">
                          <span className="text-sm font-bold text-amber-900 flex items-center gap-2">
                            <CheckCircle2 size={18} />
                            Assinatura Digital (Digite seu nome completo)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={assinaturaDigital}
                          onChange={(e) => setAssinaturaDigital(e.target.value)}
                          placeholder="Digite seu nome completo exatamente como informado acima"
                          className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:outline-none font-serif text-lg italic"
                          style={{ fontFamily: "'Brush Script MT', cursive" }}
                        />
                        <p className="text-xs text-amber-700 mt-2">
                          ⚠️ A assinatura digital deve ser <strong>idêntica</strong> ao seu nome completo informado no formulário.
                        </p>
                      </div>
                      
                      {assinaturaDigital && (
                        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 flex items-center gap-2">
                          <CheckCircle2 className="text-green-700" size={20} />
                          <p className="text-sm text-green-800">
                            <strong>Assinatura registrada:</strong> {assinaturaDigital}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-3 border-2 border-amber-300 text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold rounded-lg hover:from-amber-800 hover:to-amber-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Próximo'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* PASSO 2: Confirmação */}
            {step === 2 && customerData && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <h3 className="font-bold text-blue-900 mb-4">Dados Informados:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p><span className="font-semibold">Nome:</span> {customerData.name}</p>
                    <p><span className="font-semibold">CPF:</span> {customerData.cpf}</p>
                    <p><span className="font-semibold">Email:</span> {customerData.email}</p>
                    <p><span className="font-semibold">Celular:</span> {customerData.phone}</p>
                    <p><span className="font-semibold">Endereço:</span> {customerData.rua}, {customerData.numero}</p>
                    <p><span className="font-semibold">Cidade:</span> {customerData.cidade}, {customerData.estado}</p>
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                  <h3 className="font-bold text-amber-900 mb-4">Plano Selecionado:</h3>
                  <p className="text-lg font-bold">{selectedPlan.name}</p>
                  <p className="text-amber-900">R$ {selectedPlan.monthlyPrice}/mês</p>
                </div>

                {/* Confirmação de Assinatura Digital */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="text-green-700" size={24} />
                    <h3 className="font-bold text-green-900">Assinatura Digital Registrada</h3>
                  </div>
                  <div className="space-y-2 text-sm text-green-800">
                    <p><span className="font-semibold">Assinante:</span> {customerData.assinaturaDigital}</p>
                    <p><span className="font-semibold">Data/Hora:</span> {customerData.dataAssinatura}</p>
                    <p><span className="font-semibold">IP:</span> {customerData.ipAssinatura}</p>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <p className="text-green-900">
                    ✓ Você receberá os boletos pelo WhatsApp em breve.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border-2 border-amber-300 text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmation}
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white font-bold rounded-lg hover:from-green-800 hover:to-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Confirmando...
                      </>
                    ) : (
                      'Confirmar'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* PASSO 3: Sucesso */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Check className="mx-auto text-green-600 mb-4" size={80} />
                </motion.div>

                <div>
                  <h3 className="text-3xl font-serif font-bold text-green-700 mb-2">
                    Dados Recebidos com Sucesso!
                  </h3>
                  <p className="text-amber-900 text-lg">
                    Você receberá os boletos pelo WhatsApp em breve.
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <p className="text-green-900 font-semibold">
                    Plano: {selectedPlan.name}
                  </p>
                  <p className="text-green-900">
                    Valor: R$ {selectedPlan.monthlyPrice}/mês
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white font-bold rounded-lg hover:from-amber-800 hover:to-amber-700 transition text-lg"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
