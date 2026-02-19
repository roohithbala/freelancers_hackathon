import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = ({
  size = 'md',
  text,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`} {...props}>
      <Motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizes[size]} text-blue-500`} />
      </Motion.div>
      {text && (
        <span className="text-gray-400">{text}</span>
      )}
    </div>
  );
};

const PageLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <Loading size="xl" text="Loading..." />
  </div>
);

const CardLoading = () => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
    <div className="flex items-center justify-center py-8">
      <Loading size="lg" text="Loading..." />
    </div>
  </div>
);

const ButtonLoading = ({ text = 'Loading...' }) => (
  <div className="flex items-center space-x-2">
    <Loading size="sm" />
    <span>{text}</span>
  </div>
);

export { Loading, PageLoading, CardLoading, ButtonLoading };
export default Loading;
