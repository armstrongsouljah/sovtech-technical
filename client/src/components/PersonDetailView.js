import { useQuery, gql } from "@apollo/client";
import { useParams } from 'react-router-dom'
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

function PersonDetailView({children}) {
    let params = useParams();

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
        
        const person = data.people.results.find(
            item => item.name.toLowerCase().match(params.name.toLocaleLowerCase()));
        return (
            <div className="row container">
                <div className="row ">
                    <h1 className="center white-text">{person.name}</h1>
                    <a className="btn" href="/">Back Home</a>
                    <Person className='col s12' person={person}/>
                </div>
            </div>
        )
    }
  
}

export default PersonDetailView;