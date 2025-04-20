import config from '../config/env.js';
export var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
export const logger = {
    info: (message, meta) => {
        console.info(`[${new Date().toISOString()}] [INFO] ${message}`, meta || '');
    },
    warn: (message, meta) => {
        console.warn(`[${new Date().toISOString()}] [WARN] ${message}`, meta || '');
    },
    error: (message, meta) => {
        console.error(`[${new Date().toISOString()}] [ERROR] ${message}`, meta || '');
    },
    debug: (message, meta) => {
        if (config.isDevelopment) {
            // eslint-disable-next-line no-console
            console.debug(`[${new Date().toISOString()}] [DEBUG] ${message}`, meta || '');
        }
    },
};
//# sourceMappingURL=logger.js.map