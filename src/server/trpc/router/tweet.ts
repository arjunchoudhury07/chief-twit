import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const tweetRouter = router({
  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const tweets = await ctx.prisma.tweet.findMany({
        take: input.limit + 1,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (tweets.length > input.limit) {
        const nextItem = tweets.pop() as typeof tweets[number];
        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({ text: z.string({ required_error: "Tweet text is required" }) })
    )
    .mutation(({ input, ctx }) => {
      const { text } = input;
      const userId = ctx.session.user.id;
      return ctx.prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
