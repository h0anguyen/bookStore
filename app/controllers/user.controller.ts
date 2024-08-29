import models from "@models";
import { UserInstance } from "@models/user";
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
    const { id } = req.body;

    if (req.session.userId) {
      await models.book.update(
        {
          publishedDate: new Date(),
          userId: req.session.userId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      req.flash("success", { msg: "Buy success!!." });
      res.redirect("/");
    } else {
      req.flash("errors", { msg: "You are not logged in." });
      res.redirect("/api/v1/auth");
    }
  }
}
