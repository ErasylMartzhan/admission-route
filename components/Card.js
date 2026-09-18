export default function Card({ children, title, variant = 'default', selected = false, onClick, className = '' }) {
  const styles = {
    default: 'bg-white border border-neutral-200 shadow-sm',
    accent: 'bg-primary-50 border border-primary-200',
  };
  return <div onClick={onClick} className={`${styles[variant]} p-6 rounded-xl transition-all ${selected ? 'ring-2 ring-primary-500' : ''} ${className}`}>{title && <h3 className="font-bold mb-3">{title}</h3>}{children}</div>;
}