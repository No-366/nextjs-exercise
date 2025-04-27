"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Search,
  Users,
  Camera,
  Cpu,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  MapPin,
  Wifi,
  Video,
  LayoutGrid,
  Filter,
  Clock,
  Battery,
  CalendarCheck,
  MessageSquare,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// 타입 정의
interface Worker {
  id: string;
  name: string;
  role: string;
  location: string;
  team: string;
  status: "normal" | "warning";
  workHours: number;
  heartRate: number;
  temperature: number;
}

type Camera = {
  id: string;
  location: string;
  status: "online" | "offline";
  lastMotion: string;
  type: string;
  resolution: string;
};

type Sensor = {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  gasLevel: string;
  status: "normal" | "warning";
  type: string;
  batteryLevel: number;
};

type MonitoringItem = Worker | Camera | Sensor;

// 구역 정보 타입 정의
type AreaInfo = {
  id: string;
  name: string;
  type: string;
  securityLevel: "높음" | "중간" | "낮음";
  safetyStatus: "안전" | "주의" | "위험";
  lastInspection: string;
  description: string;
  workers: number;
  temperature: number;
  humidity: number;
};

// 위치 좌표 타입 정의
type Position = {
  x: number; // 0-100 사이의 값 (%)
  y: number; // 0-100 사이의 값 (%)
};

type WorkerWithPosition = Worker & { position: Position };
type CameraWithPosition = Camera & { position: Position };
type SensorWithPosition = Sensor & { position: Position };

// 샘플 데이터
const workers: Worker[] = [
  {
    id: "w1",
    name: "김철수",
    role: "안전관리자",
    location: "A구역",
    team: "1팀",
    status: "normal",
    workHours: 4,
    heartRate: 75,
    temperature: 36.5,
  },
  {
    id: "w2",
    name: "이영희",
    role: "작업자",
    location: "A구역",
    team: "1팀",
    status: "normal",
    workHours: 3,
    heartRate: 80,
    temperature: 36.7,
  },
  {
    id: "w3",
    name: "박지성",
    role: "작업자",
    location: "B구역",
    team: "2팀",
    status: "warning",
    workHours: 5,
    heartRate: 95,
    temperature: 37.2,
  },
  {
    id: "w4",
    name: "손흥민",
    role: "안전관리자",
    location: "B구역",
    team: "2팀",
    status: "warning",
    workHours: 6,
    heartRate: 90,
    temperature: 37.1,
  },
  {
    id: "w5",
    name: "정우영",
    role: "작업자",
    location: "C구역",
    team: "3팀",
    status: "normal",
    workHours: 2,
    heartRate: 78,
    temperature: 36.4,
  },
  {
    id: "w6",
    name: "황희찬",
    role: "작업자",
    location: "C구역",
    team: "3팀",
    status: "normal",
    workHours: 4,
    heartRate: 82,
    temperature: 36.6,
  },
];

const cameras: Camera[] = [
  {
    id: "MV-001",
    location: "A구역 입구",
    status: "online",
    lastMotion: "2분 전",
    type: "고정형",
    resolution: "1080p",
  },
  {
    id: "MV-002",
    location: "B구역 작업장",
    status: "offline",
    lastMotion: "연결 끊김",
    type: "회전형",
    resolution: "4K",
  },
  {
    id: "MV-003",
    location: "C구역 비상구",
    status: "online",
    lastMotion: "5분 전",
    type: "고정형",
    resolution: "1080p",
  },
  {
    id: "MV-004",
    location: "A구역 작업장",
    status: "online",
    lastMotion: "방금 전",
    type: "회전형",
    resolution: "2K",
  },
];

