import api from './api';

export const analyticsService = {
  getUrlAnalytics: async (shortCode) => {
    const response = await api.get(`/analytics/${shortCode}`);
    return response.data;
  },

  getUserAnalytics: async () => {
    const response = await api.get('/analytics/user');
    return response.data;
  }
};

