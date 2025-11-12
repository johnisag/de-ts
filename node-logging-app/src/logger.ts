import { createLogger, transports, format} from "winston";

// Create a logger instance with console and file transports
const logger = createLogger({
    level: 'info',
    format: format.combine( 
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {  
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ]
});

// export the logger for use in other modules
export default logger;