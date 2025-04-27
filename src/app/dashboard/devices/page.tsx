"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Camera,
  Cpu,
  HardHat,
  Battery,
  Signal,
  ThermometerSun,
  Wind,
  Droplets,
  Heart,
  AlertTriangle,
  Search,
  Download,
  Filter,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// 장치 타입 정의
type DeviceStatus = "normal" | "offline" | "warning" | "maintenance";
type DeviceType = "camera" | "sensor" | "helmet";

interface BaseDevice {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  location: string;
  lastActive: string;
  batteryLevel?: number;
}

interface Camera extends BaseDevice {
  type: "camera";
  streamingStatus: "active" | "inactive";
  lastMotion: string;
  firmwareVersion: string;
  coordinates: { x: number; y: number };
}

interface Sensor extends BaseDevice {
  type: "sensor";
  temperature: number;
  humidity: number;
  gasLevel: string;
  lorawanStatus: "connected" | "disconnected";
  lastInspection: string;
}

interface SmartHelmet extends BaseDevice {
  type: "helmet";
  wearer: string;
  heartRate: number;
  temperature: number;
  fallDetected: boolean;
  lastInspection: string;
}

type Device = Camera | Sensor | SmartHelmet;

// 샘플 데이터
const sampleDevices: Device[] = [
  {
    id: "MV-001",
    name: "정문 카메라",
    type: "camera",
    status: "normal",
    location: "정문",
    lastActive: "방금 전",
    streamingStatus: "active",
    lastMotion: "1분 전",
    firmwareVersion: "2.1.0",
    coordinates: { x: 127.5, y: 36.8 },
  },
  {
    id: "MV-002",
    name: "작업장 A구역 카메라",
    type: "camera",
    status: "offline",
    location: "작업장 A구역",
    lastActive: "3시간 전",
    streamingStatus: "inactive",
    lastMotion: "3시간 전",
    firmwareVersion: "2.1.0",
    coordinates: { x: 127.6, y: 36.9 },
  },
  {
    id: "AV-001",
    name: "작업장 환경센서 1",
    type: "sensor",
    status: "warning",
    location: "작업장 B구역",
    lastActive: "방금 전",
    batteryLevel: 15,
    temperature: 32.5,
    humidity: 65,
    gasLevel: "주의",
    lorawanStatus: "connected",
    lastInspection: "2024-03-01",
  },
  {
    id: "AV-002",
    name: "창고 환경센서",
    type: "sensor",
    status: "normal",
    location: "창고",
    lastActive: "1분 전",
    batteryLevel: 85,
    temperature: 25.5,
    humidity: 45,
    gasLevel: "정상",
    lorawanStatus: "connected",
    lastInspection: "2024-03-10",
  },
  {
    id: "SH-001",
    name: "안전모 1_김철수",
    type: "helmet",
    status: "normal",
    location: "작업장 A구역",
    lastActive: "방금 전",
    batteryLevel: 90,
    wearer: "김철수",
    heartRate: 75,
    temperature: 36.5,
    fallDetected: false,
    lastInspection: "2024-03-15",
  },
  {
    id: "SH-002",
    name: "안전모 2_이영희",
    type: "helmet",
    status: "warning",
    location: "작업장 B구역",
    lastActive: "방금 전",
    batteryLevel: 30,
    wearer: "이영희",
    heartRate: 95,
    temperature: 37.2,
    fallDetected: true,
    lastInspection: "2024-03-15",
  },
];

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // 장치 필터링
  const filteredDevices = sampleDevices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "all" || device.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || device.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // 상태에 따른 배지 스타일
  const getStatusBadgeStyle = (status: DeviceStatus) => {
    switch (status) {
      case "normal":
        return "bg-green-500 hover:bg-green-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "offline":
        return "bg-gray-500 hover:bg-gray-600";
      case "maintenance":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "";
    }
  };

  // 장치 타입에 따른 아이콘
  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case "camera":
        return <Camera className="h-4 w-4" />;
      case "sensor":
        return <Cpu className="h-4 w-4" />;
      case "helmet":
        return <HardHat className="h-4 w-4" />;
    }
  };

  // 장치 상세 정보 렌더링
  const renderDeviceDetails = (device: Device) => {
    switch (device.type) {
      case "camera":
        return (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-blue-500" />
              {device.streamingStatus === "active"
                ? "스트리밍 중"
                : "스트리밍 중지"}
            </div>
            <div>최근 움직임: {device.lastMotion}</div>
          </div>
        );
      case "sensor":
        return (
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4 text-red-500" />
              {device.temperature}°C
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              {device.humidity}%
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              {device.gasLevel}
            </div>
          </div>
        );
      case "helmet":
        return (
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Heart
                className={cn(
                  "h-4 w-4",
                  device.heartRate > 90 ? "text-red-500" : "text-gray-500"
                )}
              />
              {device.heartRate} bpm
            </div>
            <div className="flex items-center gap-2">
              <ThermometerSun
                className={cn(
                  "h-4 w-4",
                  device.temperature > 37 ? "text-red-500" : "text-gray-500"
                )}
              />
              {device.temperature}°C
            </div>
            {device.fallDetected && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-4 w-4" />
                낙상 감지
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* 상단 필터 영역 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="장치 검색 (이름, ID, 위치)"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="장치 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 장치</SelectItem>
            <SelectItem value="camera">카메라</SelectItem>
            <SelectItem value="sensor">센서</SelectItem>
            <SelectItem value="helmet">안전모</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="normal">정상</SelectItem>
            <SelectItem value="warning">경고</SelectItem>
            <SelectItem value="offline">오프라인</SelectItem>
            <SelectItem value="maintenance">점검 중</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <RefreshCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* 장치 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>장치 목록</CardTitle>
          <CardDescription>
            전체 {sampleDevices.length}개 중 {filteredDevices.length}개 표시
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상태</TableHead>
                <TableHead>장치 정보</TableHead>
                <TableHead>위치</TableHead>
                <TableHead>배터리</TableHead>
                <TableHead>상세 정보</TableHead>
                <TableHead>최근 활동</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <Badge className={getStatusBadgeStyle(device.status)}>
                      {device.status === "normal" && "정상"}
                      {device.status === "warning" && "경고"}
                      {device.status === "offline" && "오프라인"}
                      {device.status === "maintenance" && "점검 중"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device.type)}
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {device.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>
                    {device.batteryLevel !== undefined && (
                      <div className="flex items-center gap-2">
                        <Battery
                          className={cn(
                            "h-4 w-4",
                            device.batteryLevel < 20
                              ? "text-red-500"
                              : device.batteryLevel < 50
                              ? "text-yellow-500"
                              : "text-green-500"
                          )}
                        />
                        {device.batteryLevel}%
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{renderDeviceDetails(device)}</TableCell>
                  <TableCell>{device.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
