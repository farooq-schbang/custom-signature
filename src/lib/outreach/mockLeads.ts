// Generates realistic mock leads for demonstration/development.
// Replace generateLeads() with real OpenOutreach API calls in production.
import type { Lead } from "./types";

const SAMPLE_LEADS: Omit<Lead, "id" | "campaignId" | "discoveredAt" | "emailedAt" | "status">[] = [
  { name: "Sarah Chen", title: "VP of Sales", company: "Salesforce", email: "s.chen@salesforce.com", linkedinUrl: "https://linkedin.com/in/sarah-chen-sales", summary: "10+ years in B2B SaaS sales. Leads enterprise accounts across APAC." },
  { name: "Marcus Rivera", title: "Head of Growth", company: "HubSpot", email: "m.rivera@hubspot.com", linkedinUrl: "https://linkedin.com/in/marcus-rivera-growth", summary: "Growth marketer specialising in outbound pipeline generation." },
  { name: "Jennifer Park", title: "Co-Founder & CEO", company: "Luminary AI", email: null, linkedinUrl: "https://linkedin.com/in/jennifer-park-ai", summary: "Serial founder. Previously: Google, Stripe. Raised $14M Series A." },
  { name: "David Kim", title: "Director of Revenue Operations", company: "Zoom", email: "d.kim@zoom.us", linkedinUrl: "https://linkedin.com/in/david-kim-revops", summary: "RevOps leader driving GTM alignment at Zoom." },
  { name: "Priya Kapoor", title: "Sales Manager", company: "Shopify", email: "p.kapoor@shopify.com", linkedinUrl: "https://linkedin.com/in/priya-kapoor-shopify", summary: "Manages an SMB sales team of 12. Focused on e-commerce verticals." },
  { name: "Tom Hartley", title: "Chief Marketing Officer", company: "Notion", email: "tom@notion.so", linkedinUrl: "https://linkedin.com/in/tom-hartley-notion", summary: "CMO shaping Notion's go-to-market and brand strategy globally." },
  { name: "Aisha Williams", title: "VP Product", company: "Figma", email: "a.williams@figma.com", linkedinUrl: "https://linkedin.com/in/aisha-williams-figma", summary: "Product leader at Figma. Obsessed with design tooling and collaboration." },
  { name: "Raj Patel", title: "Founder", company: "ReachStack", email: "raj@reachstack.io", linkedinUrl: "https://linkedin.com/in/raj-patel-reachstack", summary: "Built two bootstrapped SaaS products to $2M+ ARR." },
  { name: "Lisa Gomez", title: "Enterprise Account Executive", company: "Slack", email: "l.gomez@slack.com", linkedinUrl: "https://linkedin.com/in/lisa-gomez-slack", summary: "Closes Fortune 500 deals at Slack. $4M+ quota carrier." },
  { name: "Ethan Brooks", title: "Head of Partnerships", company: "Stripe", email: "e.brooks@stripe.com", linkedinUrl: "https://linkedin.com/in/ethan-brooks-stripe", summary: "Runs the global fintech partner ecosystem at Stripe." },
];

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function generateLeads(campaignId: string, count = 10): Lead[] {
  const now = new Date().toISOString();
  return SAMPLE_LEADS.slice(0, count).map(l => ({
    ...l,
    id: uid(),
    campaignId,
    status: "qualified" as const,
    discoveredAt: now,
    emailedAt: null,
  }));
}
