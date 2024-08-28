import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { user } from "./user";

export interface BookAttributes {
  title?: string;
  author?: string;
  publishedDate?: Date;
  userId?: number;
}

export interface BookInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  author: string;
  publishedDate: Date;
  userId: number;
}

export const book = sequelize.define("Book", {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  publishedDate: Sequelize.DATE,
  userId: Sequelize.NUMBER,
});

export const associate = () => {
  book.belongsTo(user, {
    foreignKey: "userId",
  });
};

export default {
  book,
  associate,
};
