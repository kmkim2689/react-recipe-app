# Recipe App

## Reference
* [React Crash Course - Build A Full Recipe App Tutorial](https://youtu.be/xc4uOzlndAk?feature=shared)

## API
* To Get Recipe Data : Spoonacular
    * https://spoonacular.com/food-api
    * Profile > `API Key`

* Warning : Up to 150 Requests Per Day
<br><br/>
---

## Groundworks

1. Store the API Key in a `.env` file
* root > create .env file
* The Reason Why
    * If API Key is exposed to the code...
    * Anyone can use that without permission -> unexpected costs ...
* To Protect Api Keys

    ```
    REACT_APP_API_KEY='apikeyapikey' // quotation mark needed
    ```

* How to Use the Values in JS?
    ```
    process.env.CONST_NAME
    ```

2. Get rid of unnecessary files
* Only needed :  App.js, index.css, index.js

3. Project Structure
* components
* pages

## Front Page(Home)
> **Make Components First**, assemble them in a page after making all the components needed

### pages > Home.jsx
* made up of two components
    
    
* components > Popular.jsx
    * trending(component > Popular.jsx)
    
* components > Veggie.jsx
    * vegeterian picks(component > Veggie.jsx)

> How to generate a new component?
<br></br>
-> install plugin : ES7++ React/Redux/React...
-> rfce

* **export & import needed** to make use of other components in one Component File

```
import React from 'react'

function Popular() {
  return (
    <div>Popular</div>
  )
}

export default Popular
```

```
import React from 'react'

function Veggie() {
  return (
    <div>Veggie</div>
  )
}

export default Veggie
```

```
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import React from 'react'

function Home() {
  return (
    <div>
        <Veggie />
        <Popular />
    </div>
  )
}

export default Home
```

```
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <h1>Hi</h1>
      <Home />
    </div>
  );
}

export default App;

```

### Generate Pages.jsx file : To Contain All the Pages
* to avoid the massive code size of App.js
    * Without Pages.jsx...
    ```
    // App.js
    <div className="App">
        <h1>Hi</h1>
        <Home />
        <AnotherPage />
        <AnotherPage 2 />
        <TheOtherPage />
        // ... too messy
    </div>
    ```

    * With Pages.jsx
    ```
    // App.js
    <div className="App">
        <h1>Hi</h1>
        <Pages /> // much clearer
    </div>

    // Pages.jsx
    // use routing...
    ```
* to use Routing for rendering all the pages

### Work on Popular.jsx
* Fetch the popular items from API
* Spoonacular API > Documentation > Get Random Recipes
    * https://spoonacular.com/food-api/docs#Get-Random-Recipes
    * to find random popular recipes
* url : https://api.spoonacular.com/recipes/random
* attach api key

1. make a function to fetch data from api -> use them in JSON Type

* functions
    * .json() : resolves to a JavaScript object.

```
// async : to make the function asynchronous
// data that we need to wait for...
// to make sure that the data is fetched before we render the component
const getPopular = async () => {
    // use backtick(``) to use the variable inside the string
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    // give json format to the data
    const data = await api.json();
    console.log(data);
}
```

2. invoke function using useEffect
* to invoke the function as soon as the component is rendered
* two main parameters
    * what to do : arrow function
    * the variances -> when they are changed, first parameter is invoked
        * when empty array -> only when the component is first rendered

    ```
    // useEffect : to run the function when the component is rendered
    useEffect(() => {
        getPopular();
    }, [])
    ```

3. set state variables
```
const [popular, setPopular] = useState([]); // to store the data from the api
// initial value for "popular" : empty array
```

* when data fetched from api, set popular variable using setPopular function
```
const getPopular = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    const data = await api.json();

    setPopular(data.recipes);
}
```

4. render data on the screen using `popular` state variable
```
import React, { useEffect, useState } from 'react'

function Popular() {
    
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
        const data = await api.json();
        console.log(data);

        setPopular(data.recipes);
    }

  return (
    <div>
        {popular.map((recipe) => {
            return (
                <div>
                    <p>{recipe.title}</p>
                </div>
            )
        })}
    </div>
  );
}

export default Popular
```

* what is the problem in this code?
    * Warning: Each child in a list should have a unique "key" prop.
    * when mapping/looping over stuff -> outputting on the screen..
        * unique identifier for each item needed
        * **just in case they get updated or removed from the dom -> position issue for rendering**

    * solution : add `key` prop into parent 


5. install packages
* things to install below

* all at once
`npm install framer-motion react-icons react-router-dom styled-components @splidejs/react-splide`

* separately
`npm install framer-motion`
`npm install react-icons`
`npm install react-router-dom` // for routing
`npm install styled-components` // for css in js
`npm install @splidejs/react-splide`// for customizable carousel

* how to check whether installed or not?
    * check package.json

6. make use of styled-components

```
import styled from "styled-components";
```

* what this allows us to do?
    * make a component to be attached styling without css files
    * make kind of a component only for styling -> attach to the component for rendering

* how to use it?
i. make a styled component
```
styled-component alias.htmltag`
    // css properties
    margin: 4rem 0rem;
`
```

ii. use as a component
```
<Wrapper>
    <h3>Popular Picks</h3>
</Wrapper>
```

* below is the same with
```
<div style="margin: 4rem 0rem">
    <h3>Popular picks</h3>
</div>
```

```
import React, { useEffect, useState } from 'react'
import styled from "styled-components";

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
        <Wrapper>
            <h3>Popular Picks</h3>
            {popular.map((recipe) => {
            return (
                // 아이템의 최상위 태그에 key를 넣어줘야 한다.
                <div key={recipe.id}>
                    // TODO Make a Card for Every Recipe
                </div>
            )
        })}
        </Wrapper>
        
    </div>

  );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

export default Popular
```

7. make card item for recipe
```
const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;

    img {
        border-radius: 2rem;
    }
`
```

```
<div>
    <Wrapper>
        <h3>Popular Picks</h3>
        {popular.map((recipe) => {
        return (
            // 아이템의 최상위 태그에 key를 넣어줘야 한다.
            <div key={recipe.id}>
                {/* // TODO Make a Card for Every Recipe */}
                <Card>
                    <p>
                        {recipe.title}
                    </p>
                    <img src={recipe.image} alt={recipe.title} />
                </Card>
            </div>
        )
    })}
    </Wrapper>
    
</div>
```

8. make a carousel for scrollable list(slides)
* https://splidejs.com/integration/react-splide/
```
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
```

* carousel : implement using Splide Component
* each individual item(card) : implement using SplideSlide Component

* how to customize carousel
    * inside <Splide>, use `options` prop
    ```
    <Splide options={{perPage: 4}}>
    ```

```
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
// https://splidejs.com/integration/react-splide/
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

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
        <Wrapper>
            <h3>Popular Picks</h3>
            <Splide options={{perPage: 4, arrows: false, pagination: false, drag: 'free', gap: '5rem'}}>
                // reason of `popular &&` : to make sure that the data is fetched before we render the component 
                {popular && popular.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <p>
                                    {recipe.title}
                                </p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
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

export default Popular
```

9. implement local storage
* using `localStorage`
* if there's nothing in the local storage, set the data
* if something's in the local storage, just set the popular state variable to it

```
const check = localStorage.getItem('popular');

// check data
if (check) { // if there is something
    setPopular(JSON.parse(check)); // to make the string into JSON
} else {
    // use backtick(``) to use the variable inside the string
    // "await" is only used inside the async function
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
    // give json format to the data
    const data = await api.json();
    console.log(data);

    // setLocalStorage : to store the data in the local storage
    // JSON.stringify : convert json type into string to store in the local storage
    localStorage.setItem("popular", JSON.stringify(data.recipes));

    setPopular(data.recipes);
}
```

---

### Styling on index.css
```
/* * : grab every element from dom */
* {
  margin: 0;
  padding: 0;  
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
    margin: 0% 20%; /* to make the horizontal margin */
}

h4 {
  font-size: 1rem;
  color: rgb(56, 56, 56);
}

h3 {
  font-size: 1.5rem;
  color: rgb(56, 56, 56);
  line-height: 2.5rem;
  margin: 2rem 0rem;
}

a {
  color: rgb(56, 56, 56);
}
```

* How to add fonts?
    * Google Fonts > Search Specific Font > https://fonts.google.com/specimen/Montserrat?query=montse
    * copy link tag
    ```
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    ```
    * paste it into public > index.html

---
### Veggie Component
* the same as Popular component

---
### Buttons for Category
* components > Category.jsx

* import icons needed
    * https://react-icons.github.io/react-icons/

    ```
    import { FaPizzaSlice, FaHamburger } from 'reaact-icons/fa';
    import { GiNoodles, GiChopsticks } from 'react-icons/gi';
    ```

* routing needed
```
import { NavLink } from 'react-router-dom';
```

* use icons
```
import { FaPizzaSlice, FaHamburger } from 'reaact-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Category() {
  return (
    <div>
        {/* a list with a bunch of different links - use react-router */}
        <div>
            <FaPizzaSlice />
            <h4>Italian</h4>
        </div>
        <div>
            <FaHamburger />
            <h4>American</h4>
        </div>        
        <div>
            <GiNoodles />
            <h4>Thai</h4>
        </div>
        <div>
            <GiChopsticks />
            <h4>Japanese</h4>
        </div>
    </div>
  )
}

export default Category
```

* use Category Component in App.js, not in Home.jsx
    * that buttons will be always displayed...
    * Home is one of the fragments that will be replaced according to the user click

* NavLink : to navigate to another route
    * properties
        * to : which route to go(string)
        


### Routing

* pages > Pages.jsx

```
import { BrowserRouter, Route, Routes } from 'react-router-dom';
```

* use React-router-dom
    * https://www.geeksforgeeks.org/what-is-react-router-dom/
    * https://www.geeksforgeeks.org/link-and-navlink-components-in-react-router-dom/


* setup <Routes>
    * an intelligent component that looks at the paths and figures out which route to render out
    * page들을 "Routes"로 감싼다


* setup <Route>
    * Routes 내부의 각 페이지들은 Route 컴포넌트들로 구현된다.
    * Route props
        * path : 해당 페이지의 path명
        * element : 실제로 렌더링할 페이지 컴포넌트
    * `dynamic routing` : use colon(:) and parameter name


```
import Category from '../components/Category';
import Home from './Home';
import React from 'react';
import Cuisines from './Cuisines';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisines />} />
      </Routes>
  )
}

