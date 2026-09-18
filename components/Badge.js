export default function Badge({ children, variant = 'primary', size = 'md', className = '' }) {
  const colors = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    error: 'bg-error-100 text-error-700',
  };
  return <span className={`inline-flex items-center font-medium text-sm px-3 py-1 rounded-full ${colors[variant]} ${className}`}>{children}</span>;
}