import type { ValidationError } from "class-validator";
import { values } from "lodash";

export const extractAllErrors = (e: ValidationError): string[] => {
  if (!!e.children && e.children.length) {
    const errors: string[] = [];
    e.children.forEach((child) => {
      errors.push(...extractAllErrors(child).map((childErr) => `${e.property} => ${childErr}`));
    });
    return errors;
  }
  return values(e.constraints);
};
