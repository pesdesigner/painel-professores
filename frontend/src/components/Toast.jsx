import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsClosing(true);
      window.setTimeout(onClose, 180);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [onClose]);

  const icon = type === 'error' ? '✕' : '✓';

  return (
    <div className={`toast ${type} ${isClosing ? 'closing' : ''}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">{icon}</span>
      <span>{message}</span>
    </div>
  );
}
