import { combineReducers } from "redux";
import subscribersReducer from "./subscribers/reducer";
import commentsReducer from "./comments/reducer";
import postsReducer from "./posts/reducer";
import postsDetailReducer from "./postList/reducer";
import loginReducer from "./user/reducer";
import writingPostsReducer from "./postWriting/reducer";

const rootReducer = combineReducers({
  subscribersReducer,
  commentsReducer,
  postsReducer,
  postsDetailReducer,
  loginReducer,
  writingPostsReducer
})

export default rootReducer