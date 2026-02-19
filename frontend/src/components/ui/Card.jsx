import React from 'react';
import { motion as Motion } from 'framer-motion';

const Card = ({ children, className = '', padding = 'md', lift = false, ...props }) => {
  const padMap = { sm: 'p-4', md: 'p-6', lg: 'p-8', xl: 'p-10' };
  const classes = ['card', padMap[padding] || padMap.md, lift ? 'card--lift' : '', className].filter(Boolean).join(' ');

  return (
    <Motion.div className={classes} {...props}>
      {children}
    </Motion.div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>{children}</div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-semibold ${className}`} {...props}>{children}</h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-muted-200 ${className}`} {...props}>{children}</p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>{children}</div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-6 pt-4 border-t border-[var(--border)] ${className}`} {...props}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
