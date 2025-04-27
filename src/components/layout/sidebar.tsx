"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Map, Cpu, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "종합 현황",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "작업자 관리",
    href: "/dashboard/workers",
    icon: Users,
  },
  {
    title: "구역 모니터링",
    href: "/dashboard/monitoring",
    icon: Map,
  },
  {
    title: "장치 관리",
    href: "/dashboard/devices",
    icon: Cpu,
  },
  {
    title: "알림 리스트",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "설정",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("h-full border-r bg-card", className)}>
      <div className="flex h-full flex-col px-4 py-6">
        {/* 로고 */}
        <div className="mb-8 px-4">
          <h1 className="text-xl font-bold">세이프코 대시보드</h1>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-2", {
                  "bg-secondary": isActive,
                })}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
