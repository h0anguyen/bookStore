import { ProductControllerUser } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class ProductRouteUser {
  private static path = Router();
  private static productControllerUser = new ProductControllerUser();

  public static draw() {
    Route.resource(this.path, this.productControllerUser, {
      only: [RestActions.Index, RestActions.Show],
    });

    return this.path;
  }
}
