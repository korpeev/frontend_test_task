export const isNumericValue = (value: string) => {
  const pattern = /\d$/;
  return pattern.test(value);
};
