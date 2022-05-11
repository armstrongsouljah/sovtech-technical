import { useQuery, gql } from "@apollo/client";
import Person from "./Person";

const GET_PEOPLE = gql`
        {
            people {
                results {
                    name
                    height
                    mass
                    gender
                    homeworld
                }
            }
        }
`

function People({children}) {

    const {data, loading, error} = useQuery(GET_PEOPLE, {
        pollInterval: 200,
    })
    if(loading) {
        return(
            <span className='white-text cente'>Loading....</span>
        )
    }
 
    if(error) {
        console.log('error ', error)
        return (
            <span className='white-text center'>Error happened. </span>
        )
    }
    if(data) {
        console.log('>>>>>', data)
        return (
            <div className="row">
                {
                    data.people.results.map(person => 
                        (<Person className='col m6 s12' person={person}/>))
                }
                 
            </div>
        )
    }
  
}

export default People;