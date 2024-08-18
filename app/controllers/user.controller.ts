import models from "@models";
import { Role, UserInstance } from "@models/user";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class UserController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const users = await models.user.findAll();
    const categories = await models.category.findAll();
    res.render("adminview/user.view/index", { users, categories });
  }
  public async new(req: Request, res: Response) {
    res.render("adminview/user.view/new");
  }
  public async create(req: Request, res: Response) {
    const { confirmpassword, password } = req.body;
    if (confirmpassword !== password) {
      req.flash("errors", { msg: "Confirm password is not match" });
      return res.redirect("/users");
    }
    const user = (await models.user.create({
      name: req.body.name,
      avatarUrl: req.body.avatarURL,
      email: req.body.email,
      password: req.body.password,
      role: Role.USER,
    })) as UserInstance;

    req.flash("success", { msg: `created user ${req.body.name}` });
    res.redirect("/users");
  }
  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      req.flash("error", { msg: `id is not match` });
      return res.redirect("/users");
    }

    const a = await models.user.findById(id);

    if (!a) {
      req.flash("error", { msg: `no find id ${req.body.id} delete` });
      return res.redirect("/users");
    }
    await models.user.destroy({
      where: {
        id,
      },
    });
    req.flash("success", { msg: `delete user ${id}` });
    res.redirect("/users");
  }
}
