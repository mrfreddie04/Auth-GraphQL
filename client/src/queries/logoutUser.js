import gql from "graphql-tag"; 

const mutation = gql`
  mutation Logout {
    logout {
      id
      email
    }
  }
`;

export default mutation;