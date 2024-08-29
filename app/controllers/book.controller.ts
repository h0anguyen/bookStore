import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class BookController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const books = await models.book.findAll();
    res.render("adminview/book.view/index", { books });
  }

}
