import { ValidationError } from 'joi';
import { DEBUG_MODE } from '../config';
import { CustomerrorHandler } from '../Services';

const errorHandler = (err, req, res, next) => {
    let Statuscode = 500;
    let Data = {
        message: "Internal server error",
        ...(DEBUG_MODE === 'true' && { originalerror: err.message })
    }

    if (err instanceof ValidationError) {
        Statuscode = 409;
        Data = {
            message: err.message
        }
    }

    if (err instanceof CustomerrorHandler) {
        Statuscode = err.status;
        Data = {
            message: err.message
        }
    }

    return res.status(Statuscode).json(Data);
}

export default errorHandler;