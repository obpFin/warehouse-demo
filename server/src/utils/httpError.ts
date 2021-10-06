export interface IApiError {
  error: string;
  description?: string;
  trace?: string[];
}

export function asApiError(error: Error): IApiError {
  if (isHttpError(error)) {
    return error.getObject();
  } else {
    return { error: `${error.name}: ${error.message}` };
  }
}

export class HttpError extends Error {
  private code: number;
  private description: string | undefined;
  constructor(code: number, message: string, description?: string) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }

  public getCode(): number {
    return this.code;
  }

  public getObject(): IApiError {
    return { error: this.message, description: this.description };
  }
}

export const isHttpError = (error: Error): error is HttpError => {
  return error.name === 'HttpError';
};
