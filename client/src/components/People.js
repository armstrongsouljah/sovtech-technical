import { useQuery, gql } from "@apollo/client";
import {Link} from 'react-router-dom'
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
        return (
            <div className="row">
                <div className="row">
                    <input className="white-text" itemType="text" placeholder="Search Actors" />
                    {
                        data.people.results.map(person => 
                            (<Link to={'/'+person.name.split(" ")[0].toLowerCase()}><Person className='col m6 s12' person={person}/></Link>))
                    }
                </div>
                
                 
            </div>
        )
    }
  
}

export default People;