export default Pages;
```

* components > Category.jsx
    * set up links to actually take us to those specific pages
    * make use of <NavLink>
        * differences from <Link>?
            * <NavLink> gives a class called 'active'
            * whenever the link is clicked, <NavLink> adds a class of active to it -> you can add specific styling associated to that

---
## Cuisine Page
* pages > Cuisines.jsx

```
import { FaPizzaSlice, FaHamburger } from 'reaact-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Category() {
  return (
    <List>
        {/* a list with a bunch of different links - use react-router */}
        <NavLink to={'/cuisine/Italian'}>
            <FaPizzaSlice />
            <h4>Italian</h4>
        </NavLink>
        <NavLink to={'/cuisine/American'}>
            <FaHamburger />
            <h4>American</h4>
        </NavLink>        
        <NavLink to={'/cuisine/Thai'}>
            <GiNoodles />
            <h4>Thai</h4>
        </NavLink>
        <NavLink to={'/cuisine/Japanese'}>
            <GiChopsticks />
            <h4>Japanese</h4>
        </NavLink>
    </List>
  )
}

const List = styled.div`
    display: flex;
    // Flex 아이템들은 가로 방향으로 배치되고, 자신이 가진 내용물의 width 만큼만 차지하게 되지요. 마치 inline 요소들 처럼요. height는 컨테이너의 높이만큼 늘어납니다.
    justify-content: center;
    margin: 2rem 0rem;
`;



