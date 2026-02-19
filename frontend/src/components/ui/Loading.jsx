import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = ({ size = 'md', text, className = '', ...props }) => {
  const sizeMap = { sm: 16, md: 24, lg: 36, xl: 48 };
  const px = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} {...props}>
      <Motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        className="loader-ring"
        style={{ width: px + 4, height: px + 4 }}
        aria-hidden
      >
        <Loader2 style={{ width: px, height: px }} className="text-[var(--accent-600)]" />
      </Motion.div>

      {text && <span className="text-sm font-medium text-muted-200">{text}</span>}
    </div>
  );
};

const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loading size="xl" text="Calibrating project architect…" />
  </div>
);

const CardLoading = ({ text = 'Processing data…' }) => (
  <div className="card p-8 card--lift">
    <div className="flex items-center justify-center py-6">
      <Loading size="lg" text={text} />
    </div>
  </div>
);

const ButtonLoading = ({ text = 'Loading...' }) => (
  <div className="flex items-center gap-3">
    <Loading size="sm" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export { Loading, PageLoading, CardLoading, ButtonLoading };
export default Loading;
