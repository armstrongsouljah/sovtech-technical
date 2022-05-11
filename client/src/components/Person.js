function Person({person, className}) {
    const {name, mass, homeworld, gender, height } = person;
    return (
        <div className={`card ${className}`}>
            <div className="card-content">
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