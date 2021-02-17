const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString } = require('graphql');

const schemaOne = buildSchema(`
    type Account {
        name: String
        age: Int,
        sex: String,
        salary(city: String): Int
    }

    type Query {
        name: String
        age: Int,
        account(username: String!): Account
        accounts: [Account]
    }

    input AccountInput {
        name: String
        age: Int,
        sex: String
    }

    type Mutation {
        createAccount(input: AccountInput): Account
    }
`)

const root = {
    name() {
        return '李四'
    },
    age() {
        return 18
    },
    account({ username }) {
        return {
            name: username,
            age: 17,
            sex: '男',
            salary({ city }) {
                if (city === '上海') {
                    return 10000
                }
                return 3000
            }
        }
    },
    createAccount({ input }) {
        db[input.name] = input;
        return input;
    },
    accounts() {
        let arr = []
        for(const key in db) {
            arr.push(db[key])
        }
        return arr
    }
}

const AccountType = new GraphQLObjectType({
    name: 'Account',
    fields: {
        name: { type: GraphQLString },
        sex: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
})

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        account: {
            type: AccountType,
            args: {
                username: { type: GraphQLString }
            },
            resolve(_, { username }) {
                return {
                    name: '魔力',
                    sex: '男',
                    age: 20
                }
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType
})

let db = {}

const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/graphql', graphqlHTTP({
    schema: schemaOne,
    rootValue:root,
    graphiql: true
}))

app.listen(4000, () => console.log('listening port: 4000'));