import { CheckAnswerSchema } from '@/api/game/game-list/quiz/schema';

export interface UnjumblePuzzle {
  id: string;
  jumbled: string;
  // optional original question text if available
  question?: string;
}

export interface UnjumbleCheckAnswerRequest {
  questionId: string;
  answer: string;
}

export interface UnjumbleCheckAnswerResponse {
  correct: boolean;
  score: number;
  status: boolean;
  message: string;
}
