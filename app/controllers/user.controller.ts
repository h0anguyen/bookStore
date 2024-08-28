import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { BookInstance } from "../models/book";

export class UserController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const users = await models.user.findAll();
    res.render("adminview/user.view/index", { users });
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

  public async new(req: Request, res: Response) {
    const { id } = req.params;
    res.redirect(`/api/v1/users/${id}/new`);
  }

  public async create(req: Request, res: Response) {
    const { title, author, publishedDate } = req.body;
    const { id } = req.params;

    const book = (await models.book.create({
      title,
      author,
      publishedDate,
      userId: id,
    })) as BookInstance;

    res.redirect("/api/v1/auth");
  }
}
