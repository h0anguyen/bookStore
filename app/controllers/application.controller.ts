import models from "@models";
import { Role } from "@models/user";
import { NextFunction, Request, Response } from "express";
export class ApplicationController {
  public async validateUserLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.session.userId) {
      req.flash("errors", { msg: "You have to login first." });
      return res.redirect("/");
    }

    const user = await models.user.findById(req.session.userId);
    if (!user) {
      req.flash("errors", {
        msg: `User with id: ${req.session.userId} does not found.`,
      });
      return res.redirect("/");
    }

    req.user = user;
    next();
  }
  public async checkEmailSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, username } = req.body;

    const checkEmail = await models.user.findOne({
      where: {
        email,
      },
    });

    const checkusername = await models.user.findOne({
      where: {
        username,
      },
    });

    if (checkEmail || checkusername) {
      const status = "400";
      const msg = "Cannot sign-up with the username or email already existed";
      return res.render("userview/auth.view/error", { msg, status });
    } else {
      const mess = null;

      next();
    }
  }

  public async validateAdmin(req: Request, res: Response, next: NextFunction) {
    const currentUser = req.user;

    if (currentUser.role === Role.ADMIN) {
      req.flash("success", {
        msg: `You are an ADMIN`,
      });
    } else {
      if (currentUser.role === Role.MODERATOR) {
        req.flash("success", {
          msg: `You are an MODERATOR`,
        });
      } else {
        req.flash("success", {
          msg: `You are an MEMBER`,
        });
      }
    }
    next();
  }
}
