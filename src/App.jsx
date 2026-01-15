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
  Quote,
  AlertCircle,
  ClipboardList,
  FileText,
  CheckCircle2,
  ShieldCheck
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
      title: '15 Anos',
      subtitle: 'de Experiência'
    },
    {
      icon: Users,
      title: '10.000',
      subtitle: 'Famílias Atendidas'
    },
    {
      icon: Phone,
      title: 'Espírito Santo',
      subtitle: 'Cobertura Total'
    },
    {
      icon: Heart,
      title: 'Proteção',
      subtitle: 'Completa e Humanizada'
    }
  ];

  const plans = [
    {
      name: 'Plano Família',
      subtitle: 'O Econômico',
      price: '47,90',
      description: 'Proteção essencial para o núcleo familiar.',
      benefits: [
        '👨‍👩‍👧‍👦 Quem participa: Você + Cônjuge + Filhos + Pais',
        '⛔ Regra de Idade: Todos devem ter até 70 anos na contratação',
        '🔒 Sem Fidelidade: Cancele quando quiser, sem multa',
        'Cobertura para até 8 pessoas',
        'Carência Zero para acidentes',
        'Atendimento 24h'
      ],
      cta: 'Quero o Plano Família',
      recommended: false,
      style: 'white'
    },
    {
      name: 'Plano Premium',
      subtitle: 'O Sem Limites 👑',
      price: '67,90',
      description: 'Liberdade total para escolher quem proteger.',
      highlight: '',
      benefits: [
        '👑 Quem participa: Qualquer pessoa (Sogros, Tios, Vizinhos, Amigos)',
        '🚀 Sem Limite de Idade: Aceitamos dependentes com mais de 70 anos',
        '🔒 Sem Fidelidade: Cancele quando quiser, sem multa',
        'Cobertura para até 8 pessoas',
        'Carência Zero para acidentes',
        'Urna de Luxo e Traslado Completo'
      ],
      cta: 'Quero Cobertura Máxima',
      recommended: true,
      style: 'gold'
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: 'Assistência Funeral Completa',
      description: 'Urna funerária, flores naturais e paramentos. Preparação do corpo e organização do velório com total respeito.'
    },
    {
      icon: Clock,
      title: 'Atendimento Ágil 24h',
      description: 'Nossa equipe de plantão atende seu chamado a qualquer hora. Suporte rápido e transporte especializado na Grande Vitória.'
    },
    {
      icon: Sparkles,
      title: 'Acolhimento e Orientação',
      description: 'Você não estará sozinho. Oferecemos suporte humanizado e orientamos sua família sobre os próximos passos com tranquilidade.'
    },
    {
      icon: Heart,
      title: 'Sem Surpresas Financeiras',
      description: 'Evite gastos inesperados de até R$ 5.000. Com o plano, o serviço essencial já está pago e protege seu orçamento.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Helena, Vitória',
      text: 'No momento mais difícil, eles cuidaram de tudo. Não tive que me preocupar com nenhum papel. Gratidão eterna.',
      stars: 5
    },
    {
      name: 'Roberto Almeida, Vila Velha',
      text: 'O Plano Premium foi a melhor escolha. Consegui incluir minha sogra de 82 anos e ficamos tranquilos.',
      stars: 5
    },
    {
      name: 'Ana Paula, Cariacica',
      text: 'Atendimento impecável e respeitoso. A equipe chegou muito rápido e nos orientou em tudo.',
      stars: 5
    }
  ];

  const faqs = [
    {
      question: 'Qual a carência do plano?',
      answer: 'Existe uma carência contratual para o início da cobertura (consulte os prazos no contrato). A proteção não é imediata para óbitos ocorridos no mesmo dia da contratação.'
    },
    {
      question: 'Posso incluir meu pai de 75 anos?',
      answer: 'Sim, mas apenas no Plano Premium (R$ 67,90). O Plano Família tem limite de entrada até 70 anos.'
    },
    {
      question: 'O que está incluso no serviço?',
      answer: 'Urna mortuária, preparação do corpo, ornamentação, cortejo fúnebre, trâmites burocráticos e traslado na Grande Vitória.'
    },
    {
      question: 'Tem fidelidade ou multa?',
      answer: 'Não. Você pode cancelar a qualquer momento se não estiver satisfeito. Ficamos juntos pela confiança.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section - Exatamente como a imagem */}
      <section className="min-h-screen flex items-center justify-center bg-[#F5F0E8] pb-12 relative overflow-hidden">
        {/* Efeito dourado no fundo */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#D4AF37] to-[#C4A027] rounded-full opacity-20 blur-3xl"></div>
        
        {/* Header integrado no Hero */}
        <div className="absolute top-0 left-0 right-0 w-full px-6 py-6 z-50">
          <div className="container mx-auto flex justify-between items-start">
            {/* Logo */}
            <img 
              src="/Logo.png" 
              alt="Funerária Príncipe da Paz" 
              className="h-20 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div 
              className="hidden text-center text-sm font-bold text-[#D4AF37]"
              style={{ fontFamily: 'serif' }}
            >
              Príncipe da Paz
            </div>
            
            {/* Botão Contato */}
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37] hover:bg-[#C4A027] text-white px-8 py-3 rounded-full font-bold text-base shadow-md hover:shadow-lg transition-all duration-300"
            >
              Contato
            </a>
          </div>
        </div>

        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2400)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <motion.div 
          className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-24"
          initial="initial"
          animate="whileInView"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2C2C2C] mb-6 leading-tight"
            variants={fadeInUp}
          >
            Proteja sua <span className="text-[#B8860B] font-black">família</span><br />
            por menos de<br />
            R$ <span className="text-[#B8860B] font-black">1,60</span> ao dia.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed font-bold"
            variants={fadeInUp}
          >
            Um plano funerário completo que protege e cuida da sua família por você. <span className="text-[#B8860B]">Sem fidelidade, sem taxas extras</span> e livre de complicações.
          </motion.p>
          
          <motion.button
            onClick={() => setCheckoutOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#C4A027] text-white text-base md:text-lg px-12 md:px-16 py-4 md:py-5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto mb-3"
            variants={fadeInUp}
          >
            QUERO PROTEGER MINHA FAMÍLIA AGORA
          </motion.button>
          <motion.p 
            className="text-sm text-gray-600 flex items-center justify-center gap-2"
            variants={fadeInUp}
          >
            <Check size={16} className="text-green-600" />
            Compra segura e imediata
          </motion.p>
        </motion.div>
      </section>

      {/* Barra de Autoridade */}
      <section className="bg-gradient-to-r from-[#B8984A] via-[#D4AF37] to-[#B8984A] py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {authority.map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-full">
                    <item.icon className="text-white" size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-lg text-white/90">{item.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Planos Premium */}
      <section id="planos" className="py-12 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8 md:mb-20"
            {...fadeInUp}
          >
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-[#3E2723] mb-3 md:mb-6">
              Escolha a proteção ideal<br className="hidden md:block" />para sua realidade
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative rounded-3xl p-6 md:p-12 shadow-lg border-2 ${
                  plan.recommended 
                    ? 'bg-white border-amber-300' 
                    : 'bg-white border-amber-200'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      Recomendado
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 md:mb-8">
                  {/* Badge no topo */}
                  <div className="inline-block bg-[#D4AF37] text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
                    {plan.name} Completo
                  </div>

                  {/* Preço grande */}
                  <div className="flex items-baseline justify-center gap-1 md:gap-2 mb-3 md:mb-4">
                    <span className="text-lg md:text-xl text-gray-600">R$</span>
                    <span className="text-5xl md:text-7xl font-serif font-bold text-[#3E2723]">
                      {plan.price}
                    </span>
                    <span className="text-xl md:text-2xl text-gray-600">/mês</span>
                  </div>

                  {/* Descrição com destaque */}
                  <p className="text-base md:text-lg text-gray-700 mb-2">
                    {plan.description.split('até')[0]}até <span className="font-bold text-[#D4AF37]">8 pessoas</span>
                  </p>
                </div>

                {/* Grid de benefícios 2x2 */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  {plan.benefits.slice(0, 4).map((benefit, idx) => {
                    const icons = [Clock, Shield, AlertCircle, Check];
                    const Icon = icons[idx];
                    const titles = [
                      'Atendimento 24h',
                      'Cobertura total',
                      'Sem taxas escondidas',
                      'Sem burocracia'
                    ];
                    const descriptions = [
                      'Suporte completo a qualquer hora',
                      'Tudo incluso para até 8 pessoas',
                      'Valor fixo mensal',
                      'Processo simples'
                    ];
                    return (
                      <div key={idx} className="text-center">
                        <div className="bg-amber-100 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto mb-1.5 md:mb-2">
                          <Icon className="text-[#D4AF37]" size={18} />
                        </div>
                        <h4 className="font-bold text-[#3E2723] text-xs mb-0.5 md:mb-1">
                          {titles[idx]}
                        </h4>
                        <p className="text-[10px] md:text-xs text-gray-600 leading-tight px-0.5">
                          {descriptions[idx]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Botão */}
                <button
                  onClick={() => openCheckout(plan)}
                  className="block w-full bg-[#D4AF37] hover:bg-[#C4A027] text-white text-base md:text-lg font-bold py-3.5 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4 md:mb-6"
                >
                  {plan.cta} →
                </button>

                {/* Rodapé */}
                <p className="text-center text-xs md:text-sm text-gray-600">
                  Sem permanência mínima • Cancele quando quiser
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Garantias */}
      <section className="py-12 md:py-32 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-2xl md:text-5xl font-serif font-bold text-center text-[#3E2723] mb-8 md:mb-20"
            {...fadeInUp}
          >
            Tranquilidade real quando você mais precisa
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 gap-4 md:gap-12 max-w-5xl mx-auto"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {guarantees.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full gradient-gold mb-3 md:mb-6">
                  <item.icon className="text-white" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-base md:text-2xl font-serif font-bold text-[#3E2723] mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-xs md:text-base text-amber-900 leading-relaxed">
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
                Respeito e Tradição há mais de 15 anos
              </h2>
              <div className="w-20 h-1 gradient-gold mb-8"></div>
              <p className="text-lg md:text-xl text-amber-900 leading-relaxed mb-6">
                A <strong>Funerária Príncipe da Paz</strong> não é apenas uma empresa, é um braço amigo na Grande Vitória.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed mb-6">
                Nossa missão é oferecer amparo profissional e humanizado, garantindo que a despedida do seu ente querido seja uma homenagem honrosa, sem desespero financeiro.
              </p>
              <p className="text-lg text-amber-900 leading-relaxed font-semibold">
                Atendemos em Vitória, Vila Velha, Serra, Cariacica e Viana.
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

      {/* Seção de Benefícios Premium */}
      <section className="py-20 md:py-32 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16 md:mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#3E2723] mb-6">
              O que você recebe com nossos planos
            </h2>
            <p className="text-xl md:text-2xl text-amber-800 font-light">
              Proteção completa para sua família em todos os momentos
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {[
              { icon: Clock, title: 'Atendimento 24h', desc: 'Disponível todos os dias, inclusive finais de semana e feriados' },
              { icon: Shield, title: 'Cobertura Completa', desc: 'Velório, sepultamento, translado e documentação' },
              { icon: Heart, title: 'Sem Burocracia', desc: 'Processo simples e rápido em momento de dor' },
              { icon: Award, title: 'Experiência', desc: 'Mais de 15 anos atendendo com dignidade' },
              { icon: Users, title: 'Até 8 Pessoas', desc: 'Proteja sua família inteira com um único plano' },
              { icon: Check, title: 'Sem Surpresas', desc: 'Valor fixo, sem taxas escondidas ou aumentos inesperados' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                variants={fadeInUp}
              >
                <benefit.icon className="text-amber-600 mb-4" size={48} />
                <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-amber-900 text-lg">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Como Funciona */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16 md:mb-20"
            {...fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#3E2723] mb-6">
              Como funciona
            </h2>
            <p className="text-xl md:text-2xl text-amber-800 font-light">
              Contratar é simples e rápido
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {[
              { icon: ClipboardList, title: 'Escolha', desc: 'Selecione o plano ideal para sua família', color: 'from-[#D4AF37] to-[#B8860B]' },
              { icon: FileText, title: 'Preencha', desc: 'Informações básicas e contato', color: 'from-[#B8860B] to-[#D4AF37]' },
              { icon: CheckCircle2, title: 'Confirme', desc: 'Concorde com os termos do contrato', color: 'from-[#D4AF37] to-[#B8860B]' },
              { icon: ShieldCheck, title: 'Protegido', desc: 'Receba os boletos e aproveite a cobertura', color: 'from-[#B8860B] to-[#D4AF37]' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={fadeInUp}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-amber-100 h-full">
                  <div className={`bg-gradient-to-br ${item.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={40} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3E2723] mb-3 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-amber-900 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-[#D4AF37] text-3xl transform -translate-y-1/2 z-10">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
          >
            <button
              onClick={() => {
                setSelectedPlan(plans[0]);
                setCheckoutOpen(true);
              }}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-white text-lg px-16 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 uppercase tracking-wider"
            >
              Comece Agora
            </button>
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
