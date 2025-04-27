"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TopbarProps {
  className?: string;
}

const getPageTitle = (pathname: string) => {
  const routes: { [key: string]: string } = {
    "/dashboard": "종합 현황",
    "/dashboard/workers": "작업자 관리",
    "/dashboard/monitoring": "구역 모니터링",
    "/dashboard/devices": "장치 관리",
    "/dashboard/notifications": "알림 리스트",
    "/dashboard/settings": "설정",
  };
  return routes[pathname] || "대시보드";
};

export default function Topbar({ className }: TopbarProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(`${formattedDate} ${formattedTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "h-16 border-b px-6 flex items-center justify-between bg-background",
        className
      )}
    >
      {/* 페이지 제목 */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">{getPageTitle(pathname)}</h1>
      </div>

      {/* 우측 메뉴 */}
      <div className="flex items-center gap-4">
        {/* 현재 시간 */}
        <div className="text-sm text-muted-foreground">{currentTime}</div>

        {/* 알림 */}
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        {/* 프로필 */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
