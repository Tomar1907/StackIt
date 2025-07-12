"use client";

// Production monitoring and error handling

interface ErrorReport {
  error: Error;
  errorInfo?: any;
  userId?: string;
  timestamp: number;
  userAgent: string;
  url: string;
  buildId?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class MonitoringService {
  private isProduction = process.env.NODE_ENV === "production";
  private enableAnalytics = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
  private enableErrorReporting =
    process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === "true";
  private enablePerformanceMonitoring =
    process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === "true";

  // Error reporting
  reportError(error: Error, errorInfo?: any, userId?: string) {
    if (!this.enableErrorReporting) return;

    const report: ErrorReport = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } as Error,
      errorInfo,
      userId,
      timestamp: Date.now(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "server",
      url: typeof window !== "undefined" ? window.location.href : "server",
    };

    // In production, send to monitoring service
    if (this.isProduction) {
      this.sendErrorReport(report);
    } else {
      console.error("Error Report:", report);
    }
  }

  // Performance monitoring
  reportPerformanceMetric(
    name: string,
    value: number,
    metadata?: Record<string, any>,
  ) {
    if (!this.enablePerformanceMonitoring) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      metadata,
    };

    if (this.isProduction) {
      this.sendPerformanceMetric(metric);
    } else {
      console.log("Performance Metric:", metric);
    }
  }

  // Web Vitals monitoring
  reportWebVitals(metric: any) {
    if (!this.enablePerformanceMonitoring) return;

    this.reportPerformanceMetric(`web-vital-${metric.name}`, metric.value, {
      id: metric.id,
      label: metric.label,
    });
  }

  // User analytics
  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (!this.enableAnalytics) return;

    const event = {
      name: eventName,
      properties,
      timestamp: Date.now(),
      url: typeof window !== "undefined" ? window.location.href : "server",
    };

    if (this.isProduction) {
      this.sendAnalyticsEvent(event);
    } else {
      console.log("Analytics Event:", event);
    }
  }

  // Private methods for sending data
  private async sendErrorReport(report: ErrorReport) {
    try {
      // Replace with your error reporting service
      await fetch("/api/monitoring/errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report),
      });
    } catch (error) {
      console.error("Failed to send error report:", error);
    }
  }

  private async sendPerformanceMetric(metric: PerformanceMetric) {
    try {
      // Replace with your performance monitoring service
      await fetch("/api/monitoring/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      console.error("Failed to send performance metric:", error);
    }
  }

  private async sendAnalyticsEvent(event: any) {
    try {
      // Replace with your analytics service
      await fetch("/api/monitoring/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("Failed to send analytics event:", error);
    }
  }
}

// Singleton instance
export const monitoring = new MonitoringService();

// Web Vitals reporting
export function reportWebVitals(metric: any) {
  monitoring.reportWebVitals(metric);
}

// React Error Boundary integration
export function reportErrorBoundary(error: Error, errorInfo: any) {
  monitoring.reportError(error, errorInfo);
}

// Performance measurement utilities
export class PerformanceTracker {
  private startTime: number;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.startTime = performance.now();
  }

  finish(metadata?: Record<string, any>) {
    const duration = performance.now() - this.startTime;
    monitoring.reportPerformanceMetric(this.name, duration, metadata);
    return duration;
  }
}

// Hook for tracking component performance
export function usePerformanceTracker(name: string) {
  const tracker = new PerformanceTracker(name);

  return {
    finish: (metadata?: Record<string, any>) => tracker.finish(metadata),
  };
}