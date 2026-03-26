import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, description, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, description, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000); // 5 seconds
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const colors = {
    info: '#3b82f6',
    success: '#10b981',
    event: '#f59e0b',
    announcement: '#8b5cf6',
    assignment: '#ef4444',
    course: '#ec4899',
    error: '#ef4444'
  };

  const color = colors[toast.type] || colors.info;

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      width: '320px',
      overflow: 'hidden',
      animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      position: 'relative',
      border: '1px solid #f3f4f6'
    }}>
      <div style={{ padding: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111827' }}>{toast.title}</h4>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        {toast.description && (
          <p style={{ margin: '6px 0 0 0', fontSize: '13.5px', color: '#4b5563', lineHeight: '1.4' }}>
            {toast.description}
          </p>
        )}
      </div>
      <div style={{
        height: '4px',
        background: color,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0
      }} />
      <style>{`
        @keyframes toastSlideIn {
          from { transform: translateX(110%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
