import { ApolloServer, gql } from "apollo-server"

const persons = [
    {
        name: "Midu",
        phone: "+52 5555 5555",
        street: "Calle Frontend",
        city: "Barcelona",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Youseff",
        phone: "+52 5555 5555",
        street: "Calle Frontend",
        city: "CDMX",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Hugo",
        street: "Calle Frontend",
        city: "Texcoco",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
]

const typeDefs = gql`
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query {
        personCount: Int!
        allPersons: [Person]!,
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(3000).then(({url}) => {
    console.log(`Server ready at ${url}`)
})