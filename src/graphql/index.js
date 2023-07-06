const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");
const resolvers = require("./resolvers");

const typesArray = loadFilesSync(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({ typeDefs: typesArray, resolvers });

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
