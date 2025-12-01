import "dotenv/config";
import "reflect-metadata";
import { GenreSeedData } from "../config/data-source";
import AppDataSource from "../config/db.config";
import Genre from "../entitys/genre.entity";
import { IGenre } from "../interface/seederInterface";
import { Slug } from "../utils/slugify";

const genreRepo = AppDataSource.getRepository(Genre);
const seedGenre = async (genre: IGenre) => {
  try {
    const existingGenre = await genreRepo.findOneBy({ slug: genre.slug });

    if (existingGenre) {
      console.log(`⚠️ ${genre.name} genre already exists`);
      return;
    }
    
    const slug = Slug(genre?.name);

    const newGenre = genreRepo.create({
      name: genre?.name,
      slug: slug,
    });

    await genreRepo.save(newGenre);

    console.log("🚀 ~ seedGenre ~ newGenre:", newGenre);
  } catch (error) {
    console.log("🚀 ~ seedGenre ~ error:", error);
  }
};

AppDataSource.initialize()
  .then(async () => {
    console.log("🚀 Database Connected!");

    for (const genre of GenreSeedData) {
      await seedGenre(genre);
    }
    console.log("✅ All genre Seeded Successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  });
