import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import { FloatingCharacter } from "@/components/floating-character";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative bg-white">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[40]">
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <Topbar />
        <main className="p-6 mt-16 min-h-screen bg-slate-50">{children}</main>
      </div>
      <FloatingCharacter />
    </div>
  );
}
