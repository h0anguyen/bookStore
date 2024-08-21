import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class CartController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const carts = await models.cart.findAll({
      include: [
        {
          model: models.product,
        },
      ],
    });

    res.render("userview/cart.view/index", { carts });
  }

  public async create(req: Request, res: Response) {}

  public async destroy(req: Request, res: Response) {}

  public async update(req: Request, res: Response) {}
}
