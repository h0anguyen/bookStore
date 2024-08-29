import { BookController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class BookRoute {
  private static path = Router();
  private static bookController = new BookController();

  public static draw() {
    Route.resource(this.path, this.bookController, {
      only: [RestActions.New, RestActions.Index, RestActions.Create],
    });

    return this.path;
  }
}
