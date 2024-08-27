import { UserControllerUser } from "@controllers";
import { Router } from "express";

export class UserRouteUser {
  private static path = Router();
  private static userControllerUser = new UserControllerUser();

  public static draw() {
    this.path
      .route("/")
      .get(
        this.userControllerUser.validateUserLogin,
        this.userControllerUser.index
      );
    return this.path;
  }
}
