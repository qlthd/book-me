import { router } from '../index';
import { usersRouters } from "./users";
import { availabilityRouter } from "./availabilities";

export const appRouter = router({
    users: usersRouters,
    availabilities: availabilityRouter,
});

export type AppRouter = typeof appRouter;