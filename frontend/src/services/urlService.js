import api from './api';

export const urlService = {
  createUrl: async (longUrl, customAlias, expiration, isPrivate, customExpiration) => {
    const response = await api.post('/urls', {
      longUrl,
      customAlias,
      expiration,
      isPrivate,
      customExpiration
    });
    return response.data;
  },

  getUserUrls: async () => {
    const response = await api.get('/urls');
    return response.data;
  },

  getUrl: async (id) => {
    const response = await api.get(`/urls/${id}`);
    return response.data;
  },

  deleteUrl: async (id) => {
    const response = await api.delete(`/urls/${id}`);
    return response.data;
  },

  getQRCode: async (id) => {
    const response = await api.get(`/urls/${id}/qr`);
    return response.data;
  }
};

