const { User, Problem } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      // return User.findOne({ _id: userId }).populate({ path: 'solutions.problem' });
      return User.findOne({ _id: userId })
      .populate({ path: 'solutions', 
        populate: {
          path: 'problem',
          model: 'Problem'
      } });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    problems: async () => {
      if (context.user) {
        return await Problem.find()
      } 
      throw AuthenticationError
    },
    problem: async (parent, { problemTier }) => {
      if (context.user) {
        return await Problem.findOne({ tier: problemTier })
      }
      throw AuthenticationError
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // Set up mutation so a logged in user can only remove their user and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    tierUp: async (parent, {  solution }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, { $inc: { score: 1 }, $addToSet: { solutions: solution }  })
      }
      throw AuthenticationError
    }
  },
};

module.exports = resolvers;
