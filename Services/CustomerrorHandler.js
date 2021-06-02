class CustomerrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }

    static serverError(message = 'Internal server error') {
        return new CustomerrorHandler(500, message);
    }
}

export default CustomerrorHandler;