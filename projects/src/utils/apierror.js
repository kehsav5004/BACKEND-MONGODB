class apierror extends Error{
    constructor(statuscode,message = "something went wrong", stack =""){
        super(message);
        this.statuscode = statuscode;
        this.data = null
        this.message = message  // refers to the error message or response message stored in  instance
        this.success = false  // indicate whether the request is success or failure
        

        if(stack){
            this.stack = stack  // storing wheere the error is occured 
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apierror};
