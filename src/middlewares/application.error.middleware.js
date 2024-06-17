// Middleware to handle errors at application level

export default class ApplicationError extends Error {
    constructor(message, code){
        super(message);
        this.code = code;
    }
}