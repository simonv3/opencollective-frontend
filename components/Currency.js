import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency, getCurrencySymbol } from '../lib/currency-utils';
import { formatCurrencyWithCommas } from '../lib/math';

import { Span } from './Text';

/**
 * Shows a money amount with the currency.
 *
 * ⚠️ Abbreviated mode is only for English at the moment. Abbreviated amount will not be internationalized.
 */
const Currency = ({ formatWithCommas, currency, precision, value, ...styles }) => {
  if (precision === 'auto') {
    precision = value % 100 === 0 ? 0 : 2;
  } else if (precision < 2 && value < 100) {
    // Force precision if number is < $1 to never display $0 for small amounts
    precision = 2;
  }

  if (formatWithCommas) {
    return (
      <Span {...styles} whiteSpace="nowrap">
        {getCurrencySymbol(currency)}
        {formatCurrencyWithCommas(value / 100)}
      </Span>
    );
  } else {
    return (
      <Span {...styles} whiteSpace="nowrap">
        {formatCurrency(value, currency, { precision })}
      </Span>
    );
  }
};

Currency.propTypes = {
  /** The amount to display, in cents */
  value: PropTypes.number.isRequired,
  /** The currency (eg. `USD`, `EUR`...etc) */
  currency: PropTypes.string.isRequired,
  /** Format the currency value to display 100,000 instead of 100000 */
  formatWithCommas: PropTypes.bool,
  /** How many numbers should we display after the comma. When `auto` is given, decimals are only displayed if necessary. */
  precision: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  /** An optional set of props passed to the `Span` */
  style: PropTypes.object,
};

Currency.defaultProps = {
  formatWithCommas: false,
  precision: 0,
};

export default Currency;
