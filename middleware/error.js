const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next)=> {
   let error = { ...err }
   console.log(err);
   error.message = err.message;
  
  
   console.log(err.stack.red);
//    mongoose bad ObjectID

    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // mongoose duplicate key
    if(err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }
    // mongoose validation error
    if(error.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({ 
        success: false, 
        error: error.message || 'Server error'
    });
};
module.exports = errorHandler;