import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar>{children}</Sidebar>
    </main>
  );
}
