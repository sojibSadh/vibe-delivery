# Vibe Parcel Creation - Developer Quick Reference

## 📍 Route
```
/create-parcel
```

## 🔓 Protected Route
- Redirects to `/login` if user is not authenticated
- Uses `isUserLoggedIn()` from `authHelper.js`

## 📦 Form Fields

### Sender Section
- `senderName` (required, string)
- `senderPhone` (required, string)
- `senderAddress` (required, string)
- `senderCity` (required, select)

### Receiver Section
- `receiverName` (required, string)
- `receiverPhone` (required, string)
- `receiverAddress` (required, string)
- `receiverCity` (required, select)

### Parcel Section
- `parcelType` (string): 'document', 'electronics', 'clothing', 'food', 'fragile', 'other'
- `parcelDescription` (string)
- `weight` (required, number, kg)
- `length` (number, cm)
- `width` (number, cm)
- `height` (number, cm)

### Delivery Section
- `distance` (required, number, km)
- `insurance` (boolean)

## 💰 Pricing Functions

### `calculatePrice(parcelData)`
```javascript
import { calculatePrice } from '../utils/pricing';

const price = calculatePrice({
  weight: 2,
  distance: 15,
  length: 30,
  width: 20,
  height: 10
});
// Returns: 175 (BDT as number)
```

### `getPriceBreakdown(parcelData)`
```javascript
import { getPriceBreakdown } from '../utils/pricing';

const breakdown = getPriceBreakdown({
  weight: 2,
  distance: 15,
  length: 30,
  width: 20,
  height: 10
});
// Returns: {
//   baseFee: 50,
//   distanceFee: 75,
//   weightFee: 50,
//   sizePremium: 0,
//   sizeCategory: 'small',
//   total: 175
// }
```

### `calculateSizeCategory(length, width, height)`
```javascript
import { calculateSizeCategory } from '../utils/pricing';

const category = calculateSizeCategory(30, 20, 10);
// Returns: { category: 'small', premium: 0 }

// Categories:
// small: < 50cm (premium: ৳0)
// medium: 50-100cm (premium: ৳50)
// large: > 100cm (premium: ৳100)
```

## 🔐 Auth Functions

### `isUserLoggedIn()`
```javascript
import { isUserLoggedIn } from '../utils/authHelper';

if (isUserLoggedIn()) {
  // User has token and user data
}
```

### `getLoggedInUser()`
```javascript
import { getLoggedInUser } from '../utils/authHelper';

const user = getLoggedInUser();
console.log(user.email); // Get user email
console.log(user.id);    // Get user ID
```

### `getAuthToken()`
```javascript
import { getAuthToken } from '../utils/authHelper';

const token = getAuthToken();
// Use for API headers: Authorization: Bearer {token}
```

## 📋 Cities Supported
- Dhaka
- Chittagong
- Sylhet
- Khulna
- Rajshahi
- Barisal
- Rangpur

## 💳 Pricing Rates (Bangladesh)

| Component | Rate | Notes |
|-----------|------|-------|
| Base Fee | ৳50 | Per delivery |
| Distance | ৳5/km | Minimum 1 km |
| Weight | ৳25/kg | Minimum 0.5 kg |
| Small | ৳0 | < 50 cm |
| Medium | ৳50 | 50-100 cm |
| Large | ৳100 | > 100 cm |
| Insurance | ৳50 | Optional |

## 🧪 Quick Test

```javascript
// Test the pricing system
import { calculatePrice, getPriceBreakdown } from './utils/pricing';

// Example: 2kg parcel, 20km distance, medium size
const testData = {
  weight: 2,
  distance: 20,
  length: 40,
  width: 35,
  height: 20
};

const price = calculatePrice(testData);
console.log(`Total: ৳${price}`); // Should be 250

const breakdown = getPriceBreakdown(testData);
console.log(breakdown);
// {
//   baseFee: 50,
//   distanceFee: 100,
//   weightFee: 50,
//   sizePremium: 50,
//   sizeCategory: 'medium',
//   total: 250
// }
```

## 🔗 Component Imports

