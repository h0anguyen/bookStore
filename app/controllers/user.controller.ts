import models from "@models";
import { Role, UserInstance } from "@models/user";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class UserController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const idUser = req.session.userId;
    if (idUser) {
      const checkUser = (await models.user.findOne({
        where: {
          id: idUser,
        },
      })) as UserInstance;

      if (checkUser.iam_role == 0) {
        const users = await models.user.findAll();
        res.render("adminview/user.view/index", { users });
      } else {
        req.flash("errors", { msg: "Forbidden! Requires a token to access" });
        const msg = "Forbidden! Requires a token to access";
        const status = "403";
        res.render("userview/auth.view/error", { msg, status });
      }
    } else {
      req.flash("errors", { msg: "Forbidden! Requires a token to access" });
      const msg = "Forbidden! Requires a token to access";
      const status = "403";
      res.render("userview/auth.view/error", { msg, status });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const books = await models.book.findAll({
      where: {
        userId: id,
      },
    });
    res.render("adminview/user.view/show", { books });
  }

  public async create(req: Request, res: Response) {
    const { fullName, username, email, password, confirmpassword } = req.body;
    if (confirmpassword !== password) {
      const msg = "Confirm password is not match";
      return res.render("userview/auth.view/error", { msg });
    }
    const user = (await models.user.create({
      fullName,
      username,
      email,
      iam_role: Role.MEMBER,
      hash_pwd: password,
    })) as UserInstance;

    if (user) {
      req.session.userId = user.id;
      req.flash("success", { msg: "Login success!!!" });
      res.redirect("/");
    } else {
      const msg = "Confirm password is not match";
      res.render("userview/auth.view/error", { msg });
    }
  }
}
