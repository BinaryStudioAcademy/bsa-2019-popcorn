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
};
