import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class ProductControllerUser extends ApplicationController {
  public async index(req: Request, res: Response) {
    const products = await models.product.findAll({
      include: [{ model: models.category }],
    });
    const categories = await models.category.findAll();
    res.render("userview/product.view/index", { products, categories });
  }
  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const product = await models.product.findOne({
      where: {
        id,
      },
      include: [{ model: models.category }],
    });
    const categories = await models.category.findAll();
    res.render("userview/product.view/show", {
      product,
      category: categories,
    });
  }
}
