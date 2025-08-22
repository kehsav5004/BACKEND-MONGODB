class apiresponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;  // http status code(200, 404, 500)
        this.data = data;   // actual data we wnat send to frontend or user
        this.message = message; // a human readable message
        this.success = statusCode < 400
    }
}

export{apiresponse};