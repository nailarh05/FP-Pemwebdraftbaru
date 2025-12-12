/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import { Router, type Request, type Response, type NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

import {
  AuthedRequest,
  SuccessResponse,
  validateAuth,
  validateBody,
} from "@/common"

import { UnjumbleService, unjumbleService } from "./unjumble.service"
import {
  CreateUnjumbleSchema,
  type ICreateUnjumble,
  UpdateUnjumbleSchema,
  type IUpdateUnjumble,
} from "./schema"

import { GameService } from "@/api/game/game.service"
import {
  UpdatePublishStatusSchema,
  type IUpdatePublishStatus,
} from "@/api/game/schema"

export const UnjumbleController = Router()

  // ------------------------------- //
  // ADMIN AREA
  // ------------------------------- //

  .post(
    "/",
    validateAuth({}),
    validateBody({
      schema: CreateUnjumbleSchema,
      file_fields: [{ name: "thumbnail_image", maxCount: 1 }],
    }),
    async (
      req: AuthedRequest<{}, {}, ICreateUnjumble>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const newGame = await UnjumbleService.createUnjumble(
          req.body,
          req.user!.user_id
        )

        return res.status(StatusCodes.CREATED).json(
          new SuccessResponse(
            StatusCodes.CREATED,
            "Unjumble game created",
            newGame
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .put(
    "/:game_id",
    validateAuth({}),
    validateBody({
      schema: UpdateUnjumbleSchema,
      file_fields: [{ name: "thumbnail_image", maxCount: 1 }],
    }),
    async (
      req: AuthedRequest<{ game_id: string }, {}, IUpdateUnjumble>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const updated = await UnjumbleService.updateUnjumble(
          req.params.game_id,
          req.body,
          req.user!.user_id,
          req.user!.role
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Update game successfully",
            updated
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .patch(
    "/:game_id",
    validateAuth({}),
    validateBody({ schema: UpdatePublishStatusSchema }),
    async (
      req: AuthedRequest<{ game_id: string }, {}, IUpdatePublishStatus>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const updated = await GameService.updateGamePublishStatus(
          { ...req.body, game_id: req.params.game_id },
          req.user!.user_id,
          req.user!.role
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Update publish status successfully",
            updated
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .delete(
    "/:game_id",
    validateAuth({}),
    async (
      req: AuthedRequest<{ game_id: string }>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        await UnjumbleService.deleteUnjumble(
          req.params.game_id,
          req.user!.user_id,
          req.user!.role
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Delete game successfully",
            null
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .get(
    "/:game_id/edit",
    validateAuth({}),
    async (
      req: AuthedRequest<{ game_id: string }>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const game = await UnjumbleService.getUnjumbleById(
          req.params.game_id,
          req.user!.user_id
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Get game data for edit successfully",
            game
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  // ------------------------------- //
  // PLAYER AREA
  // ------------------------------- //

  .get(
    "/:game_id/play/public",
    async (req: Request<{ game_id: string }>, res: Response, next: NextFunction) => {
      try {
        const game = await UnjumbleService.getUnjumblePlay(
          req.params.game_id,
          true
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Game retrieved successfully",
            game
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .get(
    "/play/:game_id",
    async (req, res, next) => {
      try {
        const game = await UnjumbleService.getUnjumblePlay(
          req.params.game_id,
          true
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Game retrieved successfully",
            game
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .get(
    "/:game_id",
    async (req, res, next) => {
      try {
        const game = await UnjumbleService.getUnjumblePlay(
          req.params.game_id,
          true
        )

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Get unjumble game successfully",
            game
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .post(
    "/check-answer",
    async (req, res, next) => {
      try {
        const result = await unjumbleService.checkAnswer(req.body)

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Answer checked successfully",
            result
          ).json()
        )
      } catch (error) {
        next(error)
      }
    }
  )

  .post(
    "/play-count",
    validateAuth({ optional: true}),
    async (
      req: AuthedRequest<{}, {}, { game_id:string}>,
      res: Response, 
      next: NextFunction) => {
      try {
        const { game_id } = req.body;
        await GameService.updateGamePlayCount(game_id, req.user?.user_id);

        return res.status(StatusCodes.OK).json(
          new SuccessResponse(
            StatusCodes.OK,
            "Game play count updated",
            null
          ).json()
        );
      } catch (error) {
        next(error);
      }
    },
  );