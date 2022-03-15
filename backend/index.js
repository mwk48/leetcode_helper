import config from './utils/config.js';
import https from "https";
import app from './app.js';

const server = https.createServer(app);

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});