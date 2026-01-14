/**
 * Bangladesh Parcel Delivery Pricing Strategy
 * 
 * Pricing Formula:
 * Base Fee (50 BDT) + Distance Fee (5 BDT per km) + Weight Fee (25 BDT per kg) + Size Premium
 * 
 * Size Categories:
 * - Small (L+W+H < 50cm): No premium
 * - Medium (L+W+H 50-100cm): 50 BDT
 * - Large (L+W+H > 100cm): 100 BDT
 */

const PRICING_CONFIG = {
  BASE_FEE: 50, // BDT
  PER_KM_RATE: 5, // BDT per km
  PER_KG_RATE: 25, // BDT per kg
  SIZE_PREMIUMS: {
    SMALL: 0, // Girth + Length < 50cm
    MEDIUM: 50, // Girth + Length 50-100cm
    LARGE: 100, // Girth + Length > 100cm
  },
  MIN_DISTANCE: 1, // km
  MIN_WEIGHT: 0.5, // kg
};

/**
 * Calculate size category and premium
 * @param {number} length - in cm
 * @param {number} width - in cm
 * @param {number} height - in cm
 * @returns {Object} { category, premium }
 */
export const calculateSizeCategory = (length, width, height) => {
  const totalDimension = length + width + height;

  if (totalDimension < 50) {
    return { category: 'small', premium: PRICING_CONFIG.SIZE_PREMIUMS.SMALL };
  } else if (totalDimension < 100) {
    return { category: 'medium', premium: PRICING_CONFIG.SIZE_PREMIUMS.MEDIUM };
  } else {
    return { category: 'large', premium: PRICING_CONFIG.SIZE_PREMIUMS.LARGE };
  }
};

/**
 * Calculate total delivery price
 * @param {Object} parcelData - { weight, distance, length, width, height }
 * @returns {number} Total price in BDT
 */
export const calculatePrice = (parcelData) => {
  const { weight = 0, distance = 0, length = 0, width = 0, height = 0 } = parcelData;

  // Validate inputs
  if (weight <= 0 || distance <= 0) {
    return 0;
  }

  // Ensure minimum distance and weight
  const actualDistance = Math.max(distance, PRICING_CONFIG.MIN_DISTANCE);
  const actualWeight = Math.max(weight, PRICING_CONFIG.MIN_WEIGHT);

  // Calculate size premium
  const { premium: sizePremium } = calculateSizeCategory(length, width, height);

  // Calculate total price
  const baseFee = PRICING_CONFIG.BASE_FEE;
  const distanceFee = actualDistance * PRICING_CONFIG.PER_KM_RATE;
  const weightFee = actualWeight * PRICING_CONFIG.PER_KG_RATE;

  const totalPrice = baseFee + distanceFee + weightFee + sizePremium;

  return Math.round(totalPrice);
};

/**
 * Get pricing breakdown
 * @param {Object} parcelData - { weight, distance, length, width, height }
 * @returns {Object} Breakdown of all fees
 */
export const getPriceBreakdown = (parcelData) => {
  const { weight = 0, distance = 0, length = 0, width = 0, height = 0 } = parcelData;

  const actualDistance = Math.max(distance, PRICING_CONFIG.MIN_DISTANCE);
  const actualWeight = Math.max(weight, PRICING_CONFIG.MIN_WEIGHT);

  const { category: sizeCategory, premium: sizePremium } = calculateSizeCategory(
    length,
    width,
    height
  );

  const baseFee = PRICING_CONFIG.BASE_FEE;
  const distanceFee = actualDistance * PRICING_CONFIG.PER_KM_RATE;
  const weightFee = actualWeight * PRICING_CONFIG.PER_KG_RATE;

  return {
    baseFee,
    distanceFee,
    weightFee,
    sizePremium,
    sizeCategory,
    total: calculatePrice(parcelData),
  };
};

export default PRICING_CONFIG;
