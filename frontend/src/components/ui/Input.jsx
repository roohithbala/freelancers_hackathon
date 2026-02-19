import React from 'react';

const Input = ({ label, error, helperText, icon, type = 'text', className = '', containerClassName = '', rightIcon, ...props }) => {
  const base = ['input-field', className].filter(Boolean).join(' ');

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="input-label">{label}</label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-100">{icon}</div>
        )}

        <input
          type={type}
          className={`${base} ${icon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''}`}
          aria-invalid={!!error}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-100">{rightIcon}</div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-rose-400 font-semibold">{error}</p>}
      {helperText && !error && <p className="mt-2 text-sm text-muted-200">{helperText}</p>}
    </div>
  );
};

export default Input;
