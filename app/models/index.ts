import bookModel, { book } from "./book";
import userModel, { user } from "./user";

userModel.associate();
bookModel.associate();

export default {
  user,
  book,
};
