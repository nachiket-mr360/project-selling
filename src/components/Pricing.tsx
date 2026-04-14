import { Check, Sparkles } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { smoothScrollTo, addRippleEffect, addMagneticEffect } from '../utils/ctaUtils';

const pricingPlans = [
  {
    title: 'Mini Project',
    subtitle: 'Predefined Concept',
    price: '749',
    description: 'Perfect for quick semester submissions',
    popular: false,
    features: [
      'Source Code',
      'One-to-One Explanation',
      'Setup & Run Guidance',
      'Documentation File',
      'Viva Preparation Support',
    ],
  },
  {
    title: 'Mini Project',
    subtitle: 'Your Custom Idea',
    price: '949',
    description: 'Bring your own concept to life',
    popular: true,
    features: [
      'Source Code',
      'One-to-One Explanation',
      'Setup & Run Guidance',
      'Documentation File',
      'Viva Preparation Support',
    ],
  },
  {
    title: 'Major Project',
    subtitle: 'Predefined Concept',
    price: '3,999',
    description: 'Advanced project for final year ',
    popular: false,
    features: [
      'Complete Source Code',
      'Detailed One-to-One Explanation',
      'Full Setup & Run Guidance',
      'Professional Documentation',
      'Comprehensive Viva Preparation',
    ],
  },
  {
    title: 'Major Project',
    subtitle: 'Fully Customized',
    price: '4,499',
    description: 'Your vision, expertly executed',
    popular: false,
    features: [
      'Complete Source Code',
      'Detailed One-to-One Explanation',
      'Full Setup & Run Guidance',
      'Professional Documentation',
      'Comprehensive Viva Preparation',
    ],
  },
];

export default function Pricing() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Add ripple effects and magnetic effects to buttons
    buttonRefs.current.forEach(button => {
      if (button) {
        addRippleEffect(button);
        addMagneticEffect(button);
      }
    });
  }, []);

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = encodeURIComponent('Hello! I am interested in your ' + e.currentTarget.closest('.pricing-card')?.querySelector('h3')?.textContent + ' service. Please provide more details.');
    window.open(`https://wa.me/918217204054?text=${message}`, '_blank');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <section id="pricing-section" className="relative py-32 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Simple, <span className="text-cyan-400">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your academic needs. All plans include complete support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`pricing-card relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500'
                  : 'bg-slate-800/50 border-2 border-slate-700'
              } backdrop-blur-xl`}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-cyan-400 font-semibold mb-4">{plan.subtitle}</p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">₹{plan.price}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={handleGetStarted}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                Get Started
              </button>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg mb-6">
            Need something different? We offer custom packages too.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            Contact for Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
