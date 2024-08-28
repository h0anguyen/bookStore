import { RestActions } from "@configs/enum";
import { AuthController } from "@controllers";
import { Router } from "express";
import { Route } from ".";

export class AuthRoute {
  private static path = Router();
  private static authController = new AuthController();

  public static draw() {
      this.path.route("/signup").post(this.authController.create);
      this.path.route("/signin").post(this.authController.logIn);

      Route.resource(this.path, this.authController, {
        only: [RestActions.Index],
      });

    return this.path;
  }
}
