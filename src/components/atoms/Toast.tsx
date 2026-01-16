/**
 * KRIM AI - TOAST COMPONENT
 * Minimal portal-based toast notification
 */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../hooks/useToast';

export default function Toast() {
  const { message, visible } = useToast();

  // Mount portal container on first render
  useEffect(() => {
    const container = document.getElementById('toast-root') || (() => {
      const el = document.createElement('div');
      el.id = 'toast-root';
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      document.body.appendChild(el);
      return el;
    })();

    return () => {
      // Cleanup if no toasts remain
      if (!visible) {
        const el = document.getElementById('toast-root');
        if (el && !el.hasChildNodes()) {
          el.remove();
        }
      }
    };
  }, [visible]);

  const toastRoot = document.getElementById('toast-root');
  if (!toastRoot) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none"
          role="status"
        >
          <div className="bg-krim-deep-space/95 backdrop-blur-xl border border-krim-mint/30 rounded-xl px-6 py-3 shadow-xl shadow-krim-mint/10">
            <p className="text-white/95 text-sm font-medium whitespace-nowrap">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    toastRoot
  );
}
