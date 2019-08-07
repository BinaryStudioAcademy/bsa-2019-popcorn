import movieRoutes from './movie.router';
export default (app) => {
    app.use('/api/movie', movieRoutes);
};
