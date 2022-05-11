import { useQuery, gql } from "@apollo/client";

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


function Person({person, className}) {
    const {name, mass, homeworld, gender, height } = person;
    
    return (
        <div className={`card  blue darken-1 ${className}`}>
            <div className="card-content white-text">
                <span className="card-title">
                  {name}
                </span>
                <p>Mass: {mass}</p>
                <p>Gender: {gender}</p>
                <p>Height: {height}</p>
                <p>Home World: {homeworld}</p>
            </div>
        </div>
    )
}

export default Person;