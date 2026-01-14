/**
 * Pricing Utility Tests
 * Tests for src/utils/pricing.js
 */

import { calculatePrice, getPriceBreakdown, calculateSizeCategory } from '../pricing';

describe('Pricing Utils', () => {
  describe('calculateSizeCategory', () => {
    test('Should categorize small size', () => {
      const result = calculateSizeCategory(20, 15, 10);
      expect(result.category).toBe('small');
      expect(result.premium).toBe(0);
    });

    test('Should categorize medium size', () => {
      const result = calculateSizeCategory(40, 35, 20);
      expect(result.category).toBe('medium');
      expect(result.premium).toBe(50);
    });

    test('Should categorize large size', () => {
      const result = calculateSizeCategory(50, 40, 30);
      expect(result.category).toBe('large');
      expect(result.premium).toBe(100);
    });

    test('Should handle boundary case - exactly 50cm', () => {
      const result = calculateSizeCategory(25, 15, 10);
      expect(result.category).toBe('medium');
      expect(result.premium).toBe(50);
    });
  });

  describe('calculatePrice', () => {
    test('Example 1: Small document', () => {
      const price = calculatePrice({
        weight: 0.1,
        distance: 15,
        length: 30,
        width: 20,
        height: 5
      });
      // Base: 50 + Distance: 75 + Weight: 12.5 (min 0.5kg) + Size: 0 = 137.5 → 138 (rounded)
      expect(price).toBe(138);
    });

    test('Example 2: Electronics package', () => {
      const price = calculatePrice({
        weight: 0.3,
        distance: 25,
        length: 15,
        width: 10,
        height: 8
      });
      // Base: 50 + Distance: 125 + Weight: 12.5 (min 0.5kg) + Size: 0 = 187.5 → 188
      expect(price).toBe(188);
    });

    test('Example 3: Bulk order', () => {
      const price = calculatePrice({
        weight: 5,
        distance: 50,
        length: 60,
        width: 40,
        height: 30
      });
      // Base: 50 + Distance: 250 + Weight: 125 + Size: 50 = 475
      expect(price).toBe(475);
    });

    test('Example 4: Large furniture', () => {
      const price = calculatePrice({
        weight: 8,
        distance: 30,
        length: 80,
        width: 60,
        height: 50
      });
      // Base: 50 + Distance: 150 + Weight: 200 + Size: 100 = 500
      expect(price).toBe(500);
    });

    test('Should apply minimum weight (0.5kg)', () => {
      const price = calculatePrice({
        weight: 0.1,
        distance: 10,
      });
      // Base: 50 + Distance: 50 + Weight: 12.5 (min 0.5kg) + Size: 0 = 112.5 → 113
      expect(price).toBe(113);
    });

    test('Should apply minimum distance (1km)', () => {
      const price = calculatePrice({
        weight: 1,
        distance: 0.5, // Less than minimum
      });
      // Base: 50 + Distance: 5 (min 1km) + Weight: 25 + Size: 0 = 80
      expect(price).toBe(80);
    });

    test('Should return 0 for invalid inputs', () => {
      const price1 = calculatePrice({
        weight: 0,
        distance: 10
      });
      expect(price1).toBe(0);

      const price2 = calculatePrice({
        weight: 1,
        distance: 0
      });
      expect(price2).toBe(0);
    });
  });

  describe('getPriceBreakdown', () => {
    test('Should return detailed breakdown', () => {
      const breakdown = getPriceBreakdown({
        weight: 2,
        distance: 20,
        length: 40,
        width: 30,
        height: 25
      });

      expect(breakdown).toHaveProperty('baseFee', 50);
      expect(breakdown).toHaveProperty('distanceFee', 100);
      expect(breakdown).toHaveProperty('weightFee', 50);
      expect(breakdown).toHaveProperty('sizePremium', 50);
      expect(breakdown).toHaveProperty('sizeCategory', 'medium');
      expect(breakdown).toHaveProperty('total', 250);
    });

    test('Should handle small parcel correctly', () => {
      const breakdown = getPriceBreakdown({
        weight: 1,
        distance: 10,
        length: 20,
        width: 15,
        height: 10
      });

      expect(breakdown.baseFee).toBe(50);
      expect(breakdown.distanceFee).toBe(50);
      expect(breakdown.weightFee).toBe(25);
      expect(breakdown.sizePremium).toBe(0);
      expect(breakdown.sizeCategory).toBe('small');
      expect(breakdown.total).toBe(125);
    });

    test('Should handle large parcel correctly', () => {
      const breakdown = getPriceBreakdown({
        weight: 5,
        distance: 30,
        length: 70,
        width: 60,
        height: 50
      });

      expect(breakdown.baseFee).toBe(50);
      expect(breakdown.distanceFee).toBe(150);
      expect(breakdown.weightFee).toBe(125);
      expect(breakdown.sizePremium).toBe(100);
      expect(breakdown.sizeCategory).toBe('large');
      expect(breakdown.total).toBe(425);
    });
  });

  describe('Edge Cases', () => {
    test('Should handle zero dimensions gracefully', () => {
      const price = calculatePrice({
        weight: 1,
        distance: 10,
        length: 0,
        width: 0,
        height: 0
      });
      expect(price).toBe(125); // Small premium
    });

    test('Should handle very large parcels', () => {
      const price = calculatePrice({
        weight: 50,
        distance: 100,
        length: 200,
        width: 150,
        height: 100
      });
      // Base: 50 + Distance: 500 + Weight: 1250 + Size: 100 = 1900
      expect(price).toBe(1900);
    });

    test('Should handle decimal weights correctly', () => {
      const price = calculatePrice({
        weight: 2.75,
        distance: 15,
      });
      // Base: 50 + Distance: 75 + Weight: 68.75 = 193.75 → 194
      expect(price).toBe(194);
    });

    test('Should handle decimal distances correctly', () => {
      const price = calculatePrice({
        weight: 1,
        distance: 15.5,
      });
      // Base: 50 + Distance: 77.5 + Weight: 25 = 152.5 → 153 (rounded)
      expect(price).toBe(153);
    });
  });
});

// Example usage in component
export const exampleUsage = () => {
  // User fills form with:
  // Weight: 2.5 kg, Distance: 20 km, Dimensions: 35×25×20 cm

  const parcelData = {
    weight: 2.5,
    distance: 20,
    length: 35,
    width: 25,
    height: 20
  };

  // Get total price
  const totalPrice = calculatePrice(parcelData);
  console.log(`Total Price: ৳${totalPrice}`);

  // Get detailed breakdown
  const breakdown = getPriceBreakdown(parcelData);
  console.log(`Price Breakdown:
    Base Fee: ৳${breakdown.baseFee}
    Distance (${parcelData.distance}km × ৳5): ৳${breakdown.distanceFee}
    Weight (${parcelData.weight}kg × ৳25): ৳${breakdown.weightFee}
    Size Premium (${breakdown.sizeCategory}): ৳${breakdown.sizePremium}
    ---
    Total: ৳${breakdown.total}`);
};
