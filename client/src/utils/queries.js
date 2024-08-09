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
    }
  }
`;

export const GET_PROBLEM = gql`
  query GET_PROBLEM($problemTier: Int!) {
  problem(problemTier: $problemTier) {
    answer
    instructions
    solution
    starterCode
    tier
  }
}
`


export const GET_ALL_PROBLEMS = gql`
  query GET_ALL_PROBLEMS {
  problems {
    _id
    answer
    solution
    starterCode
    tier
  }
}
`