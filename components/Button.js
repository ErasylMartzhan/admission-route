export default function Button({ children, onClick, type = 'primary', size = 'md', fullWidth = false, disabled = false, isLoading = false, className = '' }) {
  const colors = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    danger: 'bg-error-500 text-white hover:bg-error-600',
    success: 'bg-success-500 text-white hover:bg-success-600',
  };
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return <button onClick={onClick} disabled={disabled || isLoading} className={`${colors[type]} ${sizes[size]} rounded-lg font-semibold transition-all ${fullWidth ? 'w-full' : ''} ${className}`}>{isLoading ? 'Загрузка...' : children}</button>;
}