import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // TODO: Connect to backend API
    console.log('Signup attempt:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-center mb-6">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">I am a:</span>
                </label>
                <select
                  name="userType"
                  className="select select-bordered"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="customer">Customer (Send Parcels)</option>
                  <option value="driver">Driver (Deliver Parcels)</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="input input-bordered"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1234567890"
                  className="input input-bordered"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="input input-bordered"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-6">
                Sign Up
              </button>
            </form>

            <div className="divider">OR</div>

            <div className="text-center">
              <p className="text-sm">
                Already have an account?{' '}
                <Link to="/login" className="link link-primary">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
