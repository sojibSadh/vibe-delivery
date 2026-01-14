import { useEffect, useState } from 'react';

export default function TestimonialCard({ avatar, image, name, role, company, text, rating }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`card bg-base-100 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-500`}
    >
      <div className="card-body">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <span 
              key={i} 
              className="text-yellow-400 text-lg transition-transform duration-300 hover:scale-125 cursor-pointer"
              style={{
                transitionDelay: `${i * 50}ms`,
                animation: isVisible ? `slideIn 0.6s ease-out ${i * 0.1}s forwards` : 'none'
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-base-content mb-6 italic font-light leading-relaxed animate-fade-in">
          "{text}"
        </p>

        {/* Divider */}
        <div className="divider my-0"></div>

        {/* User Info */}
        <div className="flex items-center gap-4 mt-4 group">
          <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 transition-transform duration-300 group-hover:scale-110">
            <div className="w-14 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center text-lg font-bold overflow-hidden">
              {image ? (
                <img 
                  src={image} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{avatar}</span>
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-base-content group-hover:text-primary transition-colors duration-300">
              {name}
            </p>
            <p className="text-sm text-base-content/70">{role}</p>
            {company && (
              <p className="text-xs text-base-content/50 font-semibold mt-1 uppercase tracking-wide">
                {company}
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
