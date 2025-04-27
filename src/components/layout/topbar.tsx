"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  className?: string;
}

export default function Topbar({ className }: TopbarProps) {
  return (
    <div
      className={cn(
        "h-16 border-b px-6 flex items-center justify-between bg-background",
        className
      )}
    >
      {/* 검색 */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* 우측 메뉴 */}
      <div className="flex items-center gap-4">
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
