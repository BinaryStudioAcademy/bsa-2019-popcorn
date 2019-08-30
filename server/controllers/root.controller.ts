import authRoutes from "./auth.controller";
import imageRouters from "./image.controller";
import movieRouter from "./movie.controller";
import votingRoutes from "./voting.controller";
import eventRouter from "./event.controller";
import topRouter from "./top.controller";
import postRouter from "./post.controller";
import userRouter from "./user.controller";
import storyRouter from "./story.controller";
import surveysRoutes from "./surveys.controller";
import reviewAnalysisRoutes from "./reviewAnalysis.controller";
import reviewRouter from "./review.controller";
import watchRouter from "./watch.controller";
import followRouter from "./follow.controller";
import notificationRouter from "./notification.controller";
import searchRouter from "./search.controller";

// register all routes
export default app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/voting", votingRoutes);
  app.use("/api/image", imageRouters);
  app.use("/api/movie", movieRouter);
  app.use("/api/post", postRouter);
  app.use("/api/event", eventRouter);
  app.use("/api/top", topRouter);
  app.use("/api/user", userRouter);
  app.use("/api/story", storyRouter);
  app.use("/api/surveys", surveysRoutes);
  app.use("/api/analysis", reviewAnalysisRoutes);
  app.use("/api/review", reviewRouter);
  app.use("/api/watch", watchRouter);
  app.use("/api/follow", followRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/search", searchRouter);
};
