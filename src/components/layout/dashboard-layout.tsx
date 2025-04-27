import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* 사이드바 - 고정 위치 */}
      <Sidebar className="w-64 flex-shrink-0 fixed left-0 top-0 h-screen z-20" />

      {/* 사이드바 공간 확보를 위한 더미 div */}
      <div className="w-64 flex-shrink-0" />

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 바 - 고정 위치 */}
        <Topbar className="fixed top-0 right-0 left-64 z-10" />

        {/* 상단 바 공간 확보를 위한 더미 div */}
        <div className="h-16" />

        {/* 메인 컨텐츠 영역 - 스크롤 가능 */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
