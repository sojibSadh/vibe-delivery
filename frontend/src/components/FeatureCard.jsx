export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body items-center text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="card-title">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
