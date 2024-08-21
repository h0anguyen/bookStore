import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class CartController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);

    const userId= req.user.id;
    const carts = await models.cart.findAll({
      // where:{
      //   userId : {
      //     [Op.eq]:userId,
      //   }
      // },
      include: [
        {
          model: models.product,
        },
      ],
    });

    res.render("userview/cart.view/index", { carts , user});
  }

  public async create(req: Request, res: Response) {
    const { name, price, description, categoryId } = req.body;
    
    await models.cart.create()

    req.flash("success", { msg: `add to cart success` });
    res.redirect("/carts");
  }

  public async destroy(req: Request, res: Response) {}

  public async update(req: Request, res: Response) {}
}
