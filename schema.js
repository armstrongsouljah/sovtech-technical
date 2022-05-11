const { 
    GraphQLObjectType,
    GraphQLInt, GraphQLString,
    GraphQLList,
    GraphQLSchema } = require('graphql');
const axios = require('axios');

const PersonType = new GraphQLObjectType({
    name: 'Person', 
    fields: () => ({
        name: { type: GraphQLString },
        height: { type: GraphQLInt },
        mass: { type: GraphQLInt },
        gender:  { type: GraphQLString },
        homeworld: {type: GraphQLString}
        })        
});

const PeopleResponseType = new GraphQLObjectType({
    name: 'PeopleResponse',
    fields: () => ({
        count: { type: GraphQLInt},
        next: {type: GraphQLString},
        previous: {type: GraphQLString},
        results: { type: new GraphQLList(PersonType)}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        people: {
            type: PeopleResponseType,
            resolve(parent, args) {
                return axios.get(`https://swapi.dev/api/people`)
                       .then(res => res.data)
            }
        },
        person: {
            type: PersonType,
            args: {
              id: { type: GraphQLInt },
              name: { type: GraphQLString }
            },
            resolve(parent, args) {
                const {id} = args
                    return axios.get(`https://swapi.dev/api/people/${id}/`)
                            .then(res => res.data)
            }
        },
        searchPerson: {
            type: PeopleResponseType,
            args: {
              name: { type: GraphQLString }
            },
            resolve(parent, args) {
                const {name} = args
                    console.log('searching by name ', name)
                    return axios.get('https://swapi.dev/api/people/?search='+name)
                            .then(res => res.data)
                // }  
            }
        },

    }
});


exports.schema = new GraphQLSchema({
    query: RootQuery,
})
