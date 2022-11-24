export class InvalidInfoException extends Error {
    statusCode: number 

    constructor(message: string) {
        super(message)
        this.statusCode = 400
    }
}

export class NullException extends Error {
    statusCode: number 

    constructor(message: string) {
        super(message)
        this.statusCode = 400
    }
}
