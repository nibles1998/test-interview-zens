export const configuration = () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbURL: process.env.MONGODB_URL,
  secretKey: process.env.SECRET_KEY,
});
