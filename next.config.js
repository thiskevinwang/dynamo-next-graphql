require("dotenv").config()
const path = require("path")

module.exports = {
  target: "serverless",
  webpack(config, options) {
    config.resolve.alias["pg-native"] = path.join(
      __dirname,
      "aliases/pg-native"
    )
    config.resolve.alias["src"] = path.join(__dirname, "src")
    config.resolve.alias["components"] = path.join(__dirname, "src/components")
    config.resolve.alias["context"] = path.join(__dirname, "src/context")
    config.resolve.alias["icons"] = path.join(__dirname, "src/icons")
    config.resolve.alias["lib"] = path.join(__dirname, "src/lib")
    config.resolve.alias["consts"] = path.join(__dirname, "src/consts")
    config.resolve.alias["state"] = path.join(__dirname, "src/state")
    config.resolve.alias["hooks"] = path.join(__dirname, "src/hooks")
    config.resolve.alias["theme"] = path.join(__dirname, "src/theme")
    config.resolve.alias["utils"] = path.join(__dirname, "src/utils")
    config.resolve.alias["apolloClient"] = path.join(
      __dirname,
      "src/apolloClient.ts"
    )
    return config
  },
  env: {
    APP_SECRET: process.env.APP_SECRET,
    ENDPOINT: process.env.ENDPOINT,
  },
}
