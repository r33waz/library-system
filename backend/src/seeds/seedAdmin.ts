import "dotenv/config";
import "reflect-metadata";
import { AdminSeedData } from "../config/data-source";
import AppDataSource from "../config/db.config";
import { Auth } from "../entitys/auth.enity";

import { BLOCK_STATUS, ROLES, SIGNUPSTATUS } from "../constant/enum";
import Admin from "../entitys/admin.entity";
import { hashPassword } from "../helper/passwordHelper";
import { IAdmin } from "../interface/seederInterface";

const authRepo = AppDataSource.getRepository(Auth);
const adminRepo = AppDataSource.getRepository(Admin);
const seedAdmin = async (admin: IAdmin) => {
  try {
    const existingAdmin = await authRepo.findOne({
      where: { email: admin?.email },
    });

    if (existingAdmin) {
      console.log(`⚠️ ${admin?.email}Admin already exists`);
      return;
    }

    const newAdmin = adminRepo.create({
      firstname: admin?.firstname,
      lastname: admin?.lastname,
      phoneNumber: admin?.phoneNumber,
      status: admin?.status as SIGNUPSTATUS,
      role: admin?.role as ROLES,
      blocked: admin?.blocked as BLOCK_STATUS,
    });

    await adminRepo.save(newAdmin);

    const hashedPassword = await hashPassword(admin?.password);
    const newAuth = authRepo.create({
      email: admin?.email,
      password: hashedPassword,
      admin: newAdmin,
    });
    await authRepo.save(newAuth);

    console.log("✅ Super Admin Seeded Successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};

AppDataSource.initialize()
  .then(async () => {
    console.log("🚀 Database Connected!");

    for (const admin of AdminSeedData) {
      await seedAdmin(admin);
    }
    console.log("✅ All Admins Seeded Successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  });
