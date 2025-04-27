// Webex API 설정
const WEBEX_CONFIG = {
  clientId: "C766290fdffd9539e75ff9c99a2bdbc1fd883f732406aaba0ef83f1eeb1e95c00",
  clientSecret:
    "88e786410d8ff2711075eddcd62c994cc6e0ddaf38a8b185972a90d7df7479c9",
  redirectUri: "http://localhost:3000/callback",
  targetEmail: "32201345@dankook.ac.kr",
  authUrl: "https://webexapis.com/v1/authorize",
  tokenUrl: "https://webexapis.com/v1/access_token",
  apiBaseUrl: "https://webexapis.com/v1",
};

// 액세스 토큰 저장을 위한 키
const ACCESS_TOKEN_KEY = "webex_access_token";

// OAuth 인증 URL 생성
export const getAuthUrl = () => {
  const scopes = [
    "spark:kms",
    "meeting:schedules_read",
    "meeting:participants_read",
    "spark:people_read",
    "spark:messages_write",
    "meeting:participants_write",
    "spark:messages_read",
    "meeting:schedules_write",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: WEBEX_CONFIG.clientId,
    response_type: "code",
    redirect_uri: WEBEX_CONFIG.redirectUri,
    scope: scopes,
    state: "webex_auth_" + Date.now(),
  });

  return `${WEBEX_CONFIG.authUrl}?${params.toString()}`;
};

// 액세스 토큰 교환
export const exchangeCodeForToken = async (code: string) => {
  try {
    const response = await fetch(WEBEX_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: WEBEX_CONFIG.clientId,
        client_secret: WEBEX_CONFIG.clientSecret,
        code: code,
        redirect_uri: WEBEX_CONFIG.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const data = await response.json();
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Token exchange error:", error);
    throw error;
  }
};

// 미팅 생성
export const createMeeting = async (title: string) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    throw new Error("No access token found");
  }

  try {
    // 현재 시간 기준으로 30분 후까지의 미팅 설정
    const start = new Date();
    const end = new Date(start.getTime() + 30 * 60000); // 30분

    const response = await fetch(`${WEBEX_CONFIG.apiBaseUrl}/meetings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        start: start.toISOString(),
        end: end.toISOString(),
        enabledAutoRecordMeeting: false,
        invitees: [
          {
            email: WEBEX_CONFIG.targetEmail,
            coHost: false,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create meeting");
    }

    const meeting = await response.json();
    return meeting;
  } catch (error) {
    console.error("Meeting creation error:", error);
    throw error;
  }
};

// 전화 연결
export const startCall = async () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    throw new Error("No access token found");
  }

  try {
    // Webex 앱으로 직접 통화 연결
    const webexAppUrl = `webexteams://im?email=${WEBEX_CONFIG.targetEmail}`;
    window.location.href = webexAppUrl;

    // 통화 시작 성공을 반환
    return { success: true };
  } catch (error) {
    console.error("Call initiation error:", error);
    throw error;
  }
};

// 액세스 토큰 확인
export const hasValidAccessToken = () => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
};
