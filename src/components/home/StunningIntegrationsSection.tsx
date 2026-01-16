/**
 * STUNNING INTEGRATIONS SECTION
 * Enterprise integration showcase with ACTUAL visual logos from PDF
 * Using accurate SVG recreations optimized for dark backgrounds
 */
import React from 'react';
import { motion } from 'framer-motion';
import { darkBackgroundLogos } from '../logos/DarkBackgroundLogos';

// Integration categories using all 21 actual logos from the saved files
const categories = [
  {
    id: 'fintech-payments',
    name: 'Fintech & Payments',
    count: 4,
    color: 'emerald',
    logos: [
      { name: 'Razorpay', component: 'Razorpay' },
      { name: 'Stripe', component: 'Stripe' },
      { name: 'Signzy', component: 'Signzy' },
      { name: 'HubSpot', component: 'HubSpot' }
    ]
  },
  {
    id: 'core-banking',
    name: 'Core Banking & Financial',
    count: 4,
    color: 'blue',
    logos: [
      { name: 'Jack Henry', component: 'Jack Henry' },
      { name: 'Fiserv', component: 'Fiserv' },
      { name: 'Oracle', component: 'Oracle' },
      { name: 'FIS', component: 'FIS' }
    ]
  },
  {
    id: 'communication',
    name: 'Communication & Collaboration',
    count: 4,
    color: 'purple',
    logos: [
      { name: 'Slack', component: 'Slack' },
      { name: 'Zoom', component: 'Zoom' },
      { name: 'Teams', component: 'Teams' },
      { name: 'Discord', component: 'Discord' }
    ]
  },
  {
    id: 'cloud-infrastructure',
    name: 'Cloud & Data Platforms',
    count: 4,
    color: 'cyan',
    logos: [
      { name: 'AWS', component: 'AWS' },
      { name: 'Microsoft', component: 'Microsoft' },
      { name: 'Azure', component: 'Azure' },
      { name: 'Snowflake', component: 'Snowflake' }
    ]
  },
  {
    id: 'enterprise-software',
    name: 'Enterprise & AI Software',
    count: 4,
    color: 'amber',
    logos: [
      { name: 'Salesforce', component: 'Salesforce' },
      { name: 'NVIDIA', component: 'NVIDIA' },
      { name: 'Databricks', component: 'Databricks' },
      { name: 'LiveKit', component: 'LiveKit' }
    ]
  }
];

// Color theme configurations
const colorThemes = {
  emerald: {
    bg: 'bg-emerald-900/10',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400'
  },
  blue: {
    bg: 'bg-blue-900/10', 
    border: 'border-blue-500/20',
    accent: 'text-blue-400'
  },
  purple: {
    bg: 'bg-purple-900/10',
    border: 'border-purple-500/20', 
    accent: 'text-purple-400'
  },
  cyan: {
    bg: 'bg-cyan-900/10',
    border: 'border-cyan-500/20',
    accent: 'text-cyan-400'
  },
  amber: {
    bg: 'bg-amber-900/10',
    border: 'border-amber-500/20',
    accent: 'text-amber-400'
  }
} as const;

// Direct logo component without individual cards
const Logo = React.memo(({ logo, index }: { logo: { name: string; component: string }; index: number }) => {
  const LogoComponent = darkBackgroundLogos[logo.component as keyof typeof darkBackgroundLogos];
  
  if (!LogoComponent) {
    // Fallback to text if logo component not found
    return (
      <div className="flex items-center justify-center p-3 text-white/70 text-sm">
        {logo.name}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-3 group">
      <LogoComponent 
        width={100} 
        height={32} 
        className="transition-all duration-300 hover:scale-110 opacity-90 hover:opacity-100" 
      />
    </div>
  );
});

Logo.displayName = 'Logo';

// Category card component with professional logo layout and consistent height
const CategoryCard = React.memo(({ category, index }: { category: any; index: number }) => {
  const theme = colorThemes[category.color as keyof typeof colorThemes];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * index, duration: 0.6 }}
      className={`h-full flex flex-col p-8 rounded-2xl border ${theme.border} ${theme.bg} backdrop-blur-sm
                  hover:bg-white/5 transition-all duration-300 group min-h-[280px]`}
    >
      {/* Category header */}
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-white text-center">
          {category.name}
        </h3>
      </div>
      
      {/* Professional logo grid - directly within card */}
      <div className={`flex-1 grid ${category.count === 5 ? 'grid-cols-3' : 'grid-cols-2'} gap-6 content-center`}>
        {category.logos.map((logo: any, logoIndex: number) => (
          <Logo key={logo.name} logo={logo} index={logoIndex} />
        ))}
      </div>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default function StunningIntegrationsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background effects - removed for starfield visibility */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm text-center">
              Enterprise Integrations
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-emerald-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
            Connected Ecosystem
          </h2>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto text-center leading-relaxed">
            Native connectivity across your entire technology stack
          </p>
        </motion.div>
        
        {/* Integration categories grid - 2 on top, 3 below layout */}
        <div className="mb-16 space-y-8">
          {/* Top row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-6 px-0 sm:px-4 lg:px-0">
            {categories.slice(0, 2).map((category, index) => (
              <motion.div 
                key={category.id} 
                className="w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <CategoryCard category={category} index={index} />
              </motion.div>
            ))}
          </div>
          
          {/* Bottom row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(2, 5).map((category, index) => (
              <motion.div 
                key={category.id} 
                className="w-full sm:last:col-span-2 lg:last:col-span-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * (index + 2), duration: 0.5 }}
              >
                <CategoryCard category={category} index={index + 2} />
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}