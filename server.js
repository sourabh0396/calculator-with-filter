// // // server.js

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const winston = require('winston');
// // require('winston-mongodb');
// // const math = require('mathjs');
// // const cors = require('cors');
// // const path = require('path');
// // const fs = require('fs');

// // // Function to format date as YYYY-MM-DD
// // const getFormattedDate = () => {
// //   const date = new Date();
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // Configure Winston logger
// // const logFileName = `${getFormattedDate()}.logs`;
// // const logger = winston.createLogger({
// //   level: 'info',
// //   transports: [
// //     // File transport
// //     new winston.transports.File({
// //       filename: path.join('logs', logFileName),
// //       format: winston.format.combine(
// //         winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
// //         winston.format.align(),
// //         winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
// //       ),
// //       maxsize: 1024 * 1024 * 10, // Rotate file when it reaches 10MB
// //       maxFiles: 5, // Keep up to 5 log files
// //     }),
// //     // MongoDB transport
// //     new winston.transports.MongoDB({
// //       level: 'error',
// //       db: 'mongodb+srv://sourabhpatil0369:E03jEzYLpOiI30z2@cluster0.uscvgdc.mongodb.net/',
// //       options: {
// //         useUnifiedTopology: true
// //       },
// //       collection: 'server_logs',
// //       format: winston.format.combine(
// //         winston.format.timestamp(),
// //         winston.format.json()
// //       )
// //     })
// //   ]
// // });

// // // MongoDB connection
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sourabhpatil0369:E03jEzYLpOiI30z2@cluster0.uscvgdc.mongodb.net/';
// // mongoose.connect(MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => {
// //   console.log('Connected to MongoDB');
// // }).catch(err => {
// //   logger.error(`Error connecting to MongoDB: ${err.message}`);
// //   console.error('Error connecting to MongoDB:', err.message);
// //   process.exit(1);
// // });

// // // Define CalculatorLog schema
// // const calculatorLogSchema = new mongoose.Schema({
// //   id: { type: Number, required: true },
// //   expression: { type: String, required: true },
// //   isValid: { type: Boolean, required: true },
// //   output: { type: Number, required: true },
// //   createdOn: { type: Date, default: Date.now }
// // });
// // const CalculatorLog = mongoose.model('CalculatorLog', calculatorLogSchema);

// // // Initialize Express app
// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Helper function to handle database operations
// // const handleDbOperation = (operation) => async (req, res, next) => {
// //   try {
// //     await operation(req, res);
// //   } catch (error) {
// //     logger.error(`Database operation error: ${error.message}`);
// //     res.status(500).json({ message: 'Internal Server Error' });
// //   }
// // };

// // // Routes
// // app.post('/api/logs', handleDbOperation(async (req, res) => {
// //   const { expression } = req.body;
// //   if (!expression) {
// //     logger.info('Received an empty expression');
// //     return res.status(400).json({ message: 'Expression is empty' });
// //   }
// //   let output = null;
// //   let isValid = true;
// //   try {
// //     output = math.evaluate(expression);
// //     output = parseFloat(output.toFixed(2)); // Format to 2 decimal places
// //     isValid = true;
// //   } catch (err) {
// //     logger.warn(`Invalid expression attempted: ${expression}`);
// //     isValid = false;
// //   }
  
// //   const calculatorLog = new CalculatorLog({ expression, isValid, output });
// //   await calculatorLog.save();
// //   logger.info(`Expression logged: ${expression} | Valid: ${isValid}`);

// //   return res.json({
// //     message: isValid ? `Expression evaluated to ${output}` : 'Invalid expression',
// //     output: isValid ? output : null,
// //     isValid
// //   });
// // }));

// // app.get('/api/logs', handleDbOperation(async (req, res) => {
// //   const logs = await CalculatorLog.find().sort({ createdOn: -1 }).limit(10).exec();
// //   logger.info('Successfully retrieved logs');
// //   res.json(logs);
// // }));

// // app.get('/', (req, res) => {
// //   res.send('Hello from the Calculator Log API!');
// //   logger.info('Served root endpoint');
// // });

