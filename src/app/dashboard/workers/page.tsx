import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Phone,
  Video,
  Heart,
  Thermometer,
  Battery,
  MapPin,
  HardHat,
  AlertTriangle,
  Wind,
  Droplets,
  Activity,
  Calendar,
  Building,
  ChevronRight,
  Timer,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  BrainCircuit,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const workers = [
  {
    id: "W328",
    name: "김철수",
    role: "용접공",
    department: "생산팀",
    joinDate: "2022-03-15",
    contact: "010-1234-5678",
    location: "A구역 (용접 작업장)",
    status: "정상",
    heartRate: 85,
    temperature: 36.5,
    batteryLevel: 75,
    equipmentId: "H-2023-328",
    lastCheck: "2024-03-01",
    equipmentStatus: "정상",
    riskScore: 72,
    environmentData: {
      temperature: 28.5,
      humidity: 65,
      gasLevel: "정상",
    },
  },
  {
    id: "W415",
    name: "이영희",
    role: "도장공",
    department: "도장팀",
    joinDate: "2021-08-20",
    contact: "010-2345-6789",
    location: "C구역 (도장 작업장)",
    status: "주의",
    heartRate: 95,
    temperature: 37.2,
    batteryLevel: 45,
    equipmentId: "H-2023-415",
    lastCheck: "2024-02-28",
    equipmentStatus: "배터리 부족",
    riskScore: 85,
    environmentData: {
      temperature: 30.2,
      humidity: 70,
      gasLevel: "주의",
    },
  },
  // ... 더 많은 작업자 데이터 ...
];

const activityLogs = [
  {
    time: "14:30",
    type: "위치",
    description: "A구역에서 B구역으로 이동",
    severity: "normal",
  },
  {
    time: "13:15",
    type: "알림",
    description: "심박수 일시적 상승 (95bpm)",
    severity: "warning",
  },
  {
    time: "11:45",
    type: "장비",
    description: "안전모 배터리 충전 완료",
    severity: "normal",
  },
  {
    time: "10:30",
    type: "위치",
    description: "휴게실에서 A구역으로 이동",
    severity: "normal",
  },
  {
    time: "09:15",
    type: "알림",
    description: "작업 구역 고온 감지 (32°C)",
    severity: "warning",
  },
];

const riskFactors = [
  {
    name: "심박수 변화",
    score: 65,
    trend: "상승",
    description: "최근 30분간 10bpm 상승",
  },
  {
    name: "체온",
    score: 45,
    trend: "안정",
    description: "정상 범위 유지 중",
  },
  {
    name: "작업 환경",
    score: 85,
    trend: "위험",
    description: "고온 환경 지속 노출",
  },
  {
    name: "근로 시간",
    score: 70,
    trend: "주의",
    description: "연속 작업 4시간 경과",
  },
];

export default function WorkersPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] gap-6 p-6">
      {/* 작업자 목록 - 고정 */}
      <div className="w-1/3 min-w-[350px]">
        <div className="sticky top-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="작업자 검색" className="pl-8" />
            </div>
            <Button>작업자 추가</Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>작업자 목록</CardTitle>
              <CardDescription>
                전체 작업자 현황을 확인할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4">
                  {workers.map((worker) => (
                    <div
                      key={worker.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-accent",
                        worker.status === "주의" &&
                          "border-yellow-500 bg-yellow-50"
                      )}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{worker.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{worker.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {worker.role} · {worker.department}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 작업자 상세 정보 - 스크롤 */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        {/* 기본 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">김</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">김철수</h3>
                <p className="text-muted-foreground">용접공 · 생산팀</p>
              </div>
              <div className="ml-auto space-x-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  입사일
                </div>
                <div>2022-03-15</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  소속
                </div>
                <div>생산팀</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  연락처
                </div>
                <div>010-1234-5678</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 현재 상태 */}
        <Card>
          <CardHeader>
            <CardTitle>현재 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      현재 위치
                    </span>
                  </div>
                  <div className="font-medium">A구역 (용접 작업장)</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      심박수
                    </span>
                  </div>
                  <div className="font-medium">85 bpm</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">체온</span>
                  </div>
                  <div className="font-medium">36.5°C</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      주변 온도
                    </span>
                  </div>
                  <div className="font-medium">28.5°C</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">습도</span>
                  </div>
                  <div className="font-medium">65%</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      가스 농도
                    </span>
                  </div>
                  <div className="font-medium">정상</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 장비 정보 */}
        <Card>
          <CardHeader>
            <CardTitle>장비 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HardHat className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      스마트 안전모 ID
                    </span>
                  </div>
                  <div className="font-medium">H-2023-328</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      배터리 상태
                    </span>
                  </div>
                  <div className="font-medium">75%</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      최근 점검일
                    </span>
                  </div>
                  <div className="font-medium">2024-03-01</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      장비 상태
                    </span>
                  </div>
                  <div className="font-medium">정상</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 활동 기록 */}
        <Card>
          <CardHeader>
            <CardTitle>활동 기록</CardTitle>
            <CardDescription>
              최근 24시간 동안의 활동 기록입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {activityLogs.map((log, index) => (
                <div key={index} className="relative">
                  {index !== activityLogs.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="absolute left-[7px] top-[30px] h-[calc(100%+32px)] bg-muted"
                    />
                  )}
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "mt-1 h-4 w-4 rounded-full border",
                        log.severity === "warning"
                          ? "border-yellow-500 bg-yellow-100"
                          : "border-green-500 bg-green-100"
                      )}
                    />
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{log.time}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {log.type}
                        </span>
                      </div>
                      <p className="text-sm">{log.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI 위험 예측 */}
        <Card>
          <CardHeader>
            <CardTitle>AI 위험 예측</CardTitle>
            <CardDescription>
              실시간 데이터 기반 위험 예측 분석 결과입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 전체 위험 점수 */}
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-orange-500" />
                    <h4 className="font-medium">전체 위험 점수</h4>
                  </div>
                  <div className="text-2xl font-bold text-orange-500">
                    72/100
                  </div>
                </div>
                <Progress value={72} className="h-2" />
                <p className="mt-2 text-sm text-muted-foreground">
                  주의 수준의 위험도가 감지되었습니다.
                </p>
              </div>

              {/* AI 분석 결과 */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">위험 요소 분석</h4>
                </div>
                <div className="grid gap-4">
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium">{factor.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex items-center gap-1 rounded px-1.5 py-0.5 text-xs",
                              factor.trend === "위험"
                                ? "bg-red-100 text-red-700"
                                : factor.trend === "주의"
                                ? "bg-yellow-100 text-yellow-700"
                                : factor.trend === "상승"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            )}
                          >
                            <TrendingUp className="h-3 w-3" />
                            {factor.trend}
                          </span>
                          <span className="font-medium">{factor.score}점</span>
                        </div>
                      </div>
                      <Progress value={factor.score} className="h-1.5" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {factor.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 예측 및 권장사항 */}
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">향후 1시간 예측 및 권장사항</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 현재 작업 강도가 지속될 경우 피로도 증가 예상</li>
                  <li>• 30분 내 휴식 권장 (10분 이상)</li>
                  <li>• 수분 보충 필요</li>
                  <li>• 작업장 환기 시스템 가동 권장</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
