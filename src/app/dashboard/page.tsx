import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Activity, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  MapPin,
  Camera,
  Cpu,
  HardHat,
  Wifi,
  Thermometer,
  Wind,
  Volume2,
  Briefcase,
  Heart,
  Battery,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">종합 현황</h1>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          업데이트
        </Button>
      </div>
      {/* 긴급 알림 배너 */}
      <Alert variant="destructive" className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          ⚡ 2건의 긴급 상황 발생! (1건 낙상, 1건 고온 경고)
        </AlertDescription>
      </Alert>

      {/* 작업자 상태 카드 그리드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 작업자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150명</div>
            <p className="text-xs text-muted-foreground">정상: 147명 (98%)</p>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">위험 알림</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2명</div>
            <p className="text-xs text-red-600">낙상 1건, 고온 경고 1건</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">위치 이탈</CardTitle>
            <MapPin className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1명</div>
            <p className="text-xs text-yellow-600">허가되지 않은 구역 진입</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">장비 상태</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">170대</div>
            <p className="text-xs text-muted-foreground">정상 가동률 97%</p>
          </CardContent>
        </Card>
      </div>

      {/* 최근 이벤트 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 이벤트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "09:10",
                type: "낙상 감지",
                detail: "작업자 ID#332",
                severity: "high",
              },
              {
                time: "08:45",
                type: "가스 농도 상승",
                detail: "구역 B-5",
                severity: "medium",
              },
              {
                time: "08:30",
                type: "Meraki MV 연결 끊김",
                detail: "구역 A-2",
                severity: "low",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg border"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    event.severity === "high"
                      ? "bg-red-500"
                      : event.severity === "medium"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="text-sm font-medium">{event.time}</div>
                <div className="flex-1">
                  <div className="font-medium">{event.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 작업자 실시간 상태 */}
      <Card>
        <CardHeader>
          <CardTitle>작업자 실시간 상태</CardTitle>
          <CardDescription>
            현장 작업자들의 실시간 상태를 확인하실 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "김철수",
                id: "W328",
                role: "용접공",
                location: "A구역 (용접 작업장)",
                status: "정상",
                heartRate: 85,
                temperature: 36.5,
                battery: 75,
                alerts: 0,
                statusType: "normal",
              },
              {
                name: "이영희",
                id: "W415",
                role: "도장공",
                location: "C구역 (도장 작업장)",
                status: "주의",
                heartRate: 95,
                temperature: 37.2,
                battery: 45,
                alerts: 1,
                statusType: "warning",
              },
              {
                name: "박민수",
                id: "W291",
                role: "전기공",
                location: "B구역 (자재 적재장)",
                status: "정상",
                heartRate: 82,
                temperature: 36.7,
                battery: 90,
                alerts: 0,
                statusType: "normal",
              },
            ].map((worker) => (
              <div
                key={worker.id}
                className={cn(
                  "p-4 rounded-lg border",
                  worker.statusType === "warning" &&
                    "border-yellow-500 bg-yellow-50"
                )}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{worker.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{worker.name}</span>
                        <span className="text-sm text-muted-foreground">
                          #{worker.id}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "text-sm px-2 py-1 rounded",
                          worker.statusType === "normal"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {worker.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.role}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{worker.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            worker.heartRate > 90
                              ? "text-red-500"
                              : "text-muted-foreground"
                          )}
                        />
                        <span>심박수: {worker.heartRate}bpm</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Thermometer
                          className={cn(
                            "h-4 w-4",
                            worker.temperature > 37
                              ? "text-red-500"
                              : "text-muted-foreground"
                          )}
                        />
                        <span>체온: {worker.temperature}°C</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Battery
                          className={cn(
                            "h-4 w-4",
                            worker.battery < 50
                              ? "text-yellow-500"
                              : "text-muted-foreground"
                          )}
                        />
                        <span>배터리: {worker.battery}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Bell
                          className={cn(
                            "h-4 w-4",
                            worker.alerts > 0
                              ? "text-red-500"
                              : "text-muted-foreground"
                          )}
                        />
                        <span>알림: {worker.alerts}건</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 장비 상태 및 시스템 상태 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>장비 상태 모니터링</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>MV 카메라</span>
                </div>
                <span className="text-muted-foreground">43/45대 온라인</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>Asset Vision 센서</span>
                </div>
                <span className="text-muted-foreground">120/123개 정상</span>
              </div>
              <Progress value={97} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <HardHat className="h-4 w-4" />
                  <span>스마트 안전모</span>
                </div>
                <span className="text-muted-foreground">145/150개 정상</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>시스템 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <span>Cisco Webex 연결 상태</span>
              </div>
              <span className="text-green-500">정상</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span>API 서버 응답 속도</span>
              </div>
              <span className="text-green-500">110ms</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <span>LoRaWAN 게이트웨이</span>
              </div>
              <span className="text-green-500">정상</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>작업 구역 상태</CardTitle>
            <CardDescription>
              주요 작업 구역별 현재 상태를 확인하실 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  zone: "A구역 (용접 작업장)",
                  workers: 12,
                  temperature: 28.5,
                  gas: "정상",
                  noise: 75,
                  status: "normal",
                },
                {
                  zone: "B구역 (자재 적재장)",
                  workers: 8,
                  temperature: 32.1,
                  gas: "주의",
                  noise: 68,
                  status: "warning",
                },
                {
                  zone: "C구역 (도장 작업장)",
                  workers: 5,
                  temperature: 27.8,
                  gas: "정상",
                  noise: 72,
                  status: "normal",
                },
              ].map((zone) => (
                <div
                  key={zone.zone}
                  className={cn(
                    "p-4 rounded-lg border",
                    zone.status === "warning" &&
                      "border-yellow-500 bg-yellow-50"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{zone.zone}</div>
                    <div
                      className={cn(
                        "text-sm px-2 py-1 rounded",
                        zone.status === "normal"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {zone.status === "normal" ? "정상" : "주의"}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>작업자: {zone.workers}명</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span>온도: {zone.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-muted-foreground" />
                      <span>유해가스: {zone.gas}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <span>소음: {zone.noise}dB</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>작업자 위치 변동</CardTitle>
            <CardDescription>
              작업자들의 최근 위치 변동 사항을 확인하실 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  worker: "김철수",
                  id: "W328",
                  from: "A구역",
                  to: "B구역",
                  time: "14:23",
                  status: "approved",
                },
                {
                  worker: "이영희",
                  id: "W415",
                  from: "C구역",
                  to: "제한구역",
                  time: "14:15",
                  status: "warning",
                },
                {
                  worker: "박민수",
                  id: "W291",
                  from: "B구역",
                  to: "휴게실",
                  time: "14:05",
                  status: "approved",
                },
              ].map((log) => (
                <div
                  key={log.time}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg border",
                    log.status === "warning" && "border-yellow-500 bg-yellow-50"
                  )}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{log.worker[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{log.worker}</span>
                      <span className="text-sm text-muted-foreground">
                        #{log.id}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {log.from} → {log.to}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {log.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
