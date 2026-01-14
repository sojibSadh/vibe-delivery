export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black to-orange-600 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">🚚 Vibe Delivery</h3>
          <p className="text-sm text-gray-200 mb-4">
            Fast, reliable, and affordable parcel delivery service for everyone.
          </p>
          <div className="flex gap-3">
            <a href="#" className="btn btn-sm btn-circle btn-ghost hover:bg-orange-500 hover:text-white" title="Facebook">f</a>
            <a href="#" className="btn btn-sm btn-circle btn-ghost hover:bg-orange-500 hover:text-white" title="Twitter">𝕏</a>
            <a href="#" className="btn btn-sm btn-circle btn-ghost hover:bg-orange-500 hover:text-white" title="Instagram">📷</a>
            <a href="#" className="btn btn-sm btn-circle btn-ghost hover:bg-orange-500 hover:text-white" title="LinkedIn">in</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="link link-hover text-gray-200 hover:text-orange-300">Features</a></li>
            <li><a href="#pricing" className="link link-hover text-gray-200 hover:text-orange-300">Pricing</a></li>
            <li><a href="#" className="link link-hover text-gray-200 hover:text-orange-300">Blog</a></li>
            <li><a href="#contact" className="link link-hover text-gray-200 hover:text-orange-300">Contact</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-lg mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#about" className="link link-hover text-gray-200 hover:text-orange-300">About Us</a></li>
            <li><a href="#" className="link link-hover text-gray-200 hover:text-orange-300">Careers</a></li>
            <li><a href="#" className="link link-hover text-gray-200 hover:text-orange-300">Press</a></li>
            <li><a href="#" className="link link-hover text-gray-200 hover:text-orange-300">Partners</a></li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover text-gray-200 hover:text-orange-300">Help Center</a></li>
            <li><a href="#terms" className="link link-hover text-gray-200 hover:text-orange-300">Terms of Service</a></li>
            <li><a href="#privacy" className="link link-hover text-gray-200 hover:text-orange-300">Privacy Policy</a></li>
            <li><a href="#" className="link link-hover text-gray-200 hover:text-orange-300">FAQ</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-6 text-orange-100">Subscribe to our newsletter for updates and special offers</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1 text-base-content"
            />
            <button className="btn bg-black hover:bg-gray-800 text-white border-black">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <p>Copyright © {currentYear} Vibe Delivery. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="link link-hover text-gray-300 hover:text-orange-300">Privacy Policy</a>
            <a href="#" className="link link-hover text-gray-300 hover:text-orange-300">Terms of Service</a>
            <a href="#" className="link link-hover text-gray-300 hover:text-orange-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
