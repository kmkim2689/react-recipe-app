import React, { useEffect, useState } from 'react'
import styled from "styled-components";
// https://splidejs.com/integration/react-splide/
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Veggie() {

  const [veggie, setVeggie] = useState([]); // to store the data from the api

  // useEffect : to run the function when the component is rendered
  useEffect(() => {
      getVeggie();
  }, []);

  // async : to make the function asynchronous
  // await : to wait for the data to be fetched
  // data that we need to wait for...
  // to make sure that the data is fetched before we render the component
  const getVeggie = async () => {
      const check = localStorage.getItem("veggie");

      if (check) {
          setVeggie(JSON.parse(check));
          return;
      } else {
          // use backtick(``) to use the variable inside the string
          // "await" is only used inside the async function
          const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
          // give json format to the data
          const data = await api.json();
          console.log(data);

          // set localStorage : to store the data in the local storage
          localStorage.setItem("veggie", JSON.stringify(data.recipes));

          setVeggie(data.recipes);
      }

  }


  return (
    <div>
        <Wrapper>
            <h3>Vegeterian Picks</h3>
            <Splide options={{perPage: 3, arrows: false, pagination: false, drag: 'free', gap: '5rem'}}>
                {/* // reason of `popular &&` : to make sure that the data is fetched before we render the component  */}
                {veggie && veggie.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                              <Link to={`/recipe/${recipe.id}`}>
                                <p>
                                      {recipe.title}
                                  </p>
                                  <img src={recipe.image} alt={recipe.title} />
                                  <Gradient />
                              </Link>
                            </Card>
                        </SplideSlide>
                    )
                })}
            </Splide>

        </Wrapper>
        
    </div>

  );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;

    img {
        border-radius: 2rem;
        positon: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; // not to stretch the image
    }

    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        fontsize: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const Gradient = styled.div`
    z-index:3;
    height: 100%;
    width: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
    position: absolute;
`

export default Veggie