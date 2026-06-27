import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenOutreach Portal — AI Lead Generation",
  description: "Describe your target market. We find and email qualified leads for you.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh", background: "#020208" }}>{children}</div>;
}
