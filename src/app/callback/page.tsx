"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeCodeForToken } from "@/lib/webex";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (code && state?.startsWith("webex_auth_")) {
        try {
          await exchangeCodeForToken(code);
          // 인증 성공 후 모니터링 페이지로 리다이렉트
          router.push("/dashboard/monitoring");
        } catch (error) {
          console.error("Authentication error:", error);
          // 에러 발생 시 모니터링 페이지로 리다이렉트 (에러 처리는 해당 페이지에서)
          router.push("/dashboard/monitoring");
        }
      } else {
        // 유효하지 않은 콜백인 경우 모니터링 페이지로 리다이렉트
        router.push("/dashboard/monitoring");
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">인증 처리 중...</h1>
        <p className="text-muted-foreground">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
