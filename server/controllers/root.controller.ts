import authRoutes from './auth.controller';
import imageRouters from "./image.controller";

// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/image', imageRouters)
};
