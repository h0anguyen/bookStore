import { CategoryController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";
import { upload } from "../fileUpload";

export class CategoryRoute {
  private static path = Router();
  private static CategoryController = new CategoryController();

  public static draw() {
    this.path.post("/", upload.single("image"),this.CategoryController.create)
    // bước 1
    Route.resource(this.path, this.CategoryController, {
      only: [RestActions.Index, RestActions.New, RestActions.Destroy],
    });

    return this.path;
  }
}
