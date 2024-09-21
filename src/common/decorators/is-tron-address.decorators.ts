import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isBase58,
} from 'class-validator';

export function IsTronAddress(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return typeof value === 'string' && isTronAddressValid(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return `${property} must be a valid Tron address`;
        },
      },
    });
  };
}

function isTronAddressValid(address: string): boolean {
  // Tron addresses start with 'T' and are base58 encoded
  if (!address || typeof address !== 'string' || !address.startsWith('T')) {
    return false;
  }

  try {
    return isBase58(address);
  } catch (error) {
    return false;
  }
}
