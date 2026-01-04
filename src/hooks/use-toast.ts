import { createContext, useContext, useMemo, useState, useCallback, ReactNode } from 'react';
import { Check, X, Info, AlertTriangle, LucideIcon } from 'lucide-react';

// --- 1. Types and Interfaces ---

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastOptions {
  duration?: number;
  type?: ToastType;
  action?: Toast['action'];
}

interface ToastContextValue {
  toasts: Toast[];
  show: (message: string, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// --- 2. Internal Utility for ID generation ---
let toastIdCounter = 0;
const generateId = () => `toast-${++toastIdCounter}`;

// --- 3. The Toast Provider (State Management) ---

/**
 * Provides the state management and core logic for the toast system.
 * Renders the toast viewport (although the visual ToastItem component is external).
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const getIcon = (type: ToastType): LucideIcon => {
    switch (type) {
      case 'success': return Check;
      case 'error': return X;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const dismiss = useCallback((id: string) => {
    setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message: string, options: ToastOptions = {}): string => {
    const id = generateId();
    const type = options.type || 'default';
    // Errors stay visible slightly longer, mimicking high-stakes feedback (like failed login)
    const duration = options.duration ?? (type === 'error' ? 6000 : 4000); 

    const newToast: Toast = {
      id,
      message,
      type,
      duration,
      icon: getIcon(type),
      action: options.action,
    };

    // Prepend new toast for LIFO display order
    setToasts(currentToasts => [newToast, ...currentToasts]);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }

    return id;
  }, [dismiss]);

  const value = useMemo(() => ({
    toasts,
    show,
    dismiss,
  }), [toasts, show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* 
        This is the Netflix-styled viewport component where the list of 'toasts' 
        (handled by external ToastItem components) would be rendered.
      */}
      <div className="fixed bottom-4 right-4 z-[9999] space-y-3 pointer-events-none">
        {toasts.map(toast => (
          // Use an external component (ToastItem) that handles the Tailwind/Lucide rendering
          <ToastItem key={toast.id} toast={toast} dismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- 4. The Hook: useToast ---

/**
 * Hook to access the Netflix-themed Toast system, providing methods 
 * to show and dismiss notifications.
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  // Create convenience methods bound to specific types
  const toastMethods = useMemo(() => ({
    show: context.show,
    dismiss: context.dismiss,
    
    default: (message: string, options?: Omit<ToastOptions, 'type'>) => 
      context.show(message, { ...options, type: 'default' }),
      
    success: (message: string, options?: Omit<ToastOptions, 'type'>) => 
      context.show(message, { ...options, type: 'success' }),
      
    error: (message: string, options?: Omit<ToastOptions, 'type'>) => 
      context.show(message, { ...options, type: 'error' }),
      
    warning: (message: string, options?: Omit<ToastOptions, 'type'>) => 
      context.show(message, { ...options, type: 'warning' }),
      
    info: (message: string, options?: Omit<ToastOptions, 'type'>) => 
      context.show(message, { ...options, type: 'info' }),
      
  }), [context.show, context.dismiss]);

  return toastMethods;
};


// --- 5. Example Toast Rendering Component (Netflix Styling) ---

/**
 * Defines the Tailwind styling for a single Netflix-themed toast item.
 */
export const ToastItem = ({ toast, dismiss }: { toast: Toast, dismiss: (id: string) => void }) => {
    const { message, type, icon: Icon, action } = toast;
    
    // Base classes for cinematic feel: dark, rounded, shadow, quick slide animation
    const baseClasses = "flex items-center w-full max-w-sm p-4 text-white rounded-lg shadow-2xl transition-all duration-300 transform border-l-4 pointer-events-auto cursor-pointer";
    
    let colorClasses = "bg-gray-900 border-gray-700"; // Default: Deep gray

    if (type === 'success') {
        colorClasses = "bg-gray-800 border-green-600";
    } else if (type === 'error') {
        // Distinctive Netflix red for errors
        colorClasses = "bg-black/90 border-red-700"; 
    } else if (type === 'warning') {
        colorClasses = "bg-gray-800 border-yellow-500";
    } else if (type === 'info') {
        colorClasses = "bg-gray-800 border-blue-600";
    }

    return (
        <div 
            className={`${baseClasses} ${colorClasses} animate-in slide-in-from-right-1/4 fade-in-0 duration-300`}
            role="alert"
        >
            {Icon && (
                <div className="flex-shrink-0 mr-3 opacity-80">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <div className="flex-1 text-sm font-medium">
                {message}
            </div>
            
            {action && (
                <button 
                    onClick={action.onClick}
                    className="ml-4 text-sm font-bold text-red-500 hover:text-red-400 transition-colors focus:outline-none"
                >
                    {action.label}
                </button>
            )}

            <button 
                onClick={() => dismiss(toast.id)}
                className="ml-4 p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Dismiss"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};