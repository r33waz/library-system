const envVariables = {
  //url port
  PORT: process.env.PORT ?? 3000,

  //tokens auth
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  CSRF_TOKEN: process.env.CSRF_TOKEN,
};

export default envVariables;
