import "dotenv/config";
import "reflect-metadata";
import { CategorySeedData } from "../config/data-source";
import AppDataSource from "../config/db.config";
import Category from "../entities/category.entity";
import { ICategory } from "../interface/seederInterface";
import { Slug } from "../utils/slugify";

const categoryRepo = AppDataSource.getRepository(Category);
const seedCategory = async (category: ICategory) => {
  try {
    const existingCategory = await categoryRepo.findOneBy({
      slug: category.slug,
    });

    if (existingCategory) {
      console.log(`⚠️ ${category.name} category already exists`);
      return;
    }

    const slug = Slug(category?.name);

    const newCategory = await categoryRepo.create({
      name: category.name,
      slug: slug,
    });

    await categoryRepo.save(newCategory);
  } catch (error) {
    console.log("🚀 ~ seedCategory ~ error:", error);
  }
};

AppDataSource.initialize()
  .then(async () => {
    console.log("🚀 Database Connected!");

    for (const category of CategorySeedData) {
      await seedCategory(category);
    }
    console.log("✅ All Categories Seeded Successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  });
