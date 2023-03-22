require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT || 4000,
  db: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET
};

const store = new confidence.Store(config);
exports.get = key => store.get(key);