// // // Create logs directory if it doesn't exist
// // const logsDir = path.join(__dirname, 'logs');
// // if (!fs.existsSync(logsDir)) {
// //   fs.mkdirSync(logsDir);
// // }

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// //   logger.info(`Server started on port ${PORT}`);
// // });
// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const winston = require('winston');
// require('winston-mongodb');
// const math = require('mathjs');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// // Function to format date as YYYY-MM-DD
// const getFormattedDate = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // Configure Winston logger
// const logFileName = `${getFormattedDate()}.logs`;
// const logger = winston.createLogger({
//   level: 'info',
//   transports: [
//     // File transport
//     new winston.transports.File({
//       filename: path.join('logs', logFileName),
//       format: winston.format.combine(
//         winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
//         winston.format.align(),
//         winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
//       ),
//       maxsize: 1024 * 1024 * 10, // Rotate file when it reaches 10MB
//       maxFiles: 5, // Keep up to 5 log files
//     }),
//     // MongoDB transport
//     new winston.transports.MongoDB({
//       level: 'error',
//       db: 'mongodb+srv://sourabhpatil0369:E03jEzYLpOiI30z2@cluster0.uscvgdc.mongodb.net/',
//       options: {
//         useUnifiedTopology: true
//       },
//       collection: 'server_logs',
//       format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//       )
//     })
//   ]
// });

// // MongoDB connection
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sourabhpatil0369:E03jEzYLpOiI30z2@cluster0.uscvgdc.mongodb.net/';
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   logger.error(`Error connecting to MongoDB: ${err.message}`);
//   console.error('Error connecting to MongoDB:', err.message);
//   process.exit(1);
// });

// // Define Counter schema and model
// const counterSchema = new mongoose.Schema({
//   _id: String, // Identifier for the counter
//   sequence_value: Number
// });
// const Counter = mongoose.model('Counter', counterSchema);

// // Function to get next sequence value
// const getNextSequenceValue = async (sequenceName) => {
//   const sequenceDocument = await Counter.findByIdAndUpdate(
//     sequenceName,
//     { $inc: { sequence_value: 1 } },
//     { new: true, upsert: true }
//   );
//   return sequenceDocument.sequence_value;
// };

// // Initialize counters
// const initCounters = async () => {
//   const existingCounter = await Counter.findById('calculatorLogId');
//   if (!existingCounter) {
//     await Counter.create({ _id: 'calculatorLogId', sequence_value: 0 });
//   }
// };

// initCounters();

// // Define CalculatorLog schema and model
// const calculatorLogSchema = new mongoose.Schema({
//   id: { type: Number, required: true }, // Custom sequential ID
//   expression: { type: String, required: true },
//   isValid: { type: Boolean, required: true },
//   output: { type: Number, required: true },
//   createdOn: { type: Date, default: Date.now }
// });
// const CalculatorLog = mongoose.model('CalculatorLog', calculatorLogSchema);

// // Initialize Express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Helper function to handle database operations
// const handleDbOperation = (operation) => async (req, res, next) => {
//   try {
//     await operation(req, res);
//   } catch (error) {
//     logger.error(`Database operation error: ${error.message}`);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Routes
// app.post('/api/logs', handleDbOperation(async (req, res) => {
//   const { expression } = req.body;
//   if (!expression) {
//     logger.info('Received an empty expression');
//     return res.status(400).json({ message: 'Expression is empty' });
//   }

//   let output = null;
//   let isValid = true;
//   try {
//     output = math.evaluate(expression);
//     output = parseFloat(output.toFixed(2)); // Format to 2 decimal places
//     isValid = true;
//   } catch (err) {
//     logger.warn(`Invalid expression attempted: ${expression}`);
//     isValid = false;
//   }

//   // Get the next sequence value for the id
//   const nextId = await getNextSequenceValue('calculatorLogId');

//   const calculatorLog = new CalculatorLog({ id: nextId, expression, isValid, output });
//   await calculatorLog.save();
//   logger.info(`Expression logged: ${expression} | Valid: ${isValid}`);

//   return res.json({
//     message: isValid ? `Expression evaluated to ${output}` : 'Invalid expression',
//     output: isValid ? output : null,
//     isValid
//   });
// }));
// app.get('/api/logs', async (req, res) => {
//     const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 logs per page

//     try {
//         const logs = await Log.find()
//             .sort({ _id: -1 }) // Sort logs by descending order of creation
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         const totalLogs = await Log.countDocuments();

//         res.json({
//             logs,
//             totalPages: Math.ceil(totalLogs / limit),
//             currentPage: parseInt(page),
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch logs' });
//     }
// });



// // Create logs directory if it doesn't exist
// const logsDir = path.join(__dirname, 'logs');
// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir);
// }

// // Define a new DELETE endpoint to delete selected logs
// app.delete('/api/logs', handleDbOperation(async (req, res) => {   // Extract the array of IDs from the request body
//     const { ids } = req.body; // Expecting an array of ids
//     if (!Array.isArray(ids) || ids.length === 0) {// Check if the IDs are provided and are an array
//       logger.warn('No IDs provided for deletion');      // Log a warning if no IDs are provided
//       return res.status(400).json({ message: 'No IDs provided' });      // Return a 400 error response with a message
//     }
  
