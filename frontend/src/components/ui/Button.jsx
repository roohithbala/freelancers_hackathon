import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  onClick,
  className = '',
  ...props
}) => {
  const variantMap = {
    primary: 'btn btn--primary',
    secondary: 'btn btn--secondary',
    ghost: 'btn btn--ghost',
    outline: 'btn btn--outline',
  };

  const sizeMap = {
    sm: 'btn--sm',
    md: 'btn--md',
    lg: 'btn--lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = [variantMap[variant] || variantMap.primary, sizeMap[size] || sizeMap.md, widthClass, className].filter(Boolean).join(' ');

  return (
    <Motion.button
      whileTap={{ scale: 0.985 }}
      whileHover={{ translateY: -2 }}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="loader-ring" aria-hidden>
          <Loader2 className="w-5 h-5 text-white" />
        </span>
      ) : (
        icon && <span className="inline-flex items-center">{icon}</span>
      )}
      <span style={{ display: 'inline-block' }}>{children}</span>
    </Motion.button>
  );
};

export default Button;
