import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    apiBaseUrl: process.env.API_BASE_URL || 'https://api.scansave.com',
    environment: 'production',
  },
});
