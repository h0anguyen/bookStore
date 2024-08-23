import { Request, Response } from "express";
import { ApplicationController } from ".";
import models from "../models";

export class OrderController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);
    res.render("userview/order.view/index", { user });
  }
}
