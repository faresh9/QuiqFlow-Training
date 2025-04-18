import dotenv from 'dotenv';
dotenv.config();

export default {
  // Server configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),

  // Environment flags
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // API settings
  apiPrefix: process.env.API_PREFIX || '/api',

  // Validation options
  validation: {
    minTitleLength: parseInt(process.env.MIN_TITLE_LENGTH || '3', 10),
    minContentLength: parseInt(process.env.MIN_CONTENT_LENGTH || '10', 10),
  },
};
