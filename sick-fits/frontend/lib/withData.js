import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers }) {
  return new ApolloClient({
    // credentials: "include",
    // connectToDevTools: true,
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: "include",
        },
        headers,
      });
    },

    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, client) {
            // 1. read the cart cartOpen value from the cache
            const { cartOpen } = client.cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });

            // 2. Write the cart state to the opposite
            const data = {
              data: { cartOpen: !cartOpen },
            };
            client.cache.writeData(data);

            // This will fix "Missing field in * in {} warning"
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
