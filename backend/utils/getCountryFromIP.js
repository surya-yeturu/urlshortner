import geoip from 'geoip-lite';

export const getCountryFromIP = (ip) => {
  try {
    // Handle localhost and internal IPs
    if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
      return 'Local';
    }

    const geo = geoip.lookup(ip);
    return geo ? geo.country : 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
};

