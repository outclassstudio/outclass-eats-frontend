module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "outclass-eats",
      url: "http://localhost:4000/graphql",
    },
  },
};
