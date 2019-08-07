import authRoutes from './auth.controller';
import imageRouters from "./image.controller";
import movieRouter from './movie.controller';
import eventRouter from './event.controller';

// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/image', imageRouters)
    app.use('/api/movie', movieRouter);
    app.use('/api/event', eventRouter);
};
