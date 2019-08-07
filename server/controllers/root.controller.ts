import authRoutes from './auth.controller';
import movieRouter from './movie.controller';
// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/movie', movieRouter);
};
