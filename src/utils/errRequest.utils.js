class BadRequest extends Error{
  constructor(message){
    super(message)
    this.status = 400
  }
}

class ForbiddenRequest extends Error{
  constructor(message){
    super(message)
    this.status = 403
  }
}

class ConflictRequest extends Error{
  constructor(message){
    super(message)
    this.status = 409
  }
}
class UnauhthorizeRequest extends Error{
  constructor(message = 'Unauthorize'){
    super(message)
    this.status = 401
  }
}

class IntervalServerErr extends Error{
  constructor(message){
    super(message)
    this.status = 500
  }
}

module.exports = {
  BadRequest,
  ConflictRequest,
  IntervalServerErr,
  UnauhthorizeRequest,
  ForbiddenRequest
}

