import UAParser from 'ua-parser-js';

export const parseUserAgent = (userAgentString) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();

  let deviceType = 'unknown';
  const device = result.device;
  if (device.type === 'mobile') {
    deviceType = 'mobile';
  } else if (device.type === 'tablet') {
    deviceType = 'tablet';
  } else if (!device.type || device.type === undefined) {
    deviceType = 'desktop';
  }

  return {
    browser: result.browser.name || 'Unknown',
    os: result.os.name || 'Unknown',
    deviceType: deviceType
  };
};