export default Category
```

* App.js
    * setup BrowserRouter
        * browser router around the pages is needed
        * when setting up react router, browser router which gives the functionality for routes to work is needed
        * Router 관련 모든 컴포넌트들의 상위 계층에 위치해야함
        * gives the ability for the routes to work 

    ```
    import { BrowserRouter } from "react-router-dom";
    import Category from "./components/Category";
    import Pages from "./pages/Pages";

    function App() {
    return (
        <div className="App">
        <BrowserRouter>
            <Category />
            <Pages />
        </BrowserRouter>
        </div>
    );
    }

    export default App;

    ```

### Cuisine Page

* setting up
```
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
```

* What is useParams?
    * for making use of `dynamic routing`
    * to pull out the keyword from up here and the url
    * useParams() 실행 시, type 키와 그에 해당하는 값을 가진 객체가 반환된다.
    * useParams()를 할당한 변수의 type을 조회하여 라우터로부터 넘겨받은 값을 활용할 수 있게 된다.

    * useEffect와 함께 활용 시 주의점
        * 두 번째 변수에 useParams()의 반환값인 변수 자체를 넣는 것이 아니라 type를 넣어야 type이 변경 시 첫 번째 매개변수가 다시 실행
        ```
        useEffect(() => {
            console.log(params);
            getCuisine(params.type);
        }, [params.type]);

        const [cuisine, setCuisine] = useState([]); // to store the data from the api

        // useParams : to get the parameter from the route path defined in Pages.jsx => making use of "dynamic routing"
        const getCuisine = async (name) => {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
            const recipes = await data.json();
            setCuisine(recipes.results);
        }
        ```

### Styling up each NavLink Page
* use styled-components
    * using styled-components parameter, we can style other components
    * `styled(ComponentName)`

* components > Category.jsx

    ```
    const SLink = styled(NavLink)`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 50%; // just to make it look like a circle
    `;
    ```

    * replace NavLink -> SLink
    ```
    function Category() {
        return (
            <List>
                {/* a list with a bunch of different links - use react-router */}
                <SLink to={'/cuisine/Italian'}>
                    <FaPizzaSlice />
                    <h4>Italian</h4>
                </SLink>
                <SLink to={'/cuisine/American'}>
                    <FaHamburger />
                    <h4>American</h4>
                </SLink>        
                <SLink to={'/cuisine/Thai'}>
                    <GiNoodles />
                    <h4>Thai</h4>
                </SLink>
                <SLink to={'/cuisine/Japanese'}>
                    <GiChopsticks />
                    <h4>Japanese</h4>
                </SLink>
            </List>
        )
    }
    ```

### Search Component
```
import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

