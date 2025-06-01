'use client';

export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static async showNotification(title: string, options?: NotificationOptions) {
    const hasPermission = await this.requestPermission();
    
    if (hasPermission) {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    }
    
    return null;
  }

  static showBookingReminder(trainName: string, departureTime: string) {
    this.showNotification('Pengingat Keberangkatan', {
      body: `Kereta ${trainName} akan berangkat dalam 1 jam (${departureTime})`,
      icon: '/favicon.ico',
      tag: 'booking-reminder'
    });
  }

  static showPriceAlert(route: string, price: string) {
    this.showNotification('Pemberitahuan Harga', {
      body: `Harga tiket ${route} turun menjadi ${price}!`,
      icon: '/favicon.ico',
      tag: 'price-alert'
    });
  }
}

// Hook for using notifications in React components
export const useNotifications = () => {
  const showBookingReminder = (trainName: string, departureTime: string) => {
    NotificationService.showBookingReminder(trainName, departureTime);
  };

  const showPriceAlert = (route: string, price: string) => {
    NotificationService.showPriceAlert(route, price);
  };

  const requestPermission = () => {
    return NotificationService.requestPermission();
  };

  return {
    showBookingReminder,
    showPriceAlert,
    requestPermission
  };
};
