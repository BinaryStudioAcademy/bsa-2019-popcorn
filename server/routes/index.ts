import movieRoutes from './movie.routes';
export default (app) => {
    app.use('/api/movie', movieRoutes);
};
