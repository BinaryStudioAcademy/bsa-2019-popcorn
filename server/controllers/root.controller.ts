import authRoutes from './auth.controller';
import imageRouters from "./image.controller";
import movieRouter from './movie.controller';
import postRouter from './post.controller';

// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/image', imageRouters)
    app.use('/api/movie', movieRouter);
    app.use('/api/post', postRouter);
};
