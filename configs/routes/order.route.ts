import { OrderController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class OrderRoute {
  private static path = Router();
  private static OrderController = new OrderController();

  public static draw() {
    // bước 1
    Route.resource(this.path, this.OrderController, {
      only: [RestActions.Index],
    });

    return this.path;
  }
}
