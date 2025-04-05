export const dateTimeReviver = (key: unknown, value: unknown) => {
  const dateFormat = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }
  return value;
};
