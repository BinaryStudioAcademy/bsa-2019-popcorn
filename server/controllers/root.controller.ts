import authRoutes from './auth.controller';

// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
};
