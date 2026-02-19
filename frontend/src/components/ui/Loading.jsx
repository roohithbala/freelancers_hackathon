import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

const Loading = ({
  size = 'md',
  text,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`} {...props}>
      <Motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <Loader2 className={`${sizes[size]} text-indigo-600 dark:text-indigo-400`} />
        {size === 'xl' && (
           <Motion.div 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 flex items-center justify-center"
           >
              <Sparkles className="w-6 h-6 text-purple-500" />
           </Motion.div>
        )}
      </Motion.div>
      {text && (
        <span className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{text}</span>
      )}
    </div>
  );
};

const PageLoading = () => (
  <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
    <Loading size="xl" text="Calibrating Project Architect..." />
  </div>
);

const CardLoading = () => (
  <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-gray-100 dark:border-slate-800 rounded-3xl p-12">
    <div className="flex items-center justify-center py-8">
      <Loading size="lg" text="Processing Data..." />
    </div>
  </div>
);

const ButtonLoading = ({ text = 'Loading...' }) => (
  <div className="flex items-center space-x-3">
    <Loading size="sm" />
    <span>{text}</span>
  </div>
);

export { Loading, PageLoading, CardLoading, ButtonLoading };
export default Loading;
