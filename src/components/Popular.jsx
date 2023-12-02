import React, { useEffect, useState } from 'react'

function Popular() {
    
    const [popular, setPopular] = useState([]); // to store the data from the api

    // useEffect : to run the function when the component is rendered
    useEffect(() => {
        getPopular();
    }, []);

    // async : to make the function asynchronous
    // await : to wait for the data to be fetched
    // data that we need to wait for...
    // to make sure that the data is fetched before we render the component
    const getPopular = async () => {
        // use backtick(``) to use the variable inside the string
        // "await" is only used inside the async function
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        // give json format to the data
        const data = await api.json();
        console.log(data);

        setPopular(data.recipes);
    }

  return (
    <div>
        {popular.map((recipe) => {
            return (
                <div key={recipe.id}>
                    <p>{recipe.title}</p>
                </div>
            )
        })}
    </div>
  );
}

export default Popular