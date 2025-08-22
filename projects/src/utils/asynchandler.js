const asynchandler = (requesthandler) => { return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).
    catch((err) => {
        console.error("AsyncHandler caught and passing error to next middleware:", err); // Log errors caught by the asyncHandler
        next(err);
    })
}}

export{asynchandler}; // if system throws error it automatically send it to next if it dosent throw then the server will crash