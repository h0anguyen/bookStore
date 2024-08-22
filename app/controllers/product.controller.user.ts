import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class ProductControllerUser extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);

    const currentPage = req.body.currentPage
      ? +req.body.currentPage
      : req.query.currentPage
      ? +req.query.currentPage
      : 1;
    const pageSize = req.body.pageSize
      ? +req.body.pageSize
      : req.query.pageSize
      ? +req.query.pageSize
      : 12;
    const products = await models.product.findAll({
      where: {},
      offset: currentPage,
      limit: pageSize,
      include: [{ model: models.category }],
    });
    const categories = await models.category.findAll();
    res.render("userview/product.view/index", {
      products,
      categories,
      user,
      currentPage,
      pageSize,
    });
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
