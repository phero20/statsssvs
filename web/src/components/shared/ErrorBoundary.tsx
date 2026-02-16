"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    toast.error("An unexpected error occurred. Please try again later.");
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Something went wrong
            </h2>
            <p className="mt-2 text-gray-600">
              The application encountered an error.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
