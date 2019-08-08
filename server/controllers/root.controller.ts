import authRoutes from './auth.controller';
import imageRouters from "./image.controller";
import movieRouter from './movie.controller';
import eventRouter from './event.controller';
import topRouter from './top.controller';


// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/image', imageRouters)
    app.use('/api/movie', movieRouter);
    app.use('/api/event', eventRouter);
    app.use('/api/top', topRouter);
};
