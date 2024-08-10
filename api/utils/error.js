export const errorhandler = (statuscode,message) =>{
    const error = new Error();
    error.statuscode = message;
    error.message = message;
    return error;
    
};