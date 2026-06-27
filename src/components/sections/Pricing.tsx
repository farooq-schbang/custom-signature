"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const PLANS = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    desc: "Perfect for individuals getting started.",
    color: "#6b7280",
    features: [
      "1 Email Signature",
      "Basic Templates (3)",
      "Name, Title, Company",
      "Social Media Icons",
      "Email Support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 19, annual: 14 },
    desc: "For professionals who mean business.",
    color: "#2563eb",
    features: [
      "5 Email Signatures",
      "50+ Premium Templates",
      "Animated Logo & Profile",
      "Calendar Meeting Link",
      "GIF Product Showcase",
      "Verified Blue Badge",
      "Analytics Dashboard",
      "Priority Support",
      "1000+ Platform Support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 79, annual: 59 },
    desc: "For Fortune 500 teams & organizations.",
    color: "#7c3aed",
    features: [
      "Unlimited Signatures",
      "Team Management Console",
      "Brand Compliance Engine",
      "Bulk Deployment",
      "Custom Domain",
      "SSO / SAML Integration",
      "Dedicated Success Manager",
      "SLA & Custom Contracts",
      "White-label Option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [annual, setAnnual] = useState(true);

  return (
    <section ref={ref} id="pricing" className="py-28 relative">
      <div className="absolute inset-0 opacity-10"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, #2563eb, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-blue-500/30 text-blue-400 mb-4">
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Invest in Your
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              First Impression
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            One email can open Fortune 500 doors. Make it count.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!annual ? "text-white" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 rounded-full relative transition-all"
              style={{ background: annual ? "#2563eb" : "#374151" }}
            >
              <motion.div
                animate={{ x: annual ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full"
              />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-white" : "text-gray-500"}`}>
              Annual
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-semibold">Save 25%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: plan.popular ? `linear-gradient(145deg, ${plan.color}15, rgba(0,0,0,0.8))` : "rgba(255,255,255,0.03)",
                border: plan.popular ? `1px solid ${plan.color}60` : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: plan.color }}>
                  Most Popular
                </div>
              )}

              {/* Top bar */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }} />
              )}

              <div className="mb-6">
                <div className="text-white font-bold text-xl mb-1">{plan.name}</div>
                <div className="text-gray-500 text-sm">{plan.desc}</div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                {annual && plan.price.annual > 0 && (
                  <div className="text-gray-600 text-xs mt-1">Billed annually · ${plan.price.monthly}/mo billed monthly</div>
                )}
              </div>

              <Button
                variant={plan.popular ? "primary" : "secondary"}
                className="w-full mb-6"
                onClick={() => {}}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      style={{ background: plan.color + "30", color: plan.color }}>✓</span>
                    <span className="text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-600 text-sm mt-8"
        >
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
