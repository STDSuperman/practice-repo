import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

const typeDefs = gql`
  type Account {
    name: String
    age: Int
    sex: String
    salary(city: String): Int
  }

  type Query {
    name: String
    age: Int
    account(username: String!): Account
    accounts: [Account]
  }

  input AccountInput {
    name: String
    age: Int
    sex: String
  }

  type Mutation {
    createAccount(input: AccountInput): Account
  }
`
const db = {}

const resolvers = {
  Mutation: {
    createAccount({ input }) {
      db[input.name] = input
      return input
    }
  },
  Query: {
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
    accounts() {
      let arr = []
      for (const key in db) {
        arr.push(db[key])
      }
      return arr
    }
  }
}

startApolloServer(typeDefs, resolvers)
