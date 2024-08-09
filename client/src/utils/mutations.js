import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $avatar: String!) {
    addUser(username: $username, email: $email, password: $password, avatar: $avatar) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;


export const TIER_UP = gql`
  mutation TIER_UP($solution: SolutionInput!) {
  tierUp(solution: $solution) {
    username
    score
    solutions {
      problem {
        tier
      }
      solution
    }
  }
}
`

export const RESET_PROGRESS = gql`
  mutation RESET_PROGRESS {
  resetProgress {
    username
    avatar
    score
  }
}
`

export const UPDATE_AVATAR = gql`
  mutation UPDATE_AVATAR($avatar: String!) {
    updateAvatar(avatar: $avatar) {
      username
      avatar
    }
  }
`