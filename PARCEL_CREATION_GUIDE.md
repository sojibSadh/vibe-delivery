# Parcel Creation Feature - Quick Guide

## Overview
The new Parcel Creation feature allows customers to easily create and book parcel deliveries with instant price quotes.

## Key Features

### 🔐 Authentication Required
- Users must be logged in to create a parcel
- Non-logged-in users are automatically redirected to login page
- Uses `isUserLoggedIn()` helper to verify authentication

### 📝 Comprehensive Parcel Form
Includes sections for:
1. **Sender Information**
   - Name, Phone, Address, City
   
2. **Receiver Information**
   - Name, Phone, Address, City
   - 7 major cities supported: Dhaka, Chittagong, Sylhet, Khulna, Rajshahi, Barisal, Rangpur

3. **Parcel Details**
   - Type: Document, Electronics, Clothing, Food, Fragile, Other
   - Description
   - Weight (kg) - Required
   - Dimensions (cm) - Length, Width, Height (optional)

4. **Delivery Information**
   - Estimated distance (km) - Required
   - Optional insurance (৳50) - protects up to ৳5,000

### 💰 Real-Time Price Calculation
After form submission, users see:
- **Itemized Price Breakdown**:
  - Base Fee (৳50)
  - Distance Charge (৳5/km)
  - Weight Charge (৳25/kg)
  - Size Premium (৳0-100)
  - Insurance (if selected)
- **Total Estimated Price** in BDT
- Clear disclaimer about final price verification

### ✏️ Edit & Confirm Flow
- Users can edit parcel details before confirmation
- One-click booking confirmation
- Success notification sent to user email

## File Structure

```
frontend/
├── src/
│   ├── pages/
│   │   └── CreateParcelPage.jsx         (Main component)
│   ├── utils/
│   │   ├── pricing.js                   (Pricing logic)
│   │   └── authHelper.js                (Auth utilities)
│   ├── App.jsx                          (Updated with new route)
│   └── components/
│       └── Navbar.jsx                   (Added navigation link)
└── PRICING_STRATEGY.md                  (Detailed pricing docs)
```

## Usage

### For Customers
1. Click "Send a Parcel" in navbar or homepage
2. Login if not already authenticated
3. Fill in sender & receiver details
4. Enter parcel specifications
5. Review calculated price
6. Click "Confirm & Book"
7. Receive booking confirmation

### For Developers

#### Import Pricing Functions
```javascript
import { calculatePrice, getPriceBreakdown } from '../utils/pricing';

// Calculate total price
const totalPrice = calculatePrice({
  weight: 2.5,
  distance: 15,
  length: 30,
  width: 20,
  height: 10
});
// Returns: 225

// Get itemized breakdown
const breakdown = getPriceBreakdown({
  weight: 2.5,
  distance: 15,
  length: 30,
  width: 20,
  height: 10
});
// Returns: {
//   baseFee: 50,
//   distanceFee: 75,
//   weightFee: 62.5,
//   sizePremium: 0,
//   sizeCategory: 'small',
//   total: 187.5
// }
```

#### Check Authentication
```javascript
import { isUserLoggedIn, getLoggedInUser } from '../utils/authHelper';

if (isUserLoggedIn()) {
  const user = getLoggedInUser();
  console.log(user.email);
}
```

## Routes

- `/create-parcel` - Main parcel creation page
- Redirects to `/login` if not authenticated

## Navigation Updates

### Navbar Links
- Added "Send Parcel" link in desktop menu
- Added "Send Parcel" link in mobile dropdown

### Homepage
- Updated "Send a Parcel" button to point to `/create-parcel`

## Bangladesh Pricing Strategy

The system implements a transparent, fair pricing model:

| Component | Rate | Notes |
|---|---|---|
| Base Fee | ৳50 | Fixed per delivery |
| Distance | ৳5/km | Minimum 1 km |
| Weight | ৳25/kg | Minimum 0.5 kg |
| Small Size | ৳0 | < 50 cm |
| Medium Size | ৳50 | 50-100 cm |
| Large Size | ৳100 | > 100 cm |
| Insurance | ৳50 | Optional (covers ৳5,000) |

**Example**: 2kg parcel, 20km, 40×30×20cm, with insurance
- Base: ৳50 + Distance: ৳100 + Weight: ৳50 + Size: ৳0 + Insurance: ৳50 = **৳250**

See [PRICING_STRATEGY.md](./PRICING_STRATEGY.md) for full details.

## Current State

✅ **Completed**:
- Parcel creation form with all fields
- Authentication check with redirect
- Real-time price calculation
- Price breakdown display
- Edit/Confirm flow
- Navbar integration
- Route setup

📋 **To Be Implemented** (Backend):
- API endpoint to save parcel data
- Email confirmation with booking reference
- Parcel tracking system
- Payment integration
- Driver assignment

## Testing

### Test Scenario 1: Non-Logged User
1. Navigate to `/create-parcel` without logging in
2. Should redirect to `/login`

### Test Scenario 2: Calculate Price
1. Login and go to `/create-parcel`
2. Enter: Weight 2kg, Distance 15km, Size 30×20×10cm
3. Submit and verify price: ৳50 + ৳75 + ৳50 + ৳0 = ৳175

### Test Scenario 3: Large Parcel Premium
1. Enter: Weight 5kg, Distance 25km, Size 70×60×50cm
2. Submit and verify: ৳50 + ৳125 + ৳125 + ৳50 = ৳350 (Medium size premium)

## Troubleshooting

**Issue**: "User not logged in" error
- **Solution**: Check browser's localStorage for 'user' and 'token' keys

**Issue**: Price calculation seems wrong
- **Solution**: Remember minimum weight is 0.5kg and minimum distance is 1km

**Issue**: Form not submitting
- **Solution**: Ensure all required fields (*) are filled correctly

## Future Enhancements

Potential improvements:
- Real distance calculation using maps API
- Weight unit conversion (grams, ounces, etc.)
- Parcel type-specific warnings (fragile, perishable)
- Saved addresses for quick fill
- Discount code support
- Scheduled delivery options
- Multiple parcel batch booking
