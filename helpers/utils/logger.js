const winston = require("winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console({
    level: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  })],
  exitOnError: false,
});

const log = (ctx, message, scope) => {
  const obj = { ctx, message, scope };
  logger.info(obj);
};

module.exports = { log };
