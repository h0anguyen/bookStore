import { ProductController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class ProductRoute {
  private static path = Router();
  private static productController = new ProductController();

  public static draw() {
    Route.resource(this.path, this.productController, {
      only: [RestActions.Index, RestActions.Show],
    });

    return this.path;
  }
}
