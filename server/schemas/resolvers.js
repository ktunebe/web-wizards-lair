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
        return User.findOne({ _id: context.user._id }).populate({ path: 'solutions', 
          populate: {
            path: 'problem',
            model: 'Problem'
        } });
      }
      throw AuthenticationError;
    },
    problems: async (parent, args, context) => {
      if (context.user) {
        return await Problem.find()
      } 
      throw AuthenticationError
    },
    problem: async (parent, args, context) => {
      if (context.user) {
        const { score } = await User.findById(context.user._id)
        const problem = await Problem.findOne({ tier: score })
        console.log(problem)
        return problem
      }
      throw AuthenticationError
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password, avatar }) => {
      const user = await User.create({ username, email, password, avatar });
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
        console.log('hit')
        return await User.findByIdAndUpdate(context.user._id, { $inc: { score: 1 }, $addToSet: { solutions: solution }  }, {new: true})
      }
      throw AuthenticationError
    },
    resetProgress: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, { score: 0, solutions: [] }, { new: true }  )
      }
      throw AuthenticationError
    },
    updateAvatar: async (parent, { avatar }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, { avatar }, { new: true })
      }
      throw AuthenticationError
    }
  },
};

module.exports = resolvers;
