export default function DestinyApiError(message) {
    throw new destinyApiError(message);
};

function destinyApiError(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name; // function name as error name
    this.message = message;
}