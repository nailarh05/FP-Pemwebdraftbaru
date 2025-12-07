import z from 'zod';

export const UpdatePublishStatusSchema = z.object({
  is_publish: z.boolean(),
});

export type IUpdatePublishStatusBody = z.infer<typeof UpdatePublishStatusSchema>;

export interface IUpdatePublishStatus extends IUpdatePublishStatusBody {
  game_id: string;
}
