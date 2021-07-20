/*
 * Adds commas to separate the digits of numbers (example: 100,000)
 */
export const formatCurrencyWithCommas = number => {
  return number.toLocaleString('en-US');
};

export const floatAmountToCents = floatAmount => {
  if (isNaN(floatAmount) || floatAmount === null) {
    return floatAmount;
  } else {
    return Math.round(floatAmount * 100);
  }
};
