import User from "../models/User.js";
import Category from "../models/Category.js";
import Topic from "../models/Topic.js";
import { createUser } from "../services/user.service.js";
import { createCategory } from "../services/category.service.js";
import { createTopic } from "../services/topic.service.js";

export const initData = async () => {
  // crear el user admin inicial
  // username: administrator
  // email: admin@example.com
  const existAdmin = await User.findOne({ email: "admin@example.com" });
  if (!existAdmin) {
    await createUser({
      username: "administrator",
      email: "admin@example.com",
      role: "Admin",
    });
    console.log("==== admin creado ====");
    console.log("==== username: administrator ====");
    console.log("==== email: admin@example.com ====");
  }

  // crear las categorias principales
  // Imagenes, Videos, Textos
  const categories = [
    { _id: "664ac29103745d106ca1a773", name: "Imagenes" },
    { _id: "664ac29103745d106ca1a771", name: "Videos" },
    { _id: "664ac29103745d106ca1a776", name: "Textos" },
  ];

  categories.forEach(async ({ _id, name }) => {
    const existCategory = await Category.findOne({ name });
    if (!existCategory) {
      await createCategory({
        _id,
        name,
      });
      console.log(`==== categoria ${name} creada ====`);
    }
  });

  // crear las tematicas principales
  // Ciencias, Matemáticas, Deporte
  const topic = ["Ciencias", "Matemáticas", "Deporte"];

  topic.forEach(async (name) => {
    const existTopic = await Topic.findOne({ name });
    if (!existTopic) {
      await createTopic({
        name,
        allowedCategories: [
          "664ac29103745d106ca1a773",
          "664ac29103745d106ca1a771",
          "664ac29103745d106ca1a776",
        ],
      });
      console.log(
        `==== tematica ${name} creada, permite todos los tipos de contenidos ====`
      );
    }
  });
};
