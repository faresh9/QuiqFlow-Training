import app from './app.js';
import config from './config/env.js';
import { logger } from './utils/logger.js';
app.listen(config.port, () => {
    logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});
//# sourceMappingURL=index.js.map