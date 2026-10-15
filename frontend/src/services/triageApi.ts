export interface TriageResponse {
  concepts: string[];
  care_level: string;
  care_guidance: string;
  pattern: string;
  pattern_suppressed: boolean;
  triggered_red_flags: string[];
  red_flag_concepts: string[];
  low_confidence: boolean;
  summary_lines: string[];
  doctor_questions: string[];
  disclaimer: string;
}

const backendUrl = (
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '')
).replace(/\/+$/, '');

function isTriageResponse(value: unknown): value is TriageResponse {
  if (!value || typeof value !== 'object') return false;
  const response = value as Record<string, unknown>;
  return (
    Array.isArray(response.concepts) &&
    response.concepts.every((item) => typeof item === 'string') &&
    typeof response.care_level === 'string' &&
    typeof response.care_guidance === 'string' &&
    typeof response.pattern === 'string' &&
    typeof response.pattern_suppressed === 'boolean' &&
    Array.isArray(response.triggered_red_flags) &&
    response.triggered_red_flags.every((item) => typeof item === 'string') &&
    Array.isArray(response.red_flag_concepts) &&
    response.red_flag_concepts.every((item) => typeof item === 'string') &&
    typeof response.low_confidence === 'boolean' &&
    Array.isArray(response.summary_lines) &&
    response.summary_lines.every((item) => typeof item === 'string') &&
    Array.isArray(response.doctor_questions) &&
    response.doctor_questions.every((item) => typeof item === 'string') &&
    typeof response.disclaimer === 'string'
  );
}

export async function requestTriage(
  text: string,
  lang: string,
  signal?: AbortSignal,
): Promise<TriageResponse> {
  if (!backendUrl) {
    throw new Error('The symptom service is not configured. Set the VITE_BACKEND_URL deployment variable.');
  }

  const response = await fetch(`${backendUrl}/triage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
    signal,
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error('The backend returned an unreadable response.');
  }

  if (!response.ok) {
    const detail =
      payload && typeof payload === 'object' && 'detail' in payload
        ? (payload as { detail: unknown }).detail
        : undefined;
    throw new Error(
      typeof detail === 'string'
        ? detail
        : `Backend request failed (${response.status}).`,
    );
  }

  if (!isTriageResponse(payload)) {
    throw new Error('The backend response did not match the expected triage format.');
  }

  return payload;
}