//     const result = await CalculatorLog.deleteMany({ id: { $in: ids } });// Use the CalculatorLog model to delete logs with IDs in the provided array
//     logger.info(`Deleted ${result.deletedCount} log(s) with IDs: ${ids}`);// Log the number of deleted logs
  
//     // Return a success response with the number of deleted logs
//     return res.json({ message: `Deleted ${result.deletedCount} log(s)` });
//   }));
  
// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   logger.info(`Server started on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
require('winston-mongodb');
const math = require('mathjs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Function to format date as YYYY-MM-DD
const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Configure Winston logger
const logFileName = `${getFormattedDate()}.logs`;
const logger = winston.createLogger({
  level: 'info',
  transports: [
    // File transport
    new winston.transports.File({
      filename: path.join('logs', logFileName),
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.align(),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      ),
      maxsize: 1024 * 1024 * 10, // Rotate file when it reaches 10MB
      maxFiles: 5, // Keep up to 5 log files
    }),
    // MongoDB transport
    new winston.transports.MongoDB({
      level: 'error',
      db: 'mongodb+srv://sourabhpatil0369:E03jEzYLpOiI30z2@cluster0.uscvgdc.mongodb.net/',
      options: {
        useUnifiedTopology: true
      },
      collection: 'server_logs',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sourabhpatil0369:E03jEzYLpOiI30z2@cluster0.uscvgdc.mongodb.net/';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  logger.error(`Error connecting to MongoDB: ${err.message}`);
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

// Define Counter schema and model
const counterSchema = new mongoose.Schema({
  _id: String, // Identifier for the counter
  sequence_value: Number
});
const Counter = mongoose.model('Counter', counterSchema);

// Function to get next sequence value
const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
};

// Initialize counters
const initCounters = async () => {
  const existingCounter = await Counter.findById('calculatorLogId');
  if (!existingCounter) {
    await Counter.create({ _id: 'calculatorLogId', sequence_value: 0 });
  }
};

initCounters();

// Define CalculatorLog schema and model
const calculatorLogSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Custom sequential ID
  expression: { type: String, required: true },
  isValid: { type: Boolean, required: true },
  output: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now }
});
const CalculatorLog = mongoose.model('CalculatorLog', calculatorLogSchema);

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Helper function to handle database operations
const handleDbOperation = (operation) => async (req, res, next) => {
  try {
    await operation(req, res);
  } catch (error) {
    logger.error(`Database operation error: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Routes
app.post('/api/logs', handleDbOperation(async (req, res) => {
  const { expression } = req.body;
  if (!expression) {
    logger.info('Received an empty expression');
    return res.status(400).json({ message: 'Expression is empty' });
  }

  let output = null;
  let isValid = true;
  try {
    output = math.evaluate(expression);
    output = parseFloat(output.toFixed(2)); // Format to 2 decimal places
    isValid = true;
  } catch (err) {
    logger.warn(`Invalid expression attempted: ${expression}`);
    isValid = false;
  }

  // Get the next sequence value for the id
  const nextId = await getNextSequenceValue('calculatorLogId');

  const calculatorLog = new CalculatorLog({ id: nextId, expression, isValid, output });
  await calculatorLog.save();
  logger.info(`Expression logged: ${expression} | Valid: ${isValid}`);

  return res.json({
    message: isValid ? `Expression evaluated to ${output}` : 'Invalid expression',
    output: isValid ? output : null,
    isValid
  });
}));

// Route to fetch calculator logs with pagination
app.get('/api/logs', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const logs = await CalculatorLog.find()
      .sort({ createdOn: -1 }) // Sort logs by descending order of creation
      .skip((page - 1) * limit)
      .limit(limit);

    const totalLogs = await CalculatorLog.countDocuments();

    res.json({
      logs,
      totalPages: Math.ceil(totalLogs / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Define a new DELETE endpoint to delete selected logs
app.delete('/api/logs', handleDbOperation(async (req, res) => {
  const { ids } = req.body; // Expecting an array of ids
  if (!Array.isArray(ids) || ids.length === 0) {
    logger.warn('No IDs provided for deletion');
    return res.status(400).json({ message: 'No IDs provided' });
  }

  const result = await CalculatorLog.deleteMany({ id: { $in: ids } });
  logger.info(`Deleted ${result.deletedCount} log(s) with IDs: ${ids}`);

  return res.json({ message: `Deleted ${result.deletedCount} log(s)` });
}));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
