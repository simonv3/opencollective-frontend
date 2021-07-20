import React from 'react';

import { snapshot } from '../../test/snapshot-helpers';

import Currency from '../Currency';

describe('Currency', () => {
  it('renders default options', () => {
    snapshot(<Currency value={4200} currency="USD" />);
    snapshot(<Currency value={1900000} currency="USD" />, { IntlProvider: { locale: 'fr' } });
  });

  it('currency format with commas', () => {
    snapshot(<Currency formatWithCommas value={4200} currency="USD" />);
    snapshot(<Currency formatWithCommas value={1900000} currency="USD" />, { IntlProvider: { locale: 'fr' } });
  });
});
