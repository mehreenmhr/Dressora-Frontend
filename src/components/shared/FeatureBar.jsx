import { Truck, RotateCcw, CreditCard, Headphones, Shield } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over Rs. 2,000' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return guarantee' },
  { icon: CreditCard, title: 'Secure Payment', desc: '100% secure transactions' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer service' },
  { icon: Shield, title: 'Quality Assured', desc: 'Premium clothing guaranteed' },
];

export default function FeatureBar() {
  return (
    <div className="feature-bar">
      {features.map((feature, idx) => (
        <div key={idx} className="feature-item">
          <div className="feature-icon">
            <feature.icon size={24} />
          </div>
          <div className="feature-title">{feature.title}</div>
          <div className="feature-desc">{feature.desc}</div>
        </div>
      ))}
    </div>
  );
}
