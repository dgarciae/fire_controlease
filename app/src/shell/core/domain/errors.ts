export class ControlledError extends Error {
  readonly name: string;
  readonly type: string;

  constructor(type: string, message: string) {
    super(message);
    this.name = "ControlledError";
    this.type = type;
  }
}

export class AuthError extends Error {
  readonly name: string;
  readonly type: string;

  constructor(type: string, message: string) {
    super(message);
    this.name = "AuthError";
    this.type = type;
  }
}

export class InvalidJSONResponseError extends Error {
  readonly name: string;

  constructor() {
    super("Invalid JSON response from server");
    this.name = "InvalidJSONResponseError";
  }
}

export class UnknownError extends Error {
  readonly name: string;

  constructor() {
    super("An unexpected error occurred");
    this.name = "UnknownError";
  }
}
