interface ENVError {
  property: string;
  value: string;
  constraints: { [key: string]: string }[];
}

export class ENVException extends Error {
  private reasons = [];

  constructor(
    errors: any,
    message = 'An instance of EnvironmentVariables has failed the validation',
  ) {
    super(message);
    this.stack = null;
    this.reasons = this.mapErrorsToReasons(errors);
  }

  mapErrorsToReasons(errors: ENVError[]) {
    return errors.map((error) => {
      return {
        property: error.property,
        value: error.value,
        constraints: error.constraints,
      };
    });
  }
}
