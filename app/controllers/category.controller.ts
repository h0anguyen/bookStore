import { convertFileToBase64 } from "@configs/fileUpload";
import models from "@models";
import { CategoryInstance } from "@models/category";
import { Request, Response } from "express";
import { ApplicationController } from ".";


export class CategoryController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const categories = await models.category.findAll();
    res.render("adminview/category.view/index", { categories });
  }
  public async new(req: Request, res: Response) {
    const categories = await models.category.findAll();

    res.render("adminview/category.view/new", { categories });
  }
  public async create(req: Request, res: Response) {
    const { name, description } = req.body;
    const file = req.file ? convertFileToBase64(req.file) : null;
    const category = (await models.category.create({
      name: req.body.name,
      description: req.body.description,
      image: file,
    })) as CategoryInstance;
    req.flash("success", { msg: `created category ${1}` });
    res.redirect("/categories");
  }
  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      req.flash("error", { msg: `id is not match` });
      return res.redirect("/categories");
    }

    const a = await models.category.findById(id);

    if (!a) {
      req.flash("error", { msg: `Category ${id} not found` });
      return res.redirect("/categories");
    }
    await models.category.destroy({
      where: {
        id,
      },
    });
    req.flash("success", { msg: `delete category ${id}` });
    res.redirect("/categories");
  }

  public async edit(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      req.flash("error", { msg: "id is not match" });
      return res.redirect("/categories");
    }

    const category_edit = await models.category.findOne({
      where:{
        id,
      }
    })

    const categories = await models.category.findAll()

    res.render("adminview/category.view/edit", { category_edit, categories});
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) {
      req.flash("error", { msg: `Id is not match ` });
      return res.redirect("/categories");
    }

    const a = models.category.findById(id);

    if (!a) {
      req.flash("error", { msg: `Id is not match ` });
      return res.redirect("/categories");
    }

    const file = req.file ? convertFileToBase64(req.file) : null;
    await models.category.update(
      {
        name: req.body.name,
        description: req.body.description,
        image: file,
      },
      {
        where: {
          id,
        },
      }
    );

    req.flash("success", { msg: `Udpate success` });
    res.redirect("/categories");
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params
    const products = await models.product.findAll({
      where: {
        categoryId: id,
      },
      include: [{ model: models.category }],
    });
    const catename = await models.category.findOne({
      where: {
         id,
      },
    });
    const categories= await models.category.findAll();
    res.render("adminview/category.view/show", { products, categories, catename });
  }
}
