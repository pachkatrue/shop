'use client';

import './success-modal.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="success-modal-backdrop">
      <div className="success-modal-content">
        <div className="success-modal-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="success-modal-title">Заказ успешно оформлен!</h3>
        <p className="success-modal-text">
          Мы свяжемся с вами в ближайшее время для подтверждения заказа.
        </p>
        <button onClick={onClose} className="success-modal-button">
          Закрыть
        </button>
      </div>
    </div>
  );
};
