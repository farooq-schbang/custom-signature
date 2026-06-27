export type LeadStatus = "queued" | "qualified" | "emailed" | "failed";
export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface Lead {
  id: string;
  campaignId: string;
  name: string;
  title: string;
  company: string;
  email: string | null;
  linkedinUrl: string;
  summary: string;
  status: LeadStatus;
  discoveredAt: string;
  emailedAt: string | null;
}

export interface Campaign {
  id: string;
  userId: string;
  name: string;
  productDescription: string;
  targetMarket: string;
  keywords: string[];
  deliveryEmail: string;
  status: CampaignStatus;
  leadsFound: number;
  leadsEmailed: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserUsage {
  userId: string;
  email: string;
  freeLeadsUsed: number;
  freeLeadsLimit: number;
  totalLeadsPurchased: number;
  creditBalance: number;
}

export interface CreateCampaignBody {
  name: string;
  productDescription: string;
  targetMarket: string;
  keywords: string[];
  deliveryEmail: string;
  userId?: string;
}
