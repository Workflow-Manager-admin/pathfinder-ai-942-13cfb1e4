//
// SkillBridge API Service: Strongly-typed wrapper for RESTful backend
// Uses fetch and DTOs matching the FastAPI backend OpenAPI schema
//

// ========================
// API URL setup: change as needed
// ========================
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vscode-internal-05548-beta.beta01.cloud.kavia.ai:3001";

// ========================
// TypeScript interfaces - match backend schemas, partials for PATCH
// ========================

// -------- Onboarding & Profile --------
export interface UserProfileCreateRequest {
  name: string;
  email: string;
  bio?: string | null;
  avatar_url?: string | null;
  interests?: string[];
  role?: string | null;
}
export interface UserProfileSchema {
  user_id: string;
  name: string;
  email: string;
  bio?: string | null;
  avatar_url?: string | null;
  interests?: string[];
  role?: string | null;
  created_at?: string | null;
}
export interface UserProfileUpdateRequest {
  name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  interests?: string[] | null;
  role?: string | null;
}

// -------- Onboarding Data --------
export interface OnboardingDataCreateRequest {
  user_id: string;
  goals: string[];
  prior_experience?: string | null;
  preferred_learning_style?: string | null;
  education_level?: string | null;
  additional_info?: string | null;
}
export interface OnboardingDataSchema {
  user_id: string;
  goals: string[];
  prior_experience?: string | null;
  preferred_learning_style?: string | null;
  education_level?: string | null;
  additional_info?: string | null;
}

// -------- Learning Paths --------
export interface LearningPathItemSchema {
  id: string;
  title: string;
  description?: string | null;
  resource_link?: string | null;
  order: number;
}
export interface LearningPathCreateRequest {
  user_id: string;
  name: string;
  summary?: string | null;
  items: LearningPathItemSchema[];
}
export interface LearningPathSchema {
  path_id: string;
  user_id: string;
  name: string;
  summary?: string | null;
  items: LearningPathItemSchema[];
  created_at?: string | null;
  updated_at?: string | null;
}

// -------- Project Ideas --------
export interface ProjectIdeaGenerateRequest {
  user_id: string;
  interests: string[];
  difficulty?: string | null;
  tags?: string[] | null;
}
export interface ProjectIdeaSchema {
  idea_id: string;
  user_id: string;
  title: string;
  description: string;
  technologies: string[];
  difficulty?: string | null;
  tags: string[];
  created_at?: string | null;
}

// -------- Chat --------
export interface ChatMessageCreateRequest {
  user_id: string;
  sender: string;
  content: string;
  context_type?: string | null;
  context_id?: string | null;
}
export interface ChatMessageSchema {
  message_id: string;
  user_id: string;
  sender: string;
  content: string;
  timestamp: string;
  context_type?: string | null;
  context_id?: string | null;
}

// =========================
// Utility for fetch with typed bodies/results
// =========================
async function fetchJson<T>(...args: Parameters<typeof fetch>): Promise<T> {
  const resp = await fetch(...args);
  if (!resp.ok) {
    let error;
    try { error = await resp.json(); } catch {
      error = { status: resp.status, message: resp.statusText };
    }
    throw error;
  }
  return resp.json();
}

// ====================================
// API functions by domain below
// ====================================

// PUBLIC_INTERFACE
/** Create user profile */
export async function createUserProfile(data: UserProfileCreateRequest): Promise<UserProfileSchema> {
  return fetchJson<UserProfileSchema>(`${API_BASE}/onboarding/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// PUBLIC_INTERFACE
/** Get user profile by user_id */
export async function getUserProfile(user_id: string): Promise<UserProfileSchema> {
  return fetchJson<UserProfileSchema>(`${API_BASE}/onboarding/profile/${encodeURIComponent(user_id)}`);
}

// PUBLIC_INTERFACE
/** Update user profile by user_id */
export async function updateUserProfile(user_id: string, data: UserProfileUpdateRequest): Promise<UserProfileSchema> {
  return fetchJson<UserProfileSchema>(`${API_BASE}/onboarding/profile/${encodeURIComponent(user_id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// PUBLIC_INTERFACE
/** Save onboarding data */
export async function saveOnboardingData(data: OnboardingDataCreateRequest): Promise<OnboardingDataSchema> {
  return fetchJson<OnboardingDataSchema>(`${API_BASE}/onboarding/data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// PUBLIC_INTERFACE
/** Get onboarding data for user */
export async function getOnboardingData(user_id: string): Promise<OnboardingDataSchema> {
  return fetchJson<OnboardingDataSchema>(`${API_BASE}/onboarding/data/${encodeURIComponent(user_id)}`);
}

// PUBLIC_INTERFACE
/** Create a custom learning path */
export async function createLearningPath(data: LearningPathCreateRequest): Promise<LearningPathSchema> {
  return fetchJson<LearningPathSchema>(`${API_BASE}/learning-paths/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// PUBLIC_INTERFACE
/** Get learning paths for user (array) */
export async function getLearningPaths(user_id: string): Promise<LearningPathSchema[]> {
  return fetchJson<LearningPathSchema[]>(`${API_BASE}/learning-paths/${encodeURIComponent(user_id)}`);
}

// PUBLIC_INTERFACE
/** Get a mock/sample learning path for user */
export async function getSampleLearningPath(user_id: string): Promise<LearningPathSchema> {
  return fetchJson<LearningPathSchema>(`${API_BASE}/learning-paths/mock/sample/${encodeURIComponent(user_id)}`);
}

// PUBLIC_INTERFACE
/** Generate personalized project ideas */
export async function generateProjectIdeas(data: ProjectIdeaGenerateRequest): Promise<ProjectIdeaSchema[]> {
  return fetchJson<ProjectIdeaSchema[]>(`${API_BASE}/project-ideas/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// PUBLIC_INTERFACE
/** Get non-personalized (generic) project ideas */
export async function getGenericProjectIdeas(): Promise<ProjectIdeaSchema[]> {
  return fetchJson<ProjectIdeaSchema[]>(`${API_BASE}/project-ideas/generic`);
}

/**
 * Dashboard summary result type for user.
 * The backend returns a JSON object with arbitrary string keys and values
 * which can be string, number, boolean, array, object, or null,
 * but cannot use `any`. This type ensures strict typing.
 */
export type DashboardSummaryResult = {
  [key: string]: string | number | boolean | null | unknown[] | { [key: string]: unknown };
};

// PUBLIC_INTERFACE
/** Get dashboard summary for user */
export async function getDashboardSummary(user_id: string): Promise<DashboardSummaryResult> {
  return fetchJson<DashboardSummaryResult>(`${API_BASE}/dashboard/summary/${encodeURIComponent(user_id)}`);
}

// PUBLIC_INTERFACE
/** Get recent chat history for a user */
export async function getChatHistory(user_id: string): Promise<ChatMessageSchema[]> {
  return fetchJson<ChatMessageSchema[]>(`${API_BASE}/chat/history/${encodeURIComponent(user_id)}`);
}

// PUBLIC_INTERFACE
/** Send a message to assistant (chat) */
export async function sendChatMessage(data: ChatMessageCreateRequest): Promise<ChatMessageSchema> {
  return fetchJson<ChatMessageSchema>(`${API_BASE}/chat/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
