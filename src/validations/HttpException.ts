class HttpException extends Error {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        super();
        this.name = name;
        this.message = message;
    }
}

export default HttpException;