```javascript
// Page Component
import CreateParcelPage from './pages/CreateParcelPage';

// Utilities
import { calculatePrice, getPriceBreakdown, calculateSizeCategory } from './utils/pricing';
import { isUserLoggedIn, getLoggedInUser, getAuthToken } from './utils/authHelper';
```

## 📡 API Integration Points

In `CreateParcelPage.jsx`, look for `TODO` comments:

```javascript
// Line ~85 - handleSubmit function
// TODO: Connect to backend API

// After price confirmation - handleConfirmBooking function
// TODO: Send booking to backend
// POST /api/parcels with formData
```

**Expected POST body:**
```json
{
  "senderName": "string",
  "senderPhone": "string",
  "senderAddress": "string",
  "senderCity": "string",
  "receiverName": "string",
  "receiverPhone": "string",
  "receiverAddress": "string",
  "receiverCity": "string",
  "parcelDescription": "string",
  "parcelType": "string",
  "weight": "number",
  "length": "number",
  "width": "number",
  "height": "number",
  "distance": "number",
  "insurance": "boolean",
  "estimatedPrice": "number",
  "userId": "string"
}
```

## 🎨 UI Components Used

- DaisyUI Cards: `card`, `card-body`, `card-title`, `card-actions`
- Forms: `form-control`, `label`, `input`, `select`, `textarea`
- Buttons: `btn`, `btn-primary`, `btn-outline`, `btn-lg`
- Alerts: `alert`, `alert-info`, `alert-warning`
- Grid: `grid`, `grid-cols-1`, `md:grid-cols-2`
- Spacing: `gap-4`, `mb-6`, `py-8`

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "User not logged in" | Check `localStorage` for 'user' and 'token' |
| Price seems wrong | Remember: minimum weight 0.5kg, minimum distance 1km |
| Form not submitting | All required fields (*) must be filled |
| Dimensions don't matter | Dimensions are optional, only weight & distance are required |

## 📊 Example Form Submission Data

```javascript
{
  senderName: "Ahmed Hassan",
  senderPhone: "+880 1700 123456",
  senderAddress: "123 Main Street",
  senderCity: "dhaka",
  receiverName: "Fatima Khan",
  receiverPhone: "+880 1800 654321",
  receiverAddress: "456 Oak Road",
  receiverCity: "chittagong",
  parcelDescription: "Electronics - Smartphone",
  parcelType: "electronics",
  weight: 0.5,
  length: 15,
  width: 10,
  height: 8,
  distance: 250,
  insurance: true
}
```

**Calculation:**
```
Base: ৳50
Distance: 250 km × ৳5 = ৳1,250
Weight: 0.5 kg × ৳25 = ৳12.50
Size: (15+10+8=33cm) = Small = ৳0
Insurance: ৳50
─────────────────────
Total: ৳1,362.50 → ৳1,363
```

## 🔄 State Management

The component uses React `useState` for:
- `isSubmitted` - Toggle between form and price quote view
- `priceData` - Store calculated price and breakdown
- `formData` - Store all form field values

No external state management (Redux, Zustand) currently used.

## 📱 Responsive Design

- Desktop (lg+): 4-column grid for dimensions
- Tablet (md): 2-column grid for dimensions
- Mobile: 1-column (single column)

## ✅ Checklist for Integration

- [ ] Backend API endpoint created (`POST /api/parcels`)
- [ ] Authentication middleware added to API
- [ ] Email notification service configured
- [ ] Payment gateway integrated
- [ ] Database schema for parcels created
- [ ] Error handling added to handleConfirmBooking
- [ ] Loading states added during submission
- [ ] Success/error modals or toasts added
- [ ] Parcel tracking page created
- [ ] Tests written for backend endpoints

## 📚 Related Files

- [PRICING_STRATEGY.md](./PRICING_STRATEGY.md) - Detailed pricing strategy
- [PARCEL_CREATION_GUIDE.md](./PARCEL_CREATION_GUIDE.md) - Full user guide
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Complete summary
- `frontend/src/pages/CreateParcelPage.jsx` - Main component
- `frontend/src/utils/pricing.js` - Pricing calculations
- `frontend/src/utils/authHelper.js` - Auth utilities

---

**Last Updated:** January 2026  
**Status:** Ready for Backend Integration
