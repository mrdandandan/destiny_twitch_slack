export default function apiError(message) {
    throw new ApiError(message);
};

function ApiError(message) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name; // function name as error name
    this.message = message;
}