import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class UserControllerUser extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);
    res.render("userview/user.view/index", { user });
  }
  public async update(req: Request, res: Response) {
    res.render("userview/user.view/new");
  }
}
