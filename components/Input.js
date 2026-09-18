import { useId } from 'react';

/* Поле ввода. Ошибка и подсказка связаны с полем через aria-describedby,
   чтобы скринридер прочитал причину, а не просто «поле недопустимо». */

export default function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  error,
  disabled = false,
  inputMode,
  className = '',
  ...rest
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-body-sm font-medium text-ink mb-2">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`w-full min-h-tap px-4 py-2.5 rounded-md border bg-surface font-body text-body-md text-ink
          placeholder:text-ink-muted transition-all duration-base focus-ring
          disabled:bg-neutral-100 disabled:text-ink-muted disabled:cursor-not-allowed
          ${
            error
              ? 'border-error-500 focus-visible:ring-error-500'
              : 'border-line-strong hover:border-neutral-400'
          }`}
        {...rest}
      />

      {error ? (
        <p id={errorId} className="text-body-xs text-error-600 mt-1.5">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-body-xs text-ink-muted mt-1.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
