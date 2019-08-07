import movieRouter from './movie.router';
import imageRouter from './image.router';
export default (app) => {
    app.use('/api/movie', movieRouter);
    app.use('/api/image', imageRouter);
};
