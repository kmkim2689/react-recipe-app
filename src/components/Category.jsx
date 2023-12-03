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