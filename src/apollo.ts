import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            //!field의 값을 반환
            //?reactivevar의 경우 함수형으로 표현
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
