export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  symptoms: string;
  medicalHistory: string;
}

export interface Conversation {
  id: string;
  timestamp: string;
  message_count: number;
  patient_info: PatientInfo;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
}

export interface ConversationData {
  conversation_id: string;
  timestamp: string;
  patient_info: PatientInfo;
  messages: Message[];
}

export interface ApiError {
  error: string;
}