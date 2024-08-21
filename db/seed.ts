import { faker } from "@faker-js/faker";
import models from "@models";
import { convertFileToBase64 } from "../configs/fileUpload";

const seedProduct = async()=>{
  const data=[];
  for(let i = 0; i < 1000; i++){
    const imageramdom ={
      path: `C:/Hoa/bookstors/app/assets/images/products/product-${Math.floor(Math.random()*10)+1}.jpg`
    }as Express.Multer.File;
    const image =convertFileToBase64(imageramdom)
    data.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      image: image,
      categoryId:5 ,
    })
  }
  await models.product.bulkCreate(data)
}
seedProduct();