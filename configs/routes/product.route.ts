import { ProductController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";
import { upload } from "../fileUpload";

export class ProductRoute {
  private static path = Router();
  private static productController = new ProductController();

  public static draw() {
    this.path.post("/", upload.single("image"), this.productController.create);

    Route.resource(this.path, this.productController, {
      only: [
        RestActions.Index,
        RestActions.New,
        RestActions.Show,
        RestActions.Destroy,
        RestActions.Update,
        RestActions.Edit,
      ],
    });

    return this.path;
  }
}
