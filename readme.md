# RestAPI Verion
- [RestAPI Frontend](https://github.com/JCC0219/NodeJs-Exploration-RESTAPI/tree/RestAPI/frontend)
- [RestAPI Backend](https://github.com/JCC0219/NodeJs-Exploration-RESTAPI/tree/RestAPI/backend)

# GraphQL Version
- [GraphQL Frontend](https://github.com/JCC0219/NodeJs-Exploration-RESTAPI/tree/GraphQL/frontend)
- [GraphQL Backend](https://github.com/JCC0219/NodeJs-Exploration-RESTAPI/tree/GraphQL/backend)


# Configuration

1. To run this code, please configure a MongoDB Atlas database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

2. Modify the code at `app.js` to use your own database connection link.

```js
mongoose
  .connect("<paste your database api key here>")
  .then((result) => {
    console.log("connected to DB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
```

3. edit the sendgird apikeys , details can be view at code below [SendGrid Confiugration](#add-simple-sending-email-function)

## Run the Application

1. Install the required dependencies using the command:

```bash
npm install
npm start
```

## shortcut

- [GraphQl Simple Usage](#graphql)


## GraphQL

See the [official documentation](https://graphql.org/)

1. installation

```bash
npm install --save graphql express-graphql

```

2. configuration/initialization (schema)

```js
//build schema in graphql/schemajs
const { buildSchema } = require("graphql");

//type refers to object
//input refers to input arguments in mutation or query
module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
//.......
    input UserInputData{
        email: String!
        name: String!
        password: String!
    }
  `//......
//mutation : best practise for read write request
//query: best practise for read only request
`
      type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
        updatePost(id: ID!, postInput: PostInputData): Post!
        deletePost(id: ID!): Boolean
        updateStatus(status: String): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `);
```

3. configuration/initialization (resolvers):

```js
// graphql/resolvers
//initializae with module.expeorts{}
module.expeorts{
  //..
updateStatus: async function ({ status }, req) {
    //validation...
    const user = await User.findById(req.userId);
    //validation...
    user.status = status;
    await user.save();
    return { ...user._doc, _id: user._id.toString()};
  },
  //..
}
```

4. use the middleware eg.:

```js
const { graphqlHTTP } = require("express-graphql");
//..
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema, // link to graphql/schema
    rootValue: graphqlResolver, //link to the graphql/resolvers
    graphiql: true, //Allow IDE localhost:8080/graphql
  })
);
```

5. call from front end (no matter query(GET) or mutation(Post)) method should be set to **POST** request eg.:

```js
//user can choose what datas to return, in here we only return status 
//if name return is needed, just simply add 'name' under 'status' in the string
const graphqlQuery = {
  query: `
        mutation UpdateUserStatus($userStatus: String!) {
          updateStatus(status: $userStatus) {
            status
          }
        }
      `,
  variables: {
    userStatus: this.state.status,
  },
};
fetch("http://localhost:8080/graphql", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + this.props.token,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(graphqlQuery),
});
```
