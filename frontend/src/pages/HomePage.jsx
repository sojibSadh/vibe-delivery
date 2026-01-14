import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-50">
      <Navbar />

      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-primary to-primary-focus text-primary-content py-20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hello Delivery 🚀
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Fast, Reliable & Affordable Parcel Delivery Service
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/create-parcel" className="btn btn-lg btn-secondary">
                Send a Parcel
              </Link>
              <Link to="/track" className="btn btn-lg btn-outline btn-secondary">
                Track Parcel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Vibe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Fast Delivery"
              description="Get your parcels delivered quickly with our efficient network"
            />
            <FeatureCard
              icon="🛡️"
              title="Secure & Safe"
              description="Your parcels are insured and tracked throughout delivery"
            />
            <FeatureCard
              icon="💰"
              title="Affordable Pricing"
              description="Competitive rates with transparent, no-hidden-fee pricing"
            />
            <FeatureCard
              icon="🗺️"
              title="Real-time Tracking"
              description="Track your delivery in real-time with live location updates"
            />
            <FeatureCard
              icon="👥"
              title="Expert Drivers"
              description="Professional and trained delivery personnel"
            />
            <FeatureCard
              icon="📱"
              title="Easy to Use"
              description="Simple and user-friendly mobile and web app"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 bg-base-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-center text-lg opacity-75 mb-16">
            Join thousands of happy customers who experience reliable delivery with Vibe
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
             text="Amazing service!"
              avatar="👨‍💼"
              name="Ahmed Hassan"
              role="Small Business Owner"
              rating={5}
              testimonial="Vibe Delivery has transformed how I handle my e-commerce shipments. Fast, reliable, and incredibly affordable!"
            />
            <TestimonialCard
             text="Amazing service!"
              avatar="👩‍🔬"
              name="Zainab Malik"
              role="Freelancer"
              rating={5}
              testimonial="I've sent hundreds of packages with Vibe. Their real-time tracking gives me peace of mind every single time."
            />
            <TestimonialCard
             text="Amazing service!"
              avatar="👨‍🎨"
              name="Tariq Khan"
              role="Creative Director"
              rating={5}
              testimonial="Best delivery service I've used! The driver was professional and the package arrived perfectly intact."
            />
            <TestimonialCard
             text="Amazing service!"
              avatar="👩‍💼"
              name="Leila Ahmed"
              role="Online Retailer"
              rating={5}
              testimonial="Customer satisfaction has improved since switching to Vibe. Highly recommended for any business!"
            />
            <TestimonialCard
             text="Amazing service!"
              avatar="👨‍⚕️"
              name="Dr. Karim"
              role="Healthcare Professional"
              rating={5}
              testimonial="Quick delivery, professional service, and transparent pricing. Exactly what I was looking for."
            />
            <TestimonialCard
             text="Amazing service!"
              avatar="👩‍🏫"
              name="Amina Hassan"
              role="Educator"
              rating={5}
              testimonial="Vibe makes sending educational materials to students across the city so easy and affordable!"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="pricing" className="bg-gradient-to-r from-secondary to-accent text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust Vibe Delivery
          </p>
          <Link to="/signup" className="btn btn-lg btn-primary">
            Create Account Now
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
