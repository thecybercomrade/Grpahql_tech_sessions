import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";

const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });
  app.listen({ port: 3000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`
    );
  });
});
