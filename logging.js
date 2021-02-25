const { transports, format,  createLogger} = require('winston');
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.simple()
    ),
    defaultMeta: { service: 'VUI-WOz-server' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        new  transports.File({ filename: 'errors.log', level: 'error' }),
        new  transports.File({ filename: 'events.log' }),
        new  transports.Console({
            format:  format.combine(
              format.colorize(),
              format.simple()
            )
          })
    ]
});

module.exports = { logger }