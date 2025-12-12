/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import { Router } from 'express';

import { QuizController } from './quiz/quiz.controller';
import { UnjumbleController } from './unjumble/unjumble.controller';


const GameListRouter = Router();

GameListRouter.use('/quiz', QuizController);
GameListRouter.use('/unjumble', UnjumbleController);

export default GameListRouter;
