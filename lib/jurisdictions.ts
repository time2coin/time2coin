export interface Jurisdiction {
  id: string;
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
  localeCode: string;
  localMealCostFiat: number;
}

export const SUPPORTED_JURISDICTIONS: Record<string, Jurisdiction> = {
  'MY-MYR': {
    id: 'MY-MYR',
    countryCode: 'MY',
    countryName: 'Malaysia',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    localeCode: 'ms-MY',
    localMealCostFiat: 6.00,
  },
  'UK-GBP': {
    id: 'UK-GBP',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    currencyCode: 'GBP',
    currencySymbol: '£',
    localeCode: 'en-GB',
    localMealCostFiat: 5.00,
  },
  'SG-SGD': {
    id: 'SG-SGD',
    countryCode: 'SG',
    countryName: 'Singapore',
    currencyCode: 'SGD',
    currencySymbol: 'S\$',
    localeCode: 'en-SG',
    localMealCostFiat: 5.00,
  },
  'ID-IDR': {
    id: 'ID-IDR',
    countryCode: 'ID',
    countryName: 'Indonesia',
    currencyCode: 'IDR',
    currencySymbol: 'Rp',
    localeCode: 'id-ID',
    localMealCostFiat: 20000,
  },
  'IN-INR': {
    id: 'IN-INR',
    countryCode: 'IN',
    countryName: 'India',
    currencyCode: 'INR',
    currencySymbol: '₹',
    localeCode: 'en-IN',
    localMealCostFiat: 80.00,
  },
  'TH-THB': {
    id: 'TH-THB',
    countryCode: 'TH',
    countryName: 'Thailand',
    currencyCode: 'THB',
    currencySymbol: '฿',
    localeCode: 'th-TH',
    localMealCostFiat: 60.00,
  },
  'US-USD': {
    id: 'US-USD',
    countryCode: 'US',
    countryName: 'United States',
    currencyCode: 'USD',
    currencySymbol: '\$',
    localeCode: 'en-US',
    localMealCostFiat: 6.00,
  },
  'EU-EUR': {
    id: 'EU-EUR',
    countryCode: 'EU',
    countryName: 'Eurozone',
    currencyCode: 'EUR',
    currencySymbol: '€',
    localeCode: 'de-DE',
    localMealCostFiat: 6.00,
  },
  'AU-AUD': {
    id: 'AU-AUD',
    countryCode: 'AU',
    countryName: 'Australia',
    currencyCode: 'AUD',
    currencySymbol: 'A\$',
    localeCode: 'en-AU',
    localMealCostFiat: 8.00,
  },
};

/**
 * Universal Currency Formatter
 * Formats any number into the local currency symbol (e.g. £12.00, RM 12.00, S\$ 12.00)
 */
export function formatLocalCurrency(
  amount: number,
  jurisdictionId: string = 'MY-MYR'
): string {
  const config = SUPPORTED_JURISDICTIONS[jurisdictionId] || SUPPORTED_JURISDICTIONS['MY-MYR'];
  
  try {
    return new Intl.NumberFormat(config.localeCode, {
      style: 'currency',
      currency: config.currencyCode,
      minimumFractionDigits: config.currencyCode === 'IDR' ? 0 : 2,
    }).format(amount);
  } catch {
    return `${config.currencySymbol} ${amount.toFixed(2)}`;
  }
}
