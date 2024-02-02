export const transformNumberToString = (value: number) => {
  const multipliedValue = Math.round(value * 100);
  return multipliedValue.toString();
};
