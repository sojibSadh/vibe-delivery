# Vibe Delivery - Bangladesh Pricing Strategy

## Overview
Vibe Delivery uses a transparent, component-based pricing model designed for Bangladesh's delivery market. The pricing is calculated dynamically based on parcel characteristics and delivery distance.

## Pricing Formula

```
Total Price = Base Fee + Distance Fee + Weight Fee + Size Premium + Optional Add-ons
```

### Formula Components

#### 1. **Base Fee: ৳50**
- Fixed fee for every delivery
- Covers pickup and initial handling
- Non-negotiable minimum charge

#### 2. **Distance Fee: ৳5 per km**
- Calculated based on estimated distance between sender and receiver cities
- Minimum distance: 1 km
- Example: 15 km delivery = ৳75

#### 3. **Weight Fee: ৳25 per kg**
- Per kilogram charge based on parcel weight
- Minimum weight: 0.5 kg (charged as minimum)
- Encourages lighter shipments and efficient packing
- Example: 2 kg parcel = ৳50

#### 4. **Size Premium**
Charges vary based on parcel dimensions (Length + Width + Height):

| Size Category | Dimension Sum | Premium |
|---|---|---|
| **Small** | < 50 cm | ৳0 |
| **Medium** | 50-100 cm | ৳50 |
| **Large** | > 100 cm | ৳100 |

- Accounts for storage and handling complexity
- Encourages efficient packaging
- Example: 30×20×15 cm (65 cm total) = Medium = ৳50 premium

#### 5. **Optional Add-ons**
- **Insurance**: ৳50 (protects up to ৳5,000)
- Protects against loss or damage during transit
- Recommended for high-value items

## Pricing Examples

### Example 1: Small Document
- **Details**: 2-page document, 0.1 kg, 15 km, 30×20×5 cm
- Base Fee: ৳50
- Distance: 15 km × ৳5 = ৳75
- Weight: 0.5 kg (minimum) × ৳25 = ৳12.50
- Size: Small (55 cm) = ৳0
- **Total: ৳137.50**

### Example 2: Electronics Package
- **Details**: Smartphone, 0.3 kg, 25 km, 15×10×8 cm
- Base Fee: ৳50
- Distance: 25 km × ৳5 = ৳125
- Weight: 0.5 kg (minimum) × ৳25 = ৳12.50
- Size: Small (33 cm) = ৳0
- **Subtotal: ৳187.50**
- Insurance (optional): ৳50
- **Total with Insurance: ৳237.50**

### Example 3: Bulk Order
- **Details**: 10 books, 5 kg, 50 km, 60×40×30 cm
- Base Fee: ৳50
- Distance: 50 km × ৳5 = ৳250
- Weight: 5 kg × ৳25 = ৳125
- Size: Medium (130 cm) = ৳50
- **Subtotal: ৳475**
- Insurance (optional): ৳50
- **Total with Insurance: ৳525**

### Example 4: Large Furniture
- **Details**: Small chair, 8 kg, 30 km, 80×60×50 cm
- Base Fee: ৳50
- Distance: 30 km × ৳5 = ৳150
- Weight: 8 kg × ৳25 = ৳200
- Size: Large (190 cm) = ৳100
- **Subtotal: ৳500**
- Insurance (optional): ৳50
- **Total with Insurance: ৳550**

## Why This Strategy Works

### For Customers
✅ **Transparent**: No hidden fees, all charges clearly itemized  
✅ **Fair**: Charges reflect actual service costs  
✅ **Affordable**: Competitive rates compared to market  
✅ **Flexible**: Optional insurance for peace of mind  
✅ **Incentivizes**: Lighter and better-packed parcels get lower costs  

### For Business
✅ **Profitable**: Sustainable margin on each delivery  
✅ **Scalable**: Works for various parcel sizes and distances  
✅ **Predictable**: Consistent revenue model  
✅ **Competitive**: Attractive compared to larger services (like Pathao, Steadfast)  

## Market Comparison

| Service | Base | Per KM | Per KG | Notes |
|---|---|---|---|---|
| **Vibe** | ৳50 | ৳5 | ৳25 | Transparent, fair pricing |
| **Pathao** | ৳60-100 | ৳6-8 | ৳30+ | Premium, extensive network |
| **Steadfast** | ৳40-80 | ৳4-6 | ৳20+ | Budget option, competitive |
| **SA Parcel** | ৳50-90 | ৳5-7 | ৳25+ | Mid-range pricing |

Vibe's competitive advantage: **Transparent pricing with no surprise charges**

## Future Considerations

### Potential Enhancements
1. **Volume Discounts**: 10%+ discount for bulk bookings
2. **Scheduled Delivery**: Lower rates for non-urgent deliveries
3. **Premium Express**: 50% surcharge for same-day delivery
4. **Subscription Plans**: Monthly flat rate for frequent shippers
5. **Corporate Packages**: Custom rates for B2B partnerships

### Peak Hour Surcharges
- **Rush Hour (9 AM - 12 PM, 5 PM - 8 PM)**: +20%
- **Weekend Surcharge (Fri-Sat)**: +10%
- **Holiday Surcharge**: +25%

### Seasonal Campaigns
- **New Year Offer**: 15% off for first 100 bookings
- **Eid Campaign**: Free insurance for all deliveries
- **Festival Discounts**: Tiered discounts for bulk orders

## Implementation in Frontend

The pricing calculation is handled by:
- **File**: `src/utils/pricing.js`
- **Functions**:
  - `calculatePrice(parcelData)` - Returns total price in BDT
  - `getPriceBreakdown(parcelData)` - Returns itemized breakdown
  - `calculateSizeCategory(length, width, height)` - Determines size premium

## Notes

- All prices are in **Bangladeshi Taka (৳/BDT)**
- Final price may vary after actual measurement and weight verification
- Prices are subject to change with prior notification
- Additional charges may apply for remote delivery locations
- No refunds once parcel is picked up, but customers can cancel within 1 hour
