import { router } from '../index';
import { usersRouters } from "./users";
import { availabilityRouter } from "./availabilities";
import {bookingsRouter} from "./bookings";

export const appRouter = router({
    users: usersRouters,
    availabilities: availabilityRouter,
    bookings: bookingsRouter
});

export type AppRouter = typeof appRouter;