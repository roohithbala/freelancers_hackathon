import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X, Info, AlertTriangle, Sparkles } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, options = {}) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      message,
      type: options.type || 'info',
      duration: options.duration || 5000,
      persistent: options.persistent || false
    };

    setToasts(prev => [...prev, newToast]);

    if (!newToast.persistent) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message, options) => toast(message, { ...options, type: 'success' }), [toast]);
  const error = useCallback((message, options) => toast(message, { ...options, type: 'error' }), [toast]);
  const warning = useCallback((message, options) => toast(message, { ...options, type: 'warning' }), [toast]);
  const info = useCallback((message, options) => toast(message, { ...options, type: 'info' }), [toast]);

  const value = {
    toast,
    success,
    error,
    warning,
    info,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <Check className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
    }
  };

  const tone = {
    success: { bg: 'bg-emerald-50', accent: 'text-emerald-500' },
    error: { bg: 'bg-rose-50', accent: 'text-rose-500' },
    warning: { bg: 'bg-amber-50', accent: 'text-amber-500' },
    info: { bg: 'bg-indigo-50', accent: 'text-indigo-600' },
  };

  const t = tone[toast.type] || tone.info;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.18 } }}
      className={`toast flex items-start ${t.bg} min-w-[320px] max-w-md ${toast.type === 'error' ? '' : ''}`}
    >
      <div className="icon">
        {getIcon()}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-900)' }}>{toast.message}</p>
      </div>

      {!toast.persistent && (
        <button onClick={() => onRemove(toast.id)} className="text-muted-200 hover:text-text-900 transition-colors p-1">
          <X className="w-4 h-4" />
        </button>
      )}
    </Motion.div>
  );
};

export default ToastProvider;
