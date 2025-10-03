// Developer API Configuration
// Place this in your frontend project root as api-config.js

const API_CONFIG = {
    // Production API (your current setup)
    PRODUCTION: {
        BASE_URL: 'https://rubavuport.codeguru-pro.com',
        API_PATH: '/codeguru/api',
        AUTH_PATH: '/codeguru/authenticate'
    },
    
    // Development API (for your developer)
    DEVELOPMENT: {
        BASE_URL: 'https://rubavuport.codeguru-pro.com',
        API_PATH: '/dev/api',        // Special dev endpoint
        AUTH_PATH: '/dev/authenticate' // Special dev auth endpoint
    },
    
    // Alternative: Direct backend access (if you open port 8097)
    DIRECT: {
        BASE_URL: 'http://YOUR_SERVER_IP:8097',
        API_PATH: '/codeguru/api',
        AUTH_PATH: '/codeguru/authenticate'
    }
};

// Auto-detect environment
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

export const API = isDevelopment ? API_CONFIG.DEVELOPMENT : API_CONFIG.PRODUCTION;

// Usage examples:
// const loginUrl = `${API.BASE_URL}${API.AUTH_PATH}`;
// const dataUrl = `${API.BASE_URL}${API.API_PATH}/revenuereport`;
