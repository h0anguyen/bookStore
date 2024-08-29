import { UserController } from "@controllers";
import { Router } from "express";

export class UserRoute {
  private static path = Router();
  private static userController = new UserController();

  public static draw() {
    this.path.route("/").get(this.userController.index);
    this.path.route("/:id/books").get(this.userController.show);
    this.path.route("/:id/books").post(this.userController.create);

    // Route.resource(this.path, this.userController, {
    //   only: [RestActions.New],
    // });

    return this.path;
  }
}
