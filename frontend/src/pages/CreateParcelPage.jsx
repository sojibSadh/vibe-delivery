import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { calculatePrice, getPriceBreakdown } from '../utils/pricing';
import { isUserLoggedIn, getLoggedInUser } from '../utils/authHelper';

export default function CreateParcelPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [priceData, setPriceData] = useState(null);

  const [formData, setFormData] = useState({
    // Sender info
    senderName: '',
    senderPhone: '',
    senderAddress: '',
    senderCity: '',

    // Receiver info
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverCity: '',

    // Parcel info
    parcelDescription: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    distance: '',

    // Additional info
    parcelType: 'document',
    insurance: false,
  });

  // Check if user is logged in on component mount
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.senderName ||
      !formData.receiverName ||
      !formData.weight ||
      !formData.distance
    ) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculate price
    const parcelPrice = calculatePrice({
      weight: parseFloat(formData.weight),
      distance: parseFloat(formData.distance),
      length: parseFloat(formData.length) || 0,
      width: parseFloat(formData.width) || 0,
      height: parseFloat(formData.height) || 0,
    });

    const breakdown = getPriceBreakdown({
      weight: parseFloat(formData.weight),
      distance: parseFloat(formData.distance),
      length: parseFloat(formData.length) || 0,
      width: parseFloat(formData.width) || 0,
      height: parseFloat(formData.height) || 0,
    });

    setPriceData({
      price: parcelPrice,
      breakdown: breakdown,
      parcelData: formData,
    });

    setIsSubmitted(true);
  };

  const handleConfirmBooking = () => {
    const user = getLoggedInUser();
    console.log('Booking confirmed:', {
      user,
      parcelData: formData,
      price: priceData.price,
    });
    // TODO: Send to backend API
    alert(`Booking confirmed! Reference ID will be sent to ${user?.email}`);
    // Reset form
    setIsSubmitted(false);
    setFormData({
      senderName: '',
      senderPhone: '',
      senderAddress: '',
      senderCity: '',
      receiverName: '',
      receiverPhone: '',
      receiverAddress: '',
      receiverCity: '',
      parcelDescription: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      distance: '',
      parcelType: 'document',
      insurance: false,
    });
    setPriceData(null);
  };

  const handleEditParcel = () => {
    setIsSubmitted(false);
    setPriceData(null);
  };

  // Show price breakdown modal
  if (isSubmitted && priceData) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">
                  📦 Tentative Price Quote
                </h2>

                {/* Parcel Summary */}
                <div className="alert alert-info mb-6">
                  <div>
                    <p>
                      <strong>From:</strong> {priceData.parcelData.senderCity} →{' '}
                      <strong>To:</strong> {priceData.parcelData.receiverCity}
                    </p>
                    <p>
                      <strong>Distance:</strong> {priceData.parcelData.distance} km |{' '}
                      <strong>Weight:</strong> {priceData.parcelData.weight} kg
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold text-lg">Price Breakdown</h3>
                  <div className="divider my-2"></div>

                  <div className="flex justify-between py-2 border-b border-base-300">
                    <span>Base Fee</span>
                    <span>৳ {priceData.breakdown.baseFee}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-base-300">
                    <span>Distance Charge ({priceData.parcelData.distance} km × ৳5)</span>
                    <span>৳ {priceData.breakdown.distanceFee}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-base-300">
                    <span>Weight Charge ({priceData.parcelData.weight} kg × ৳25)</span>
                    <span>৳ {priceData.breakdown.weightFee}</span>
                  </div>

                  {priceData.breakdown.sizePremium > 0 && (
                    <div className="flex justify-between py-2 border-b border-base-300">
                      <span>
                        Size Premium ({priceData.breakdown.sizeCategory.toUpperCase()})
                      </span>
                      <span>৳ {priceData.breakdown.sizePremium}</span>
                    </div>
                  )}

                  {formData.insurance && (
                    <div className="flex justify-between py-2 border-b border-base-300">
                      <span>Insurance (Optional)</span>
                      <span>৳ 50</span>
                    </div>
                  )}

                  <div className="flex justify-between py-3 bg-primary text-primary-content rounded px-4 font-bold text-lg">
                    <span>Total Estimated Price</span>
                    <span>৳ {priceData.price}</span>
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="alert alert-warning mb-6">
                  <div>
                    <p className="text-sm">
                      <strong>Note:</strong> This is a tentative price quote. Final price may vary
                      based on actual measurements, weight verification, and delivery location
                      confirmation.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="card-actions justify-between">
                  <button
                    onClick={handleEditParcel}
                    className="btn btn-outline"
                  >
                    Edit Parcel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="btn btn-primary"
                  >
                    Confirm & Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show form
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            📦 Create New Parcel
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sender Information */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Sender Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="senderName"
                      placeholder="Full name"
                      className="input input-bordered"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Phone *</span>
                    </label>
                    <input
                      type="tel"
                      name="senderPhone"
                      placeholder="+880 1700 000000"
                      className="input input-bordered"
                      value={formData.senderPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Address *</span>
                  </label>
                  <input
                    type="text"
                    name="senderAddress"
                    placeholder="Street address"
                    className="input input-bordered"
                    value={formData.senderAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">City *</span>
                  </label>
                  <select
                    name="senderCity"
                    className="select select-bordered"
                    value={formData.senderCity}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="khulna">Khulna</option>
                    <option value="rajshahi">Rajshahi</option>
                    <option value="barisal">Barisal</option>
                    <option value="rangpur">Rangpur</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Receiver Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name *</span>
                    </label>
                    <input
                      type="text"
                      name="receiverName"
                      placeholder="Full name"
                      className="input input-bordered"
                      value={formData.receiverName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Phone *</span>
                    </label>
                    <input
                      type="tel"
                      name="receiverPhone"
                      placeholder="+880 1700 000000"
                      className="input input-bordered"
                      value={formData.receiverPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Address *</span>
                  </label>
                  <input
                    type="text"
                    name="receiverAddress"
                    placeholder="Street address"
                    className="input input-bordered"
                    value={formData.receiverAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">City *</span>
                  </label>
                  <select
                    name="receiverCity"
                    className="select select-bordered"
                    value={formData.receiverCity}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="khulna">Khulna</option>
                    <option value="rajshahi">Rajshahi</option>
                    <option value="barisal">Barisal</option>
                    <option value="rangpur">Rangpur</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parcel Information */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Parcel Information</h2>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Parcel Type</span>
                  </label>
                  <select
                    name="parcelType"
                    className="select select-bordered"
                    value={formData.parcelType}
                    onChange={handleChange}
                  >
                    <option value="document">Document</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="fragile">Fragile Item</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-semibold">Description</span>
                  </label>
                  <textarea
                    name="parcelDescription"
                    placeholder="Briefly describe what's in the parcel"
                    className="textarea textarea-bordered"
                    value={formData.parcelDescription}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Weight (kg) *</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      name="weight"
                      placeholder="0.5"
                      className="input input-bordered"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Length (cm)</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      name="length"
                      placeholder="20"
                      className="input input-bordered"
                      value={formData.length}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Width (cm)</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      name="width"
                      placeholder="15"
                      className="input input-bordered"
                      value={formData.width}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Height (cm)</span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      name="height"
                      placeholder="10"
                      className="input input-bordered"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Delivery Information</h2>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Estimated Distance (km) *
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    name="distance"
                    placeholder="10"
                    className="input input-bordered"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-xs">
                      Enter approximate distance between pickup and delivery locations
                    </span>
                  </label>
                </div>

                <div className="form-control mt-4">
                  <label className="label cursor-pointer">
                    <span className="label-text font-semibold">
                      Add Insurance (৳50)
                    </span>
                    <input
                      type="checkbox"
                      name="insurance"
                      className="checkbox"
                      checked={formData.insurance}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="label">
                    <span className="label-text-alt text-xs">
                      Protects your parcel up to ৳5,000 in case of loss or damage
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg flex-1"
              >
                Calculate & Get Price Quote
              </button>
            </div>
          </form>

          {/* Pricing Info */}
          <div className="alert alert-info mt-8">
            <div>
              <h3 className="font-bold mb-2">💡 Pricing Information</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Base Fee: ৳50</li>
                <li>Distance Charge: ৳5 per km</li>
                <li>Weight Charge: ৳25 per kg</li>
                <li>Size Premium: ৳0-100 (based on parcel dimensions)</li>
                <li>Final price may vary based on actual measurements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
