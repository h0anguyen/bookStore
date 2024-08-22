import { CartController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class CartRoute {
  private static path = Router();
  private static cartController = new CartController();

  public static draw() {
    this.path.route("/update").patch(this.cartController.update);
    this.path.route("/:id").get(this.cartController.detroy);

    Route.resource(this.path, this.cartController, {
      only: [RestActions.Index, RestActions.Create],
    });
    return this.path;
  }
}
