const typeDefs = `
  type Solution {
  problem: Problem!
  solution: String!
  }

  input SolutionInput {
  problem: ID!
  solution: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    avatar: String!
    score: Int!
    solutions: [ Solution ]
  }

  type Problem { 
    _id: ID
    starterCode: String!
    answers: [ String! ]
    tests: [ String! ]
    solution: String!
    tier: Int!
    instructions: String!
    lore: String!
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    problems: [Problem]
    problem(problemTier: Int!): Problem
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, avatar: String! ): Auth
    login(email: String!, password: String!): Auth
    removeUser: User    
    tierUp( solution: SolutionInput!): User
    resetProgress: User
    updateAvatar( avatar: String! ): User
  }
`

module.exports = typeDefs;
