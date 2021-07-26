/*
 * Adds commas to separate the digits of numbers (example: 100,000)
 */
export const formatCurrencyWithCommas = number => {
  let locale = 'en-US';
  if (typeof window !== 'undefined') {
    locale = window.navigator.language;
  }
  return number.toLocaleString(locale);
};

export const floatAmountToCents = floatAmount => {
  if (isNaN(floatAmount) || floatAmount === null) {
    return floatAmount;
  } else {
    return Math.round(floatAmount * 100);
  }
};
