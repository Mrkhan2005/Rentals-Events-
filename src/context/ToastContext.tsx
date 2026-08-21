import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X, Calendar, ArrowRight } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'booking';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (options: {
    type?: ToastType;
    title: string;
    message?: string;
    duration?: number;
    action?: { label: string; onClick: () => void };
  }) => string;
  success: (title: string, message?: string, duration?: number) => string;
  error: (title: string, message?: string, duration?: number) => string;
  info: (title: string, message?: string, duration?: number) => string;
  bookingSuccess: (details: { title?: string; message?: string; date?: string }) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback((options: {
    type?: ToastType;
    title: string;
    message?: string;
    duration?: number;
    action?: { label: string; onClick: () => void };
  }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = options.duration ?? 5000;

    const newToast: ToastItem = {
      id,
      type: options.type || 'success',
      title: options.title,
      message: options.message,
      duration,
      action: options.action,
      createdAt: Date.now(),
    };

    setToasts(prev => [newToast, ...prev].slice(0, 4)); // keep max 4 toasts at once

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  }, [dismissToast]);

  const success = useCallback((title: string, message?: string, duration?: number) => {
    return showToast({ type: 'success', title, message, duration });
  }, [showToast]);

  const error = useCallback((title: string, message?: string, duration?: number) => {
    return showToast({ type: 'error', title, message, duration });
  }, [showToast]);

  const info = useCallback((title: string, message?: string, duration?: number) => {
    return showToast({ type: 'info', title, message, duration });
  }, [showToast]);

  const bookingSuccess = useCallback((details: { title?: string; message?: string; date?: string }) => {
    const title = details.title || 'Booking Request Confirmed!';
    const message = details.message || (details.date 
      ? `Your reservation request for ${details.date} has been dispatched. Our team will contact you shortly.` 
      : 'Your event reservation request has been submitted successfully.');
    return showToast({ type: 'booking', title, message, duration: 6000 });
  }, [showToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        info,
        bookingSuccess,
        dismissToast,
        clearAllToasts,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(toast => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: () => void;
}

export const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'booking':
        return (
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0 border border-white/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        );
      case 'success':
        return (
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'error':
        return (
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30 shadow-md shadow-rose-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/30 shadow-md shadow-cyan-500/20">
            <Info className="w-5 h-5" />
          </div>
        );
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'booking':
        return 'border-cyan-400/40 shadow-[0_20px_50px_rgba(6,182,212,0.25)]';
      case 'success':
        return 'border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.2)]';
      case 'error':
        return 'border-rose-500/40 shadow-[0_20px_50px_rgba(244,63,94,0.2)]';
      case 'info':
      default:
        return 'border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]';
    }
  };

  return (
    <div
      role={toast.type === 'error' ? 'alert' : 'status'}
      className={`pointer-events-auto relative w-full bg-slate-950/90 backdrop-blur-2xl text-white rounded-3xl p-4 sm:p-5 border ${getBorderColor()} flex items-start gap-3.5 transition-all duration-300 transform animate-in slide-in-from-bottom-5 fade-in zoom-in-95 group overflow-hidden`}
    >
      {/* Background subtle liquid glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {getIcon()}

      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-2">
          <h5 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">
            {toast.title}
          </h5>
        </div>
        {toast.message && (
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            {toast.message}
          </p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>{toast.action.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
