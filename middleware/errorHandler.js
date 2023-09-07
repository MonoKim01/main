// /middleware/errorHandler.js
module.exports = function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
  
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
  
    // You can add more cases here to handle specific errors differently.
    switch (statusCode) {
      case 400:
        message = 'Bad Request';
        break;
      case 408:
        message = 'Request Timeout';
        break;
      case 414:
        message = 'URI Too Long';
        break;
      case 401:
        message = 'UnAuthorized Error';
        break;
      case 501:
        message = 'Not Implemented';
        break;
      case 503:
          message ='Service Temporarily Unavailable'
          break; 
      default:
          message ='Internal Server Error'
          break; 
        
     }
  
     res.status(statusCode).json({ statusCode: statusCode, message: message });
  };
  