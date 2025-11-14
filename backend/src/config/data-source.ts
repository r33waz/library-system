import { BLOCK_STATUS, ROLES, SIGNUPSTATUS } from "../constant/enum";
import { IAdmin } from "../interface/seederInterface";

export const AdminSeedData: IAdmin[] = [
  {
    firstname: "Sudo",
    lastname: "Admin",
    email: "sudoadmin@gmail.com",
    password: "Admin@123",
    phoneNumber: "1234567890",
    role: ROLES.SUDO_ADMIN,
    blocked: BLOCK_STATUS.ACTIVE,
    status: SIGNUPSTATUS.ACCEPTED,
  },
];

export const GenreSeedData = [
  {
    name: "Biography / Autobiography",
    slug: "biography-autobiography",
  },
  {
    name: "Memoir",
    slug: "memoir",
  },
  {
    name: "Self-Help",
    slug: "self-help",
  },
  {
    name: "Personal Development",
    slug: "personal-development",
  },
  {
    name: "Business / Economics",
    slug: "business-economics",
  },
  {
    name: "Health / Wellness",
    slug: "health-wellness",
  },
  {
    name: "Psychology",
    slug: "psychology",
  },
  {
    name: "Science / Nature",
    slug: "science-nature",
  },
  {
    name: "History",
    slug: "history",
  },
  {
    name: "True Crime",
    slug: "true-crime",
  },
  {
    name: "Philosophy",
    slug: "philosophy",
  },
  {
    name: "Religion / Spirituality",
    slug: "religion-spirituality",
  },
  {
    name: "Politics",
    slug: "politics",
  },
  {
    name: "Education",
    slug: "education",
  },
  {
    name: "Travel",
    slug: "travel",
  },
  {
    name: "Cookbooks / Food",
    slug: "cookbooks-food",
  },
  {
    name: "Art / Photography",
    slug: "art-photography",
  },
];

export const CategorySeedData = [
  {
    name: "Fiction",
    slug: "fiction",
  },
  {
    name: "Non-Fiction",
    slug: "non-fiction",
  },
  {
    name: "Science Fiction",
    slug: "science-fiction",
  },
  {
    name: "Fantasy",
    slug: "fantasy",
  },
  {
    name: "Romance",
    slug: "romance",
  },
  {
    name: "Thriller",
    slug: "thriller",
  },
  {
    name: "Mystery",
    slug: "mystery",
  },
  {
    name: "Historical Fiction",
    slug: "historical-fiction",
  },
  {
    name: "Adventure",
    slug: "adventure",
  },
  {
    name: "Horror",
    slug: "horror",
  },
  {
    name: "Young Adult",
    slug: "young-adult",
  },
  {
    name: "Children's Books",
    slug: "childrens-books",
  },
  {
    name: "Poetry",
    slug: "poetry",
  },
  {
    name: "Biographies",
    slug: "biographies",
  },
  {
    name: "Cookbooks",
    slug: "cookbooks",
  },
  {
    name: "Travel Guides",
    slug: "travel-guides",
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
  },
  {
    name: "Art & Photography",
    slug: "art-photography",
  },
];

