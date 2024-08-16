import { convertFileToBase64 } from "@configs/fileUpload";
import models from "@models";
import { CategoryInstance } from "@models/category";
import { Request, Response } from "express";
import { ApplicationController } from ".";


export class CategoryController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const categories = await models.category.findAll();
    res.render("category.view/index", { categories });
  }
  public async new(req: Request, res: Response) {
    res.render("category.view/new");
  }
  public async create(req: Request, res: Response) {
    const { name, description } = req.body;
    const file = req.file ? convertFileToBase64(req.file) : null;
    const category = (await models.category.create({
      name: req.body.name,
      description: req.body.description,
      image: file,
    })) as CategoryInstance;
    req.flash("success", { msg: `created category ${1}`  });
    res.redirect("/categories")
  }
  public async destroy(req: Request, res: Response) {
    const { id } = req.params;
    if(!id){
    req.flash("error", { msg: `id is not match`  });
    return res.redirect("/categories")
    }

    const  a = await models.category.findById(id);
    
    if(!a){
      req.flash("error", { msg: `Category ${id} not found`  });
      return res.redirect("/categories")
    }
    await 
    req.flash("success", { msg: `delete category ${id}`  });
    res.redirect("/categories")
  }
}
