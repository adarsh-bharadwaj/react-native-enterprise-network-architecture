/**
 * ENVIRONMENT CONFIGURATION LAYER
 *
 * 🔹 Centralized configuration
 * 🔹 No hardcoded base URLs inside axios
 * 🔹 Easily switch between dev / staging / prod
 */

type Environment = 'development' | 'staging' | 'production';

const ENV: Environment = __DEV__ ? 'development' : 'production';

const config = {
  development: {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    ENABLE_SSL_PINNING: false,
  },
  staging: {
    BASE_URL: 'https://staging.api.com',
    ENABLE_SSL_PINNING: true,
  },
  production: {
    BASE_URL: 'https://api.company.com',
    ENABLE_SSL_PINNING: true,
  },
};

export default config[ENV];