export default function Input({ label, value, onChange, type = 'text', placeholder, error, disabled = false }) {
  return <div className="w-full mb-4">
    {label && <label className="block text-sm font-medium mb-2">{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} className={`w-full px-4 py-2.5 border rounded-lg font-body ${error ? 'border-error-500 ring-2 ring-error-100' : 'border-neutral-300 focus:border-primary-500'}`} />
    {error && <p className="text-xs text-error-500 mt-1">{error}</p>}
  </div>;
}