const sensors: Sensor[] = [
  {
    id: "AV-001",
    location: "A구역 중앙",
    temperature: 28.5,
    humidity: 65,
    gasLevel: "정상",
    status: "normal",
    type: "복합센서",
    batteryLevel: 85,
  },
  {
    id: "AV-002",
    location: "B구역 북쪽",
    temperature: 32.1,
    humidity: 70,
    gasLevel: "주의",
    status: "warning",
    type: "온습도계",
    batteryLevel: 45,
  },
  {
    id: "AV-003",
    location: "C구역 남쪽",
    temperature: 27.8,
    humidity: 62,
    gasLevel: "정상",
    status: "normal",
    type: "가스감지기",
    batteryLevel: 92,
  },
  {
    id: "AV-004",
    location: "B구역 동쪽",
    temperature: 29.5,
    humidity: 68,
    gasLevel: "정상",
    status: "normal",
    type: "복합센서",
    batteryLevel: 73,
  },
];

// 위치 정보가 포함된 데이터
const workersWithPosition: WorkerWithPosition[] = [
  {
    ...workers[0],
    position: { x: 20, y: 30 }, // A구역
  },
  {
    ...workers[1],
    position: { x: 75, y: 65 }, // A구역
  },
  {
    ...workers[2],
    position: { x: 45, y: 60 }, // B구역
  },
  {
    ...workers[3],
    position: { x: 25, y: 40 }, // B구역
  },
  {
    ...workers[4],
    position: { x: 50, y: 70 }, // C구역
  },
  {
    ...workers[5],
    position: { x: 80, y: 80 }, // C구역
  },
];

const camerasWithPosition: CameraWithPosition[] = [
  {
    ...cameras[0],
    position: { x: 15, y: 20 }, // A구역 입구
  },
  {
    ...cameras[1],
    position: { x: 50, y: 50 }, // B구역 작업장
  },
  {
    ...cameras[2],
    position: { x: 80, y: 70 }, // C구역 비상구
  },
  {
    ...cameras[3],
    position: { x: 30, y: 35 }, // A구역 작업장
  },
];

const sensorsWithPosition: SensorWithPosition[] = [
  {
    ...sensors[0],
    position: { x: 25, y: 25 }, // A구역 중앙
  },
  {
    ...sensors[1],
    position: { x: 45, y: 45 }, // B구역 북쪽
  },
  {
    ...sensors[2],
    position: { x: 70, y: 75 }, // C구역 남쪽
  },
  {
    ...sensors[3],
    position: { x: 55, y: 55 }, // B구역 동쪽
  },
];

// 구역 정보 데이터
const areaInfos: Record<string, AreaInfo> = {
  A: {
    id: "A",
    name: "A구역",
    type: "제조 공정",
    securityLevel: "높음",
    safetyStatus: "주의",
    lastInspection: "2024-03-15",
    description: "주요 제조 설비가 위치한 핵심 생산구역",
    workers: 12,
    temperature: 26,
    humidity: 45,
  },
  B: {
    id: "B",
    name: "B구역",
    type: "자재 보관",
    securityLevel: "중간",
    safetyStatus: "안전",
    lastInspection: "2024-03-10",
    description: "원자재 및 완제품 보관, 물류 처리 구역",
    workers: 8,
    temperature: 22,
    humidity: 50,
  },
  C: {
    id: "C",
    name: "C구역",
    type: "품질 관리",
    securityLevel: "중간",
    safetyStatus: "위험",
    lastInspection: "2024-03-12",
    description: "품질 검사 및 테스트가 진행되는 구역",
    workers: 6,
    temperature: 24,
    humidity: 55,
  },
};

// 웹엑스 웹훅 전송 함수
const sendWebexMessage = async (message: string) => {
  try {
    const webhookUrl =
      "https://webexapis.com/v1/webhooks/incoming/Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1dFQkhPT0svYjdjMTJiNjgtNTQzNy00OTI2LWJmZDctNGEzNzMzODdjZDQy"; // 실제 웹훅 URL로 교체 필요

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        markdown: `**[세이프코 안전 관리자]**\n\n${message}`,
      }),
    });

    if (!response.ok) {
      throw new Error("메시지 전송 실패");
    }

    return true;
  } catch (error) {
    console.error("웹엑스 메시지 전송 오류:", error);
    return false;
  }
};

