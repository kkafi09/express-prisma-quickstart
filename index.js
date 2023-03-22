const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./helpers/utils/logger");
const config = require("./helpers/infra/global_config")
const port = config.get("/port");
const morgan = require("morgan");

const userApi = require("./api/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'))

app.use("/api/user/v1", userApi);

app.get("/", (req, res) =>
  res.status(200).json({ message: "Welcome to the API STAPA App" })
);

app.listen(port, () => {
  const ctx = "app-listen";
  logger.log(ctx, `This API Service STAPA is running properly and listening on port ${port}`, 'initate application');
});
