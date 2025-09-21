export class ControlledError extends Error {
  readonly name: string = "ControlledError";
  readonly type: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;
  }
}

export class AuthError extends Error {
  readonly name: string = "AuthError";
  readonly type: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;
  }
}

export class InvalidJSONResponseError extends Error {
  readonly name: string = "InvalidJSONResponseError";

  constructor() {
    super("Invalid JSON response from server");
  }
}

export class UnknownError extends Error {
  readonly name: string = "UnknownError";

  constructor() {
    super("An unexpected error occurred");
  }
}