export default function MonitoringPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MonitoringItem | null>(null);
  const [selectedArea, setSelectedArea] = useState("all");
  const [mapSelectedArea, setMapSelectedArea] = useState("all");

  // 모달 상태 관리
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [messageText, setMessageText] = useState("");

  // 선택된 타입에 따라 보여줄 항목들을 필터링
  const getFilteredItems = () => {
    let items = [];
    switch (selectedType) {
      case "workers":
        items = workers;
        break;
      case "cameras":
        items = cameras;
        break;
      case "sensors":
        items = sensors;
        break;
      default:
        items = [...workers, ...cameras, ...sensors];
    }

    if (selectedArea !== "all") {
      return items.filter((item) => item.location.includes(selectedArea));
    }
    return items;
  };

  // 클릭 이벤트 핸들러
  const handleItemClick = (item: MonitoringItem) => {
    setSelectedItem(item);
    // 선택된 대상의 구역 추출 (예: "A구역 입구" -> "A")
    const areaMatch = item.location.match(/[ABC](?=구역)/);
    if (areaMatch) {
      setMapSelectedArea(areaMatch[0]);
    }
  };

  // 좌측 패널 구역 변경 핸들러
  const handlePanelAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  // 지도 구역 변경 핸들러
  const handleMapAreaChange = (value: string) => {
    setMapSelectedArea(value);
    // 구역이 변경되면서 선택된 대상이 해당 구역에 없는 경우 선택 해제
    if (
      selectedItem &&
      !selectedItem.location.includes(value) &&
      value !== "all"
    ) {
      setSelectedItem(null);
    }
  };

  // 현재 구역의 작업자 목록 가져오기
  const getAreaWorkers = (area: string) => {
    return workers.filter((worker) => worker.location.includes(area));
  };

  // 메시지 전송 처리 함수 수정
  const handleSendMessage = async () => {
    const success = await sendWebexMessage(messageText);

    if (success) {
      // 성공 시 토스트 메시지 표시 또는 다른 피드백
      console.log("메시지가 성공적으로 전송되었습니다.");
    } else {
      // 실패 시 에러 메시지 표시
      console.error("메시지 전송에 실패했습니다.");
    }

    setMessageDialogOpen(false);
    setSelectedWorkers([]);
    setMessageText("");
  };

  // 미팅 시작 처리
  const handleStartMeeting = () => {
    setMeetingDialogOpen(false);
    setSelectedWorkers([]);
  };

  // 전화 연결 처리
  const handleStartCall = () => {
    setCallDialogOpen(false);
    setSelectedWorkers([]);
  };

  // 구역 정보 렌더링
  const renderAreaInfo = () => {
    if (mapSelectedArea === "all") {
      return (
        <div className="text-center text-sm text-muted-foreground">
          구역을 선택하면 상세 정보가 표시됩니다.
        </div>
      );
    }

    const areaInfo = areaInfos[mapSelectedArea];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{areaInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{areaInfo.type}</p>
          </div>
          {/* 커뮤니케이션 버튼 */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                setSelectedWorkers([]);
                setMessageText("");
                setMessageDialogOpen(true);
              }}
            >
              <MessageSquare className="h-4 w-4" />
              메시지
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                setSelectedWorkers([]);
                setMeetingDialogOpen(true);
              }}
            >
              <Video className="h-4 w-4" />
              미팅
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                setSelectedWorkers([]);
                setCallDialogOpen(true);
              }}
            >
              <Phone className="h-4 w-4" />
              전화
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-0.5",
              areaInfo.securityLevel === "높음" &&
                "border-red-500 text-red-700 bg-red-50",
              areaInfo.securityLevel === "중간" &&
                "border-yellow-500 text-yellow-700 bg-yellow-50",
              areaInfo.securityLevel === "낮음" &&
                "border-green-500 text-green-700 bg-green-50"
            )}
          >
            보안등급: {areaInfo.securityLevel}
          </Badge>
          <Badge
            className={cn(
              "px-2 py-0.5",
              areaInfo.safetyStatus === "안전" &&
                "bg-green-500 hover:bg-green-600",
              areaInfo.safetyStatus === "주의" &&
                "bg-yellow-500 hover:bg-yellow-600",
              areaInfo.safetyStatus === "위험" && "bg-red-500 hover:bg-red-600"
            )}
          >
            {areaInfo.safetyStatus}
          </Badge>
        </div>
        <div className="flex items-start gap-2">
          <p className="flex-1 text-sm">{areaInfo.description}</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">작업자 수</p>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{areaInfo.workers}명</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">온도</p>
            <div className="flex items-center gap-1">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="font-medium">{areaInfo.temperature}°C</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">습도</p>
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{areaInfo.humidity}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">최근 점검일</p>
            <div className="flex items-center gap-1">
              <CalendarCheck className="h-4 w-4 text-green-500" />
              <span className="font-medium">{areaInfo.lastInspection}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 선택된 대상의 상세 정보 렌더링
  const renderDetailInfo = () => {
    if (!selectedItem) {
      return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          지도에서 작업자, 카메라, 또는 센서를 선택하면 상세 정보가 표시됩니다.
        </div>
      );
    }

    if ("name" in selectedItem) {
      // 작업자
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedItem.role} ({selectedItem.location})
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                selectedItem.location === "B구역" &&
                  "border-yellow-500 text-yellow-700 bg-yellow-50"
              )}
            >
              {selectedItem.location}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">위치</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedItem.location}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">근무 시간</div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {selectedItem.workHours}시간
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">심박수</div>
              <div className="flex items-center gap-2">
                <Heart
                  className={cn(
                    "h-4 w-4",
                    selectedItem.heartRate > 90 && "text-red-500"
                  )}
                />
                {selectedItem.heartRate} bpm
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">체온</div>
              <div className="flex items-center gap-2">
                <Thermometer
                  className={cn(
                    "h-4 w-4",
                    selectedItem.temperature > 37 && "text-red-500"
                  )}
                />
                {selectedItem.temperature}°C
              </div>
            </div>
          </div>
        </div>
      );
    } else if ("lastMotion" in selectedItem) {
      // 카메라
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedItem.id}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedItem.type} ({selectedItem.resolution})
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                selectedItem.status === "offline" &&
                  "border-gray-500 text-gray-700 bg-gray-50"
              )}
            >
              {selectedItem.status === "online" ? "온라인" : "오프라인"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">위치</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedItem.location}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">마지막 움직임</div>
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                {selectedItem.lastMotion}
              </div>
            </div>
          </div>
          {selectedItem.status === "online" && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                실시간 스트리밍
              </div>
              <div className="relative aspect-video rounded-lg border overflow-hidden bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/cctv.gif"
                    alt="카메라 스트리밍"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/50 rounded px-2 py-1 z-10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-white">LIVE</span>
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 rounded px-2 py-1">
                    {selectedItem.resolution}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // 센서
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{selectedItem.id}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedItem.type}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                selectedItem.status === "warning" &&
                  "border-yellow-500 text-yellow-700 bg-yellow-50"
              )}
            >
              {selectedItem.status === "normal" ? "정상" : "주의"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">위치</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedItem.location}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">배터리</div>
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4" />
                {selectedItem.batteryLevel}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">온도</div>
              <div className="flex items-center gap-2">
                <Thermometer
                  className={cn(
                    "h-4 w-4",
                    selectedItem.temperature > 30 && "text-red-500"
                  )}
                />
                {selectedItem.temperature}°C
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">습도</div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                {selectedItem.humidity}%
              </div>
            </div>
            <div className="col-span-2 space-y-2">
              <div className="text-sm text-muted-foreground">유해가스</div>
              <div className="flex items-center gap-2">
                <Wind
                  className={cn(
                    "h-4 w-4",
                    selectedItem.gasLevel === "주의" && "text-yellow-500"
                  )}
                />
                {selectedItem.gasLevel}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // 마커 렌더링 함수 추가
  const renderMarkers = () => {
    const filteredWorkers =
      mapSelectedArea === "all"
        ? workersWithPosition
        : workersWithPosition.filter((w) =>
            w.location.includes(mapSelectedArea)
          );

    const filteredCameras =
      mapSelectedArea === "all"
        ? camerasWithPosition
        : camerasWithPosition.filter((c) =>
            c.location.includes(mapSelectedArea)
          );

    const filteredSensors =
      mapSelectedArea === "all"
        ? sensorsWithPosition
        : sensorsWithPosition.filter((s) =>
            s.location.includes(mapSelectedArea)
          );

    return (
      <>
        {/* 작업자 마커 */}
        {filteredWorkers.map((worker) => (
          <div
            key={worker.id}
            className="group relative"
            style={{
              position: "absolute",
              left: `${worker.position.x}%`,
              top: `${worker.position.y}%`,
            }}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-125 ring-2 ring-white shadow-lg",
                worker.location === "B구역" ? "bg-yellow-500" : "bg-green-500",
                selectedItem?.id === worker.id && "ring-4 ring-blue-500"
              )}
              onClick={() => handleItemClick(worker)}
            >
              <Users className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* 호버 시 정보 표시 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-xl">
              <div>{worker.name}</div>
              <div className="text-gray-300">{worker.role}</div>
            </div>
          </div>
        ))}

        {/* 카메라 마커 */}
        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className="group relative"
            style={{
              position: "absolute",
              left: `${camera.position.x}%`,
              top: `${camera.position.y}%`,
            }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-125 bg-white/20 backdrop-blur-sm ring-2 shadow-lg",
                camera.status === "online"
                  ? "ring-green-500 text-green-500"
                  : "ring-gray-500 text-gray-500",
                selectedItem?.id === camera.id && "ring-4 ring-blue-500"
              )}
              onClick={() => handleItemClick(camera)}
            >
              <Camera className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* 호버 시 정보 표시 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-xl">
              <div>{camera.id}</div>
              <div className="text-gray-300">{camera.type}</div>
            </div>
          </div>
        ))}

        {/* 센서 마커 */}
        {filteredSensors.map((sensor) => (
          <div
            key={sensor.id}
            className="group relative"
            style={{
              position: "absolute",
              left: `${sensor.position.x}%`,
              top: `${sensor.position.y}%`,
            }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all group-hover:scale-125 bg-white/20 backdrop-blur-sm ring-2 shadow-lg",
                sensor.status === "normal"
                  ? "ring-green-500 text-green-500"
                  : "ring-yellow-500 text-yellow-500",
                selectedItem?.id === sensor.id && "ring-4 ring-blue-500"
              )}
              onClick={() => handleItemClick(sensor)}
            >
              <Cpu className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* 호버 시 정보 표시 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-xl">
              <div>{sensor.id}</div>
              <div className="text-gray-300">{sensor.type}</div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-4rem)] gap-6 p-6">
        {/* 좌측 리스트 패널 */}
        <div className="w-1/4 min-w-[300px] space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="검색" className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <RadioGroup
            defaultValue="all"
            className="grid grid-cols-4"
            onValueChange={setSelectedType}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <label htmlFor="all" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" />
                <span className="text-sm">전체</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="workers" id="workers" />
              <label htmlFor="workers" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">작업자</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cameras" id="cameras" />
              <label htmlFor="cameras" className="flex items-center gap-1">
                <Camera className="h-4 w-4" />
                <span className="text-sm">카메라</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sensors" id="sensors" />
              <label htmlFor="sensors" className="flex items-center gap-1">
                <Cpu className="h-4 w-4" />
                <span className="text-sm">센서</span>
              </label>
            </div>
          </RadioGroup>

          <Card>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {selectedType === "workers" && "작업자 목록"}
                  {selectedType === "cameras" && "카메라 목록"}
                  {selectedType === "sensors" && "센서 목록"}
                  {selectedType === "all" && "전체 목록"}
                </CardTitle>
                <Select
                  value={selectedArea}
                  onValueChange={handlePanelAreaChange}
                >
                  <SelectTrigger className="h-8 w-[110px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">전체 구역</SelectItem>
                    <SelectItem value="A">A구역</SelectItem>
                    <SelectItem value="B">B구역</SelectItem>
                    <SelectItem value="C">C구역</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-2">
                  {getFilteredItems().map((item) => {
                    if ("name" in item) {
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                        >
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div
                                className={cn(
                                  "flex items-center gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer",
                                  item.location === "B구역"
                                    ? "bg-yellow-50"
                                    : "bg-green-50"
                                )}
                              >
                                <div
                                  className={cn(
                                    "h-2 w-2 rounded-full",
                                    item.location === "B구역"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                  )}
                                />
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium">
                                      {item.name}
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-xs",
                                        item.location === "B구역" &&
                                          "border-yellow-500 text-yellow-700 bg-yellow-50"
                                      )}
                                    >
                                      {item.location}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Heart
                                      className={cn(
                                        "h-3 w-3",
                                        item.heartRate > 90
                                          ? "text-red-500"
                                          : "text-muted-foreground"
                                      )}
                                    />
                                    {item.heartRate} bpm
                                    <Thermometer
                                      className={cn(
                                        "h-3 w-3 ml-2",
                                        item.temperature > 37
                                          ? "text-red-500"
                                          : "text-muted-foreground"
                                      )}
                                    />
                                    {item.temperature}°C
                                  </div>
                                </div>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 bg-white">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">
                                  {item.name}
                                </h4>
                                <div className="text-sm text-muted-foreground">
                                  {item.role} ({item.location})
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <MapPin className="h-3 w-3" />
                                      현재 위치
                                    </div>
                                    <div>{item.location}</div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Heart className="h-3 w-3" />
                                      심박수
                                    </div>
                                    <div>{item.heartRate} bpm</div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Thermometer className="h-3 w-3" />
                                      체온
                                    </div>
                                    <div>{item.temperature}°C</div>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      근무 시간
                                    </div>
                                    <div>{item.workHours}시간</div>
                                  </div>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      );
                    } else if ("lastMotion" in item) {
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                        >
                          <div
                            className={cn(
                              "flex items-center gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer",
                              item.status === "offline" && "bg-gray-50"
                            )}
                          >
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                item.status === "online"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                              )}
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{item.id}</div>
                                <Badge variant="outline" className="text-xs">
                                  {item.location}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Wifi
                                  className={cn(
                                    "h-3 w-3",
                                    item.status === "online"
                                      ? "text-green-500"
                                      : "text-gray-500"
                                  )}
                                />
                                {item.status === "online"
                                  ? "온라인"
                                  : "오프라인"}
                                <Video className="h-3 w-3 ml-2" />
                                {item.lastMotion}
                                <span className="ml-2">{item.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleItemClick(item)}
                        >
                          <div
                            className={cn(
                              "flex items-center gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer",
                              item.status === "warning" && "bg-yellow-50"
                            )}
                          >
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full",
                                item.status === "normal"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              )}
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">{item.id}</div>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    item.status === "warning" &&
                                      "border-yellow-500 text-yellow-700 bg-yellow-50"
                                  )}
                                >
                                  {item.location}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Thermometer
                                    className={cn(
                                      "h-3 w-3",
                                      item.temperature > 30
                                        ? "text-red-500"
                                        : "text-muted-foreground"
                                    )}
                                  />
                                  {item.temperature}°C
                                </div>
                                <div className="flex items-center gap-1">
                                  <Droplets className="h-3 w-3" />
                                  {item.humidity}%
                                </div>
                                <div className="flex items-center gap-1">
                                  <Wind
                                    className={cn(
                                      "h-3 w-3",
                                      item.gasLevel === "주의"
                                        ? "text-yellow-500"
                                        : "text-muted-foreground"
                                    )}
                                  />
                                  {item.gasLevel}
                                </div>
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <Battery className="h-3 w-3" />
                                배터리 {item.batteryLevel}%
                                <span className="ml-2">{item.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* 우측 지도 및 상세 정보 */}
        <div className="flex-1 space-y-6 pb-24">
          {/* 지도 영역 */}
          <Card className="h-[calc(100vh-6rem)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>현장 지도</CardTitle>
                <div className="flex items-center gap-2">
                  <Select
                    value={mapSelectedArea}
                    onValueChange={handleMapAreaChange}
                  >
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">전체 구역</SelectItem>
                      <SelectItem value="A">A구역</SelectItem>
                      <SelectItem value="B">B구역</SelectItem>
                      <SelectItem value="C">C구역</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">모든 대상</SelectItem>
                      <SelectItem value="workers">작업자</SelectItem>
                      <SelectItem value="cameras">카메라</SelectItem>
                      <SelectItem value="sensors">센서</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-[500px] rounded-lg border relative overflow-hidden">
                <Image
                  src="/map.png"
                  alt="현장 지도"
                  fill
                  className="object-cover"
                  priority
                />
                {/* 마커 오버레이 */}
                <div className="absolute inset-0">{renderMarkers()}</div>
              </div>
              <div className="rounded-lg border p-4">{renderAreaInfo()}</div>
            </CardContent>
          </Card>

          {/* 하단 상세 정보 패널 */}
          <Card>
            <CardHeader>
              <CardTitle>상세 정보</CardTitle>
              <CardDescription>
                선택한 대상의 상세 정보를 확인할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>{renderDetailInfo()}</CardContent>
          </Card>
        </div>
      </div>

      {/* 메시지 전송 다이얼로그 */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>메시지 전송</DialogTitle>
            <DialogDescription>
              메시지를 전송할 작업자를 선택하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              {getAreaWorkers(mapSelectedArea).map((worker) => (
                <div key={worker.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={worker.id}
                    checked={selectedWorkers.includes(worker.id)}
                    onCheckedChange={(checked) => {
                      setSelectedWorkers(
                        checked
                          ? [...selectedWorkers, worker.id]
                          : selectedWorkers.filter((id) => id !== worker.id)
                      );
                    }}
                  />
                  <label
                    htmlFor={worker.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {worker.name} ({worker.role})
                  </label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                메시지 내용
              </label>
              <Textarea
                id="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="메시지를 입력하세요..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={selectedWorkers.length === 0 || !messageText.trim()}
              onClick={handleSendMessage}
            >
              메시지 전송
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 미팅 시작 다이얼로그 */}
      <Dialog open={meetingDialogOpen} onOpenChange={setMeetingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>화상 미팅</DialogTitle>
            <DialogDescription>
              미팅에 참여할 작업자를 선택하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              {getAreaWorkers(mapSelectedArea).map((worker) => (
                <div key={worker.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`meeting-${worker.id}`}
                    checked={selectedWorkers.includes(worker.id)}
                    onCheckedChange={(checked) => {
                      setSelectedWorkers(
                        checked
                          ? [...selectedWorkers, worker.id]
                          : selectedWorkers.filter((id) => id !== worker.id)
                      );
                    }}
                  />
                  <label
                    htmlFor={`meeting-${worker.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {worker.name} ({worker.role})
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={selectedWorkers.length === 0}
              onClick={handleStartMeeting}
            >
              미팅 시작
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 전화 연결 다이얼로그 */}
      <Dialog open={callDialogOpen} onOpenChange={setCallDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>전화 연결</DialogTitle>
            <DialogDescription>통화할 작업자를 선택하세요.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              {getAreaWorkers(mapSelectedArea).map((worker) => (
                <div key={worker.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`call-${worker.id}`}
                    checked={selectedWorkers.includes(worker.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedWorkers([worker.id]);
                      } else {
                        setSelectedWorkers([]);
                      }
                    }}
                  />
                  <label
                    htmlFor={`call-${worker.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {worker.name} ({worker.role})
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={selectedWorkers.length === 0}
              onClick={handleStartCall}
            >
              전화 연결
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
