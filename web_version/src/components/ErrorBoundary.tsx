'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FaTrain, FaExclamationTriangle, FaRefresh, FaHome } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center px-4">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="error-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#error-pattern)" />
            </svg>
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto">
            {/* Error Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-red-500/30">
                <FaExclamationTriangle className="text-4xl text-red-400" />
              </div>
              
              <div className="flex justify-center items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <FaTrain className="text-white text-sm" />
                <span className="text-white text-sm font-medium">KeretaXpress</span>
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4 mb-8">
              <h1 className="text-3xl font-bold text-white">
                Oops! Terjadi Kesalahan
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Maaf, aplikasi mengalami gangguan teknis. Tim kami akan segera memperbaikinya.
              </p>
              
              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
                  <summary className="text-red-300 font-medium cursor-pointer hover:text-red-200">
                    Detail Error (Development)
                  </summary>
                  <div className="mt-3 space-y-2">
                    <p className="text-red-200 text-sm font-mono">
                      {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-red-300 text-xs overflow-auto bg-red-900/30 p-2 rounded">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRefresh}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                <FaRefresh className="text-lg" />
                Muat Ulang Halaman
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200 hover:shadow-lg"
              >
                <FaHome className="text-lg" />
                Kembali ke Beranda
              </button>
            </div>

            {/* Support Information */}
            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <h3 className="text-white font-semibold mb-2">Butuh Bantuan?</h3>
              <p className="text-blue-100 text-sm mb-3">
                Jika masalah berlanjut, hubungi customer service kami:
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-blue-200">📞 0804-1-KERETA (537382)</p>
                <p className="text-blue-200">✉️ support@keretaxpress.co.id</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
