import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { makeVar } from '@apollo/client';

// Reactive variable to store logged-in user
export const currentUserVar = makeVar<{ id: string; name: string; email: string; fitnessGoal?: string; isProfileComplete: boolean } | null>(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/graphql';
console.log(API_BASE_URL);
if (!API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not defined in .env file. Using default:', API_BASE_URL);
}

// Auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: API_BASE_URL,
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentUser: {
            read() {
              return currentUserVar();
            },
          },
        },
      },
    },
  }),
});

export default client;