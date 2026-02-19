import React from 'react';
import { motion as Motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'xl',
  hover = false,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-gray-100 dark:border-slate-800 rounded-[2rem] transition-all duration-500';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
    xl: 'p-16'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };

  const hoverClasses = hover ? 'hover:shadow-3xl hover:-translate-y-2' : '';

  const classes = `
    ${baseClasses}
    ${paddings[padding]}
    ${shadows[shadow]}
    ${hoverClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div
      className={classes}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-8 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-black text-gray-900 dark:text-white tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-gray-500 dark:text-gray-400 font-medium leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
