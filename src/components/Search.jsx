import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {

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

const FormStyle = styled.form`
    margin: 0rem 20rem;

    div {
        position: relative;
        width: 100%;
    }

    input {
        width: 100%;
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }
`;

export default Search