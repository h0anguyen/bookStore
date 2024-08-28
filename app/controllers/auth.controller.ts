import models from "@models";
import { Role, UserInstance } from "@models/user";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class AuthController extends ApplicationController {
  public async index(req: Request, res: Response) {
    res.render("userview/auth.view/index");
  }
  public async create(req: Request, res: Response) {
    const { fullName, username, email, password, confirmpassword } = req.body;
    if (confirmpassword !== password) {
      req.flash("errors", { msg: "Confirm password is not match" });
      return res.redirect("/api/v1/auth");
    }
    const user = (await models.user.create({
      fullName,
      username,
      email,
      iam_role: Role.MEMBER,
      hash_pwd: password,
    })) as UserInstance;

    if (user) {
      req.session.userId = user.id;
      res.redirect("/api/v1/users");
    } else {
      req.flash("errors", { msg: "Confirm password is not match" });
      res.redirect("/api/v1/auth");
    }
  }
  public async logIn(req: Request, res: Response) {
    const { username, password } = req.body;

    const checkUser = (await models.user.findOne({
      where: {
        username,
      },
    })) as UserInstance;
    if (!checkUser) {
      req.flash("errors", { msg: "Email is not found." });
      res.redirect("/auth");
    } else {
      if (checkUser.hash_pwd === password) {
        req.session.userId = checkUser.id;

        req.flash("success", { msg: "Login success!!!" });
        res.redirect("/api/v1/users");
      } else {
        req.flash("errors", { msg: "Password is not found." });
        res.redirect("/api/v1/auth");
      }
    }
  }
}
