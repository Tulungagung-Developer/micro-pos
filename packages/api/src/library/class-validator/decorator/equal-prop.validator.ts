import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { deepmerge } from 'deepmerge-ts';

export function IsEqualWithProp(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEqualWithProp',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: deepmerge({ message: `${propertyName} must be equal to ${property}` }, validationOptions),
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
}
