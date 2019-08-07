import authRoutes from './auth.controller';
import movieRoutes from './movie.contoller';

// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/movies', movieRoutes);
};
