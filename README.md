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