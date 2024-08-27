import models from "@models";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { ApplicationController } from ".";
import { CartInstance } from "../models/cart";

export class CartController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);

    // const userId = req.user.id;
    const carts = await models.cart.findAll({
      where: {
        userId: {
          [Op.eq]: req.session.userId,
        },
      },
      include: [
        {
          model: models.product,
        },
      ],
    });

    res.render("userview/cart.view/index", { carts, user });
  }

  public async create(req: Request, res: Response) {
    const { quantity, productId } = req.body;
    const userId = req.session.userId;

    const productCart = (await models.cart.findOne({
      where: {
        userId,
        productId,
      },
    })) as CartInstance;

    if (!userId) {
      res.redirect("/auth");
    } else {
      if (productCart) {
        await models.cart.update(
          {
            quantity: Number(productCart.quantity) + Number(quantity),
          },
          {
            where: {
              userId,
              productId,
            },
          }
        );
      } else {
        await models.cart.create({
          userId,
          productId,
          quantity,
        });
      }
      req.flash("success", { msg: `add to cart success` });
      res.redirect("/prusers");
    }
  }

  public async detroy(req: Request, res: Response) {
    const userId = req.session.userId;
    const { id } = req.params;

    await models.cart.destroy({
      where: {
        userId,
        productId: id,
      },
    });
    req.flash("success", { msg: `Delete success` });
    res.redirect("/carts");
  }

  public async delete(req: Request, res: Response) {
    const userId = req.session.userId;
    const { productId } = req.body;

    await models.cart.destroy({
      where: {
        userId,
        // productId,
      },
    });
    req.flash("success", { msg: `Delete success` });
    res.redirect("/carts");
  }
  public async update(req: Request, res: Response) {
    const { quantity, productId } = req.body;
    const userId = req.session.userId;
    if (productId) {
      if (Array.isArray(productId)) {
        for (let i = 0; i < productId.length; i++) {
          await models.cart.update(
            {
              quantity: quantity[i],
            },
            {
              where: {
                userId,
                productId: productId[i],
              },
            }
          );
        }
      } else {
        await models.cart.update(
          {
            quantity,
          },
          {
            where: {
              userId,
              productId,
            },
          }
        );
      }
    }
    req.flash("success", { msg: `Udpate success` });
    res.redirect("/carts");
  }
}
