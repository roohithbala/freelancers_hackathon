// Application Constants

export const APP_CONFIG = {
  name: 'AI Architect',
  version: '1.0.0',
  description: 'Professional SaaS Application Builder'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  DASHBOARD_HOME: '/dashboard/home',
  DASHBOARD_GENERATOR: '/dashboard/generator',
  DASHBOARD_ANALYTICS: '/dashboard/analytics',
  DASHBOARD_HISTORY: '/dashboard/history',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_SETTINGS: '/dashboard/settings'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  CURRENT_USER: 'current_user',
  REGISTERED_USERS: 'registered_users',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme_mode'
};

export const VALIDATION_RULES = {
  NAME: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PASSWORD: {
    minLength: 6,
    maxLength: 100,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSpecialChars: false
  }
};

export const PROJECT_TYPES = {
  WEB_APP: 'web-app',
  MOBILE_APP: 'mobile-app',
  API_SERVICE: 'api-service',
  DESKTOP_APP: 'desktop-app'
};

export const PROJECT_STATUSES = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  ARCHIVED: 'archived'
};

export const PROJECT_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  TIME: 'h:mm A',
  DATETIME: 'MM/DD/YYYY h:mm A',
  ISO: 'YYYY-MM-DD'
};

export const TIME_RANGES = {
  LAST_7_DAYS: '7d',
  LAST_30_DAYS: '30d',
  LAST_90_DAYS: '90d',
  LAST_YEAR: '1y'
};

export const EXPORT_FORMATS = {
  JSON: 'json',
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'xlsx'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify'
  },
  USERS: {
    PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
    PREFERENCES: '/users/preferences'
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id',
    EXPORT: '/projects/export'
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    TRAFFIC: '/analytics/traffic',
    REVENUE: '/analytics/revenue',
    EXPORT: '/analytics/export'
  },
  GENERATOR: {
    TEMPLATES: '/generator/templates',
    GENERATE: '/generator/generate',
    BLUEPRINTS: '/generator/blueprints'
  }
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  EMAIL_EXISTS: 'Email already registered.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  EXPORT_SUCCESS: 'Data exported successfully!'
};

export const LOADING_MESSAGES = {
  AUTHENTICATING: 'Authenticating...',
  LOADING: 'Loading...',
  SAVING: 'Saving...',
  DELETING: 'Deleting...',
  GENERATING: 'Generating...',
  EXPORTING: 'Exporting...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...'
};

export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  SECONDARY: {
    50: '#f0f9ff',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490'
  },
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  WARNING: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  },
  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },
  GRAY: {
    50: '#f9fafb',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};
