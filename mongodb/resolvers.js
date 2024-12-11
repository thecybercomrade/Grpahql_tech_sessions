const { ObjectId } = require('mongodb');

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const users = await context.db.collection('users').find().toArray();
      return users.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      }));
    },
    user: async (parent, args, context) => {
      const user = await context.db.collection('users').findOne({ _id: new ObjectId(args.id) });
      return user ? { id: user._id.toString(), name: user.name, email: user.email } : null;
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      const newUser = { name: args.name, email: args.email };
      const result = await context.db.collection('users').insertOne(newUser);
      return { id: result.insertedId.toString(), ...newUser };
    },
  },
};

module.exports = resolvers;
