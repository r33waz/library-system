import slugify from "slugify";

export const Slug = (str: string) => {
  return slugify(str, {
    lower: true,
    strict: true,
  });
};

