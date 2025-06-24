// Expo app config with custom API base URL from environment
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  },
});
