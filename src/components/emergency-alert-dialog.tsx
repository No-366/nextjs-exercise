"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Phone } from "lucide-react";
import { createMeeting, sendMessage } from "@/lib/webex";
import { useState, useEffect } from "react";

interface EmergencyAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyAlertDialog({
  isOpen,
  onClose,
}: EmergencyAlertDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const currentTime = new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    if (isOpen) {
      sendEmergencyMessage();
    }
  }, [isOpen]);

  const sendEmergencyMessage = async () => {
    try {
      const emergencyMessage = `🚨 *긴급 알림: 낙상 사고 감지*

발생 시간: ${currentTime}
위치: B1 자재 보관소
작업자: 김영호 (안전관리자)

⚠️ 즉시 조치가 필요한 상황입니다!
모든 관리자는 즉시 확인 바랍니다.

_이 메시지는 자동 발송되었습니다._`;

      await sendMessage(emergencyMessage);
    } catch (error) {
      console.error("Failed to send emergency message:", error);
    }
  };

  const handleStartMeeting = async () => {
    try {
      setIsLoading(true);
      const meeting = await createMeeting(
        "[긴급] 낙상 사고 발생 - 긴급 화상 회의"
      );
      console.log("Meeting created:", meeting);
    } catch (error) {
      console.error("Failed to create meeting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 text-xl">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            긴급 경보: 낙상 사고 감지
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
            <div className="font-medium text-red-800">시간: {currentTime}</div>
            <div className="font-medium text-red-800">위치: B1 자재 보관소</div>
            <div className="font-medium text-red-800">
              작업자: 김영호 (안전관리자)
            </div>
          </div>
          <div className="text-red-600 font-semibold animate-pulse text-center text-lg">
            * 즉시 조치가 필요한 상황입니다!
          </div>
          <div className="text-slate-600 font-semibold text-center text-lg">
            모든 인원들에게 자동으로 주의 메시지가 전달됩니다
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="destructive"
            className="w-full py-6 text-lg font-bold hover:bg-red-600 bg-red-500 shadow-lg border-2 border-red-600 flex items-center justify-center gap-3"
            onClick={handleStartMeeting}
            disabled={isLoading}
          >
            <Phone className={`h-6 w-6 ${isLoading ? "animate-pulse" : ""}`} />
            {isLoading ? "미팅 생성 중..." : "긴급 화상 연결"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
