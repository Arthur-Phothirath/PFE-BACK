const { createLogger, transports, format, Logger } = require('winston');
const LokiTransport = require('winston-loki');
let loggerLocal;

const initializeLogger = () => {
  if (loggerLocal) return;
  console.log('initializeLogger');
  console.log('Grafana Loki URL: ', process.env.GRAFANA_URL);
  console.log('Grafana Loki Auth: ', process.env.GRAFANA_AUTH);
  loggerLocal = createLogger({
    transports: [
      new LokiTransport({
        host: process.env.GRAFANA_URL,
        labels: { app: 'api' },
        basicAuth: process.env.GRAFANA_AUTH,
        json: true,
        // @ts-ignore
        format: format.json(),
        // interval: 10,
        // timeout: 6000,
        replaceTimestamp: true,
        onConnectionError: (err) => console.error(err),
      }),
      new transports.Console({
        format: format.combine(format.simple(), format.colorize()),
      }),
    ],
  });
};

// logger
const logger = () => {
  initializeLogger();
  return loggerLocal;
};

exports.logResponseTime = (req, res, time) => {
  const logger = logger();
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;

  console.log('------------------');
  console.log('status', status, 'method', method, 'url', url, 'time', time);
  console.log('------------------');

  logger.info({
    message: `method=${method} url=${url} status=${status} duration=${time}ms`,
    labels: { origin: 'api' },
  });
};

exports.logError = (err, req, res, next) => {
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;

  const logger = getLogger();

  console.log('------------------');
  console.log('err', err);
  console.log('------------------');

  logger.error({
    message: `method=${method} url=${url} status=${status} error=${err.stack}`,
    labels: { origin: 'api' },
  });
  next();
};

module.exports = () => logger();
