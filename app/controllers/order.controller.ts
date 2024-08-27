import models from "@models";
import { OrderInstance, OrderStatus } from "@models/order";
import { ProductOrderInstance } from "@models/productOrder";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { ApplicationController } from ".";

export class OrderController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);
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

    res.render("userview/order.view/index", { user, carts });
  }

  public async create(req: Request, res: Response) {
    const user = await models.user.findById(req.session.userId);

    const { address, phoneNumber, receiverName } = req.body;

    const { productId, currentPrice, quantity } = req.body;

    const order = (await models.order.create({
      userId: req.session.userId,
      address,
      phoneNumber,
      receiverName,
      status: OrderStatus.PENDING,
    })) as OrderInstance;

    const orders = await models.order.findOne({
      where: {
        userId: req.session.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    if (productId) {
      if (Array.isArray(productId)) {
        for (let i = 0; i < productId.length; i++) {
          const productOrder = (await models.productOrder.create({
            productId: productId[i],
            orderId: order.id,
            currentPrice: currentPrice[i],
            quantity: quantity[i],
          })) as ProductOrderInstance;
        }
      } else {
        const productOrder = (await models.productOrder.create({
          productId,
          orderId: order.id,
          currentPrice,
          quantity,
        })) as ProductOrderInstance;
      }
    }
    await models.cart.destroy({
      where: {
        userId: req.session.userId,
      },
    });

    res.render("userview/history.view/index", { user });
  }
}
