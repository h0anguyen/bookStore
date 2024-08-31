import models from "@models";
import { Role, UserInstance } from "@models/user";
import * as CryptoJS from "crypto-js";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class AuthController extends ApplicationController {
  public async index(req: Request, res: Response) {
    res.render("userview/auth.view/index");
  }
  public async create(req: Request, res: Response) {
    const { fullName, username, email, password, confirmpassword } = req.body;
    const md5Pass = CryptoJS.MD5(password).toString();
    if (confirmpassword !== password) {
      let msg = "Confirm password is not match";
      res.render("userview/auth.view/error", { msg });
    } else {
      const user = (await models.user.create({
        fullName,
        username,
        email,
        iam_role: Role.MEMBER,
        hash_pwd: md5Pass,
      })) as UserInstance;

      if (user) {
        req.session.userId = user.id;
        req.flash("success", { msg: "Login success!!!" });
        res.redirect("/");
      } else {
        const status = "400";
        const msg = "Sign Up error";
        res.render("userview/auth.view/error", { msg, status });
      }
    }
  }
  public async logIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const md5Pass = CryptoJS.MD5(password).toString();

    const checkUser = (await models.user.findOne({
      where: {
        username,
      },
    })) as UserInstance;
    if (!checkUser) {
      req.flash("errors", { msg: "Email wrong." });
      const msg = "Email is not found.";

      res.render("userview/auth.view/error", { msg });
    } else {
      if (checkUser.hash_pwd === md5Pass) {
        req.session.userId = checkUser.id;

        req.flash("success", { msg: "Login success!!!" });
        res.redirect("/");
      } else {
        req.flash("error", { msg: "Password wrong." });
        const msg = "Password wrong.";

        res.render("userview/auth.view/error", { msg });
      }
    }
  }
}
