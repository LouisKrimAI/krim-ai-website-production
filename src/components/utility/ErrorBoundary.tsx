/**
 * KRIM AI - ERROR BOUNDARY
 * Catches React errors and displays a gentle fallback UI
 */

import React, { Component, ReactNode } from 'react';
import { ArrowClockwise } from '@phosphor-icons/react';
import { rlog } from '../../utils/rlog';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to runtime logger (beacon or console)
    rlog(error, errorInfo);

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-krim-deep-space flex items-center justify-center px-6">
          <div className="max-w-md w-full">
            {/* Glass card with gentle error message */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-krim-coral/10 border border-krim-coral/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-krim-coral/70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-semibold text-white/95 mb-3">
                Something went wrong
              </h2>

              {/* Message */}
              <p className="text-white/70 text-base leading-relaxed mb-6">
                We encountered an unexpected error. Please try reloading the page.
              </p>

              {/* Error details in dev mode */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mb-6 p-4 bg-black/20 rounded-lg border border-white/5 text-left">
                  <p className="text-xs font-mono text-krim-coral/80 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              {/* Reload button */}
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-krim-mint text-krim-deep-space rounded-lg font-semibold hover:bg-krim-mint/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-krim-mint/50 focus:ring-offset-2 focus:ring-offset-krim-deep-space"
              >
                <ArrowClockwise className="w-5 h-5" weight="bold" />
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
