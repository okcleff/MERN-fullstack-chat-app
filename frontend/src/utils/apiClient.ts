// 모든 API 응답은 { result, data, message } 형태로 통일되어 있다.
interface IApiResponse<T> {
  result: boolean;
  data?: T;
  message?: string;
}

/**
 * fetch + JSON 파싱 + result 체크를 한곳에서 처리하는 래퍼.
 * 성공 시 응답의 data를 반환하고, 실패 시 message를 담은 Error를 던진다.
 */
export async function apiClient<T = void>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const body: IApiResponse<T> = await res.json();

  if (!body.result) {
    throw new Error(body.message || 'An unknown error occurred');
  }

  return body.data as T;
}

/** 에러 객체에서 사용자에게 보여줄 메시지를 안전하게 추출한다. */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'An unknown error occurred';
}
