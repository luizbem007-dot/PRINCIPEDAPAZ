import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Shield, 
  Heart, 
  Clock, 
  Check, 
  ChevronDown,
  MessageCircle,
  Award,
  Users,
  Sparkles,
  Star,
  Quote
} from 'lucide-react';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const whatsappNumber = '5527997363659';
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de conhecer os planos da Funerária Príncipe da Paz.');

  const openCheckout = (plan) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.15 } },
    viewport: { once: true }
  };

  const authority = [
    {
      icon: Award,
      title: '+15 Anos',
      subtitle: 'de Experiência'
    },
    {
      icon: Users,
      title: '+10.000',
      subtitle: 'Famílias Protegidas'
    },
    {
      icon: Phone,
      title: 'Atendimento 24h',
      subtitle: 'Grande Vitória'
    }
  ];

  const plans = [
    {
      name: 'Plano Família',
      subtitle: 'O Essencial',
      price: '47,90',
      description: 'Para Titular, Cônjuge, Filhos e Pais (até 70 anos)',
      benefits: [
        'Cobertura para até 8 pessoas',
        'Titular + Cônjuge + Filhos',
        'Inclui Pais (até 70 anos)',
        'Carência Zero para acidentes',
        'Atendimento 24h'
      ],
      cta: 'Quero Proteger Minha Casa',
      recommended: false,
      style: 'white'
    },
    {
      name: 'Plano Premium',
      subtitle: 'O Ilimitado',
      price: '67,90',
      description: 'Inclui Agregados e SEM LIMITE DE IDADE',
      highlight: 'Ideal para proteger quem você ama, sem restrições.',
      benefits: [
        'Cobertura para até 8 pessoas',
        'SEM LIMITE DE IDADE (Aceita idosos acima de 70 anos)',
        'SEM GRAU DE PARENTESCO (Sogros, tios, agregados)',
        'Carência Zero para acidentes',
        'Urna de Luxo e Traslado Completo'
      ],
      cta: 'Quero a Cobertura Máxima',
      recommended: true,
      style: 'gold'
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: 'Assistência Funeral Completa',
      description: 'Urna, Flores, Traslado e todo suporte necessário'
    },
    {
      icon: Clock,
      title: 'Carência Zero para Acidentes',
      description: 'Proteção imediata quando você mais precisa'
    },
    {
      icon: Sparkles,
      title: 'Sem Taxas Escondidas',
      description: 'Transparência total, sem surpresas no momento difícil'
    },
    {
      icon: Heart,
      title: 'Atendimento em 30 minutos',
      description: 'Resposta humanizada e ágil para sua família'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Helena Santos',
      text: 'Em um momento tão difícil, encontramos na Príncipe da Paz não apenas profissionalismo, mas verdadeiro acolhimento. Gratidão eterna.',
      stars: 5
    },
    {
      name: 'Roberto Almeida',
      text: 'Ter o plano já contratado nos poupou de preocupações financeiras em um momento de luto. Recomendo a todos pensarem nisso com antecedência.',
      stars: 5
    },
    {
      name: 'Ana Paula Costa',
      text: 'Atendimento impecável, digno e respeitoso. A equipe cuidou de cada detalhe com carinho. Muito obrigada!',
      stars: 5
    }
  ];

  const faqs = [
    {
      question: 'Qual a diferença entre o Plano Família e o Plano Premium?',
      answer: 'O Plano Família cobre titular, cônjuge, filhos e pais até 70 anos. Já o Plano Premium não tem limite de idade e aceita qualquer pessoa, independente do grau de parentesco - incluindo sogros, tios, agregados e amigos próximos.'
    },
    {
      question: 'Como funciona a carência?',
      answer: 'Para acidentes, a carência é ZERO - proteção imediata. Para morte natural, há uma breve carência conforme estabelecido em contrato. Entre em contato para detalhes completos.'
    },
    {
      question: 'O que acontece se o falecimento ocorrer fora da Grande Vitória?',
      answer: 'Atendemos toda a região da Grande Vitória - ES. Nosso serviço de traslado garante que seu familiar seja transportado com dignidade, segurança e todo o respeito que merece.'
    },
    {
      question: 'Quais serviços estão inclusos?',
      answer: 'Nossos planos incluem urna, flores, traslado, preparação, velório, documentação e todo o suporte necessário. Sem custos adicionais ou surpresas.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header Elegante */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
            Príncipe da Paz
          </h1>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
            <span className="sm:hidden">Contato</span>
          </a>
        </div>
      </header>

      {/* Hero Section Cinematográfica */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2400)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3E2723]/70 via-[#3E2723]/60 to-[#1A1A1A]/80" />
        
        <motion.div 
          className="relative z-10 container mx-auto px-4 py-20 text-center"
          initial="initial"
          animate="whileInView"
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight text-shadow-soft"
            variants={fadeInUp}
          >
            O Legado de Paz<br />da Sua Família
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-amber-100 mb-12 max-w-3xl mx-auto font-light"
            variants={fadeInUp}
          >
            Dignidade, respeito e proteção completa<br className="hidden md:block" />
            por um valor que não pesa no bolso
          </motion.p>
          
          <motion.a
            href="#planos"
            className="inline-block gradient-gold text-white text-lg md:text-xl px-10 md:px-14 py-5 md:py-6 rounded-full font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            variants={fadeInUp}
          >
            Conhecer os Planos
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          <ChevronDown className="text-amber-300" size={32} />
        </motion.div>
      </section>

      {/* Barra de Autoridade */}
      <section className="gradient-gold py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {authority.map((item, index) => (
              <motion.div
                key={index}
                className="text-center text-white"
                variants={fadeInUp}
              >
                <item.icon className="mx-auto mb-4" size={48} strokeWidth={1.5} />
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-lg opacity-90">{item.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Planos Premium */}
      <section id="planos" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16 md:mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#3E2723] mb-6">
              Planos pensados para cada<br className="hidden md:block" />momento da sua vida
            </h2>
            <p className="text-xl md:text-2xl text-amber-800 font-light">
              Escolha a proteção ideal para quem você ama
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-3xl ${
                  plan.recommended 
                    ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-400 transform md:scale-105' 
                    : 'bg-white border-2 border-amber-300'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="gradient-gold text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      Recomendado
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <p className="text-amber-700 font-semibold text-sm uppercase tracking-widest mb-2">
                    {plan.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#3E2723] mb-4">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-2xl text-amber-700">R$</span>
                      <span className="text-5xl md:text-6xl font-serif font-bold text-[#3E2723]">
                        {plan.price}
                      </span>
                      <span className="text-2xl text-amber-700">/mês</span>
                    </div>
                    <p className="text-[#3E2723] font-semibold text-lg border-t-2 border-b-2 border-amber-300 py-3 mx-8">
                      {plan.description}
                    </p>
                  </div>

                  {plan.highlight && (
                    <p className="text-amber-800 italic mb-6 text-base">
                      {plan.highlight}
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-amber-600 flex-shrink-0 mt-1" size={22} strokeWidth={2.5} />
                      <span className="text-[#3E2723] text-base leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openCheckout(plan)}
                  className={`block w-full text-center py-4 md:py-5 rounded-full font-bold text-lg transition-all duration-300 ${
                    plan.recommended
                      ? 'gradient-gold text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                      : 'bg-[#3E2723] hover:bg-[#2C1810] text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Garantias */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-center text-[#3E2723] mb-16 md:mb-20"
            {...fadeInUp}
          >
            Nossas Garantias de Excelência
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {guarantees.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-gold mb-6">
                  <item.icon className="text-white" size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-3">
                  {item.title}
                </h3>
                <p className="text-amber-900 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quem Somos (Storytelling) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <motion.div {...fadeInUp}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200" 
                  alt="Funerária Príncipe da Paz"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3E2723] mb-6">
                Tradição e Respeito há mais de 15 anos
              </h2>
              <div className="w-20 h-1 gradient-gold mb-8"></div>
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed mb-6">
                Há mais de 15 anos, a <strong>Funerária Príncipe da Paz</strong> é sinônimo de respeito, dignidade e excelência na Grande Vitória.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed mb-6">
                Nossa missão é proporcionar às famílias o amparo necessário nos momentos mais delicados, com profissionalismo, humanização e toda a estrutura que você merece.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed">
                Acreditamos que planejar com antecedência é um ato de amor e responsabilidade. Por isso, oferecemos planos acessíveis para que você proteja quem ama sem comprometer o orçamento familiar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#3E2723] mb-6">
              O que dizem nossas famílias
            </h2>
            <p className="text-xl text-amber-800">
              Depoimentos reais de quem confia em nós
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200 relative"
                variants={fadeInUp}
              >
                <Quote className="text-amber-300 mb-4" size={40} />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="text-amber-500 fill-amber-500" size={18} />
                  ))}
                </div>

                <p className="text-amber-900 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <p className="font-semibold text-[#3E2723]">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold text-center text-[#3E2723] mb-16"
            {...fadeInUp}
          >
            Perguntas Frequentes
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-2 border-amber-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-amber-50 to-white hover:from-amber-100 hover:to-amber-50 transition-colors"
                >
                  <span className="text-left font-semibold text-lg text-[#3E2723] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`flex-shrink-0 text-amber-700 transition-transform duration-300 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white text-amber-900 leading-relaxed border-t border-amber-100">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="bg-gradient-to-b from-[#3E2723] to-[#1A1A1A] text-amber-100 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-serif font-bold gradient-gold bg-clip-text text-transparent mb-6">
              Príncipe da Paz
            </h3>
            <p className="text-xl text-amber-200 mb-8">
              Tradição, dignidade e respeito há mais de 15 anos
            </p>
            
            <div className="space-y-4 mb-10">
              <p className="flex items-center justify-center gap-3 text-lg">
                <Phone size={22} className="text-amber-400" />
                <a href="tel:+5527997363659" className="hover:text-amber-300 transition-colors font-semibold">
                  (27) 99736-3659
                </a>
              </p>
              <p className="flex items-center justify-center gap-3 text-lg">
                <span className="text-amber-400">📍</span>
                Grande Vitória - ES
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 gradient-gold text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle size={24} />
              Fale Conosco pelo WhatsApp
            </a>
          </div>

          <div className="border-t border-amber-900/30 pt-8 text-center">
            <p className="text-amber-300 text-sm">
              © 2026 Funerária Príncipe da Paz. Todos os direitos reservados.
            </p>
            <p className="text-amber-400/60 text-xs mt-2">
              Desenvolvido com respeito e dedicação
            </p>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp Premium */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 gradient-gold text-white p-5 rounded-full shadow-2xl transition-all duration-300 hover:shadow-amber-500/50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={32} strokeWidth={2} />
      </motion.a>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}

export default App;
