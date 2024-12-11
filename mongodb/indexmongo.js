const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

(async function startServer() {
  const app = express();

  // MongoDB connection
  const MONGO_URI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  console.log('🚀 Connected to MongoDB');
  const db = client.db('mydatabase'); // Replace with your database name

  // Pass MongoDB connection to resolvers via context
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  // Apply middleware
  await server.start();
  server.applyMiddleware({ app });

  // Start the server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();