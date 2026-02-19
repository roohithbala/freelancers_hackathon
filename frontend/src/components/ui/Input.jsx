import React from 'react';

const Input = ({
  label,
  error,
  helperText,
  icon,
  type = 'text',
  className = '',
  containerClassName = '',
  rightIcon,
  ...props
}) => {
  const baseInputClasses = 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
  const iconPadding = icon ? 'pl-10' : '';
  const rightIconPadding = rightIcon ? 'pr-10' : '';
  
  const inputClasses = `${baseInputClasses} ${errorClasses} ${iconPadding} ${rightIconPadding} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
