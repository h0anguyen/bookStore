import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { convertFileToBase64 } from "../../configs/fileUpload";
import { ProductInstance } from "../models/product";

export class ProductController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const products = await models.product.findAll({
      include: [{ model: models.category }],
    });
    const categories = await models.category.findAll();
    res.render("adminview/product.view/index", { products, categories });
  }
  public async new(req: Request, res: Response) {
    const categories = await models.category.findAll();
    res.render("adminview/product.view/new", { categories: categories });
  }

  public async edit(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      req.flash("error", { msg: "id is not match" });
      return res.redirect("/products");
    }

    const categories = await models.category.findAll();
    const product = await models.product.findOne({
      where: {
        id,
      },
    });

    res.render("adminview/product.view/edit", { categories, product });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      req.flash("error", { msg: `id is not match` });
      return res.redirect("/products");
    }

    const a = await models.product.findById(id);

    if (!a) {
      req.flash("error", { msg: `product ${id} not found` });
      return res.redirect("/products");
    }
    await models.product.destroy({
      where: {
        id,
      },
    });
    req.flash("success", { msg: `delete product ${id}` });
    res.redirect("/products");
  }
  public async show(req: Request, res: Response) {
    const products = await models.product.findAll({
      where: {
        categoryId: +req.params.id,
      },
      include: [{ model: models.category }],
    });
    res.render("product.view/index", { products: products });
  }
  public async create(req: Request, res: Response) {
    const { name, price, description, categoryId } = req.body;
    const file = req.file ? convertFileToBase64(req.file) : null;
    const product = (await models.product.create({
      name,
      description,
      price,
      image: file,
      categoryId,
    })) as ProductInstance;
    req.flash("success", { msg: `created product ${1}` });
    res.redirect("/products");
  }
}
