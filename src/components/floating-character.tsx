"use client";

import Image from "next/image";
import { useState } from "react";
import { EmergencyAlertDialog } from "./emergency-alert-dialog";

export function FloatingCharacter() {
  const [isHovered, setIsHovered] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

  return (
    <>
      <div
        className="fixed left-6 bottom-6 z-[50] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowEmergencyAlert(true)}
      >
        <div className="relative transition-transform duration-300 hover:scale-110">
          <Image
            src={
              isHovered ? "/safecoCharacter_2.png" : "/safecoCharacter_1.png"
            }
            alt="SafeCo Character"
            width={180}
            height={180}
            className="transition-all duration-300 ease-in-out"
            priority
          />
        </div>
      </div>

      <EmergencyAlertDialog
        isOpen={showEmergencyAlert}
        onClose={() => setShowEmergencyAlert(false)}
      />
    </>
  );
}
