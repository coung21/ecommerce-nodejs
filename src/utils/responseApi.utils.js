function successResponse(res, data, statusCode = 200, message = 'success') {
  return res.status(statusCode).json({ message, ...data });
}

function errorResponse(res, message = 'error', statusCode = 500){
  return res.status(statusCode).json({status: statusCode ,message})
}

module.exports = {
  successResponse,
  errorResponse
}