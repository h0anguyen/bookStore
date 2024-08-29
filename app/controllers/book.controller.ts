import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class BookController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const books = await models.book.findAll();
    res.render("adminview/book.view/index", { books });
  }

  public async new(req: Request, res: Response) {
    res.render("adminview/book.view/new");
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
