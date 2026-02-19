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
  const baseInputClasses = 'w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const iconPadding = icon ? 'pl-14' : '';
  const rightIconPadding = rightIcon ? 'pr-14' : '';
  
  const inputClasses = `${baseInputClasses} ${errorClasses} ${iconPadding} ${rightIconPadding} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-600 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500 font-bold ml-1">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium ml-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
