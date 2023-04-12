import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allTodos: {
          merge(existing = [], incoming) {
            return [...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000'}),
  cache: cache
});




export default client;
