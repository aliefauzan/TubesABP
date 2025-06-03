import { REGEX_PATTERNS, ERROR_MESSAGES } from '@/constants';

/**
 * Validation utility functions
 */
export const validators = {
  required: (value: any) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return ERROR_MESSAGES.REQUIRED;
    }
    return null;
  },

  email: (value: string) => {
    if (!value) return ERROR_MESSAGES.REQUIRED;
    if (!REGEX_PATTERNS.EMAIL.test(value)) {
      return ERROR_MESSAGES.INVALID_EMAIL;
    }
    return null;
  },

  phone: (value: string) => {
    if (!value) return ERROR_MESSAGES.REQUIRED;
    if (!REGEX_PATTERNS.PHONE.test(value)) {
      return ERROR_MESSAGES.INVALID_PHONE;
    }
    return null;
  },

  idCard: (value: string) => {
    if (!value) return ERROR_MESSAGES.REQUIRED;
    if (!REGEX_PATTERNS.ID_CARD.test(value)) {
      return ERROR_MESSAGES.INVALID_ID_CARD;
    }
    return null;
  },

  name: (value: string) => {
    if (!value) return ERROR_MESSAGES.REQUIRED;
    if (!REGEX_PATTERNS.NAME.test(value)) {
      return ERROR_MESSAGES.INVALID_NAME;
    }
    return null;
  },

  password: (value: string) => {
    if (!value) return ERROR_MESSAGES.REQUIRED;
    if (value.length < 6) {
      return ERROR_MESSAGES.PASSWORD_MIN_LENGTH;
    }
    return null;
  },

  confirmPassword: (value: string, originalPassword: string) => {
    if (!value) return ERROR_MESSAGES.REQUIRED;
    if (value !== originalPassword) {
      return ERROR_MESSAGES.PASSWORDS_NOT_MATCH;
    }
    return null;
  }
};

/**
 * Session storage utilities
 */
export const sessionStorage = {
  set: <T>(key: string, value: T): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting sessionStorage key "${key}":`, error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }
};

/**
 * Local storage utilities
 */
export const localStorage = {
  set: <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

/**
 * URL utilities
 */
export const urlUtils = {
  buildUrl: (base: string, params: Record<string, string | number>) => {
    const url = new URL(base, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
    return url.toString();
  },

  getQueryParam: (param: string): string | null => {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  removeQueryParam: (param: string): void => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url.toString());
  }
};

/**
 * Array utilities
 */
export const arrayUtils = {
  unique: <T>(array: T[]): T[] => Array.from(new Set(array)),
  
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const group = item[key] as string;
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  sortBy: <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
};

/**
 * Date utilities
 */
export const dateUtils = {
  isValidDate: (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
  },

  formatDate: (date: Date | string, format: 'short' | 'long' = 'short'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (!dateUtils.isValidDate(dateObj)) return 'Invalid Date';

    const options: Intl.DateTimeFormatOptions = format === 'long' 
      ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      : { day: '2-digit', month: 'short', year: 'numeric' };

    return dateObj.toLocaleDateString('id-ID', options);
  },

  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  isSameDay: (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
  }
};

/**
 * String utilities
 */
export const stringUtils = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  truncate: (str: string, length: number): string => {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  removeAccents: (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

  slugify: (str: string): string => {
    return stringUtils.removeAccents(str)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

/**
 * Number utilities
 */
export const numberUtils = {
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },

  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  round: (num: number, decimals: number = 0): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
};
