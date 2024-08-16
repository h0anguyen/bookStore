import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class ProductController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const products = await models.product.findAll();
    res.render("product.view/index", { products: products });
  }
  public async show(req: Request, res: Response) {
    const products = await models.product.findAll({
      where: {
        categoryId: +req.params.id ,
      },
      include: [{ model: models.category }],
    });
    res.render("product.view/index", { products: products });
  }
}
