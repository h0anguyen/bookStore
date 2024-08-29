import { Request, Response } from "express";
import { ApplicationController } from ".";
import models from "../models";

export class HomeController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);
    const books = await models.book.findAll();
    if (user) {
      res.render("userview/home.view/index", { user, books });
    } else {
      res.render("userview/auth.view/index");
    }
  }
}
