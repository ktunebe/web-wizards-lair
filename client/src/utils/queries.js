import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      avatar
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      score
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      avatar
      email
      score
      solutions {
        problem {
         title
          }
        solution
      }
    }
  }
`;

export const GET_PROBLEM = gql`
  query Problem {
  problem {
    _id
    starterCode
    answers
    tests
    solution
    tier
    instructions
    lore
    title
  }
}
`


export const GET_ALL_PROBLEMS = gql`
  query Problems {
  problems {
    _id
    starterCode
    answers
    tests
    solution
    tier
    instructions
    lore
    title
  }
}
`