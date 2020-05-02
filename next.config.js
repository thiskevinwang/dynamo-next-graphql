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
  // env: {
  //   GRAPHQL_URI: process.env.GRAPHQL_URI,
  //   CONNECTION_STRING: process.env.CONNECTION_STRING,
  //   DB_NAME: process.env.DB_NAME,
  //   COLLECTION_NAME: process.env.COLLECTION_NAME,
  //   GATSBY_APP_SECRET: process.env.GATSBY_APP_SECRET,
  // },
}
