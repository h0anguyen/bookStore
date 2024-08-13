import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { ProductInstance } from "../models/product";

export class ProductController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const products = await models.product.findAll();

    res.render("product.view/index", { products: products });
  }
  public async show(req: Request, res: Response) {
    const productDetail = (await models.product.findOne({
      where: {
        id: +req.params.id,
      },
    })) as ProductInstance;

    if (productDetail == null) {
      req.flash("errors", { msg: "Not find product!" });
      return res.redirect("/");
    } else {
      return res.redirect("/products");
    }
  }
}