function Search() {
  return (
    <div>Search</div>
  )
}

export default Search
```

* make use of <input> inside <form>

* to implement search function
    * get the value of the input text

```
function Search() {

    const [input, setInput] = useState('');
    // get the input from the user

    // submitHandler : to deal with the enter key press
    const submitHandler = (e) => {
        // preventDefault : to prevent the page from refreshing
        // components that don't need to be updated when the state changes
        e.preventDefault();
        console.log(input);
    }


  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            {/* add state value in input + onChange use event*/}
            <input 
            type="text" 
            value={input} 
            placeholder="Search" 
            onChange={(e) => setInput(e.target.value)} />
        </div>
    </FormStyle>
  )
}
```

* add route for Search Page
```
function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisines />} />
        <Route path='/search/:query' element={<SearchResult />} />
      </Routes>
  )
}

export default Pages;
```

* 앞의 예시와는 달리, 검색 결과는 <NavLink>를 통해 검색 결과 페이지로 이동하는 것으로 구현하지 않음. form에 텍스트를 입력하고 enter 키를 눌렀을 때 페이지로 이동하도록 해야함
    * 사용자가 특정 페이지로 이동할 수 있도록 하는 별도의 함수로 구현하는 것이 필요
    * 이것을 위해, `useNavigate` 활용
    * Search.jsx
        ```
        import { useNavigate } from 'react-router-dom';
        ```
        ```
        const [input, setInput] = useState('');
        // get the input from the user
        const navigate = useNavigate();

        // submitHandler : to deal with the enter key press
        const submitHandler = (e) => {
            // preventDefault : to prevent the page from refreshing
            // components that don't need to be updated when the state changes
            e.preventDefault();
            console.log(input);

            // navigate to the search page
            navigate('/search/' + input);
        }
        ```