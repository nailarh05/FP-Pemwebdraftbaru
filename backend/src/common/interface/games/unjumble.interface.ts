import { CheckAnswerSchema } from '@/api/game/game-list/quiz/schema';

export interface UnjumblePuzzle {
  id: string;
  jumbled: string;
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

export interface IUnjumbleJson {
  score_per_sentence: number;
  is_randomized: boolean;
  sentences: Array<{
    sentence_text: string;
    sentence_image: string | null;
  }>;
}