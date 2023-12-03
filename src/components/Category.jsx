import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import styled from 'styled-components';
import React from 'react';
import { NavLink } from 'react-router-dom';

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

const List = styled.div`
    display: flex;
    // Flex 아이템들은 가로 방향으로 배치되고, 자신이 가진 내용물의 width 만큼만 차지하게 되지요. 마치 inline 요소들 처럼요. height는 컨테이너의 높이만큼 늘어납니다.
    justify-content: center;
    margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%; // just to make it look like a circle
    margin-right: 2rem;
    text-decoration: none;
    background: linear-gradient(35deg, rgba(0,0,0,0), rgba(0,0,0,0.7));
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4 {
        color: white;
        fontsize: 0.8rem;
    }

    svg {
        color: white;
        fontsize: 1.5rem;
    }

    &.active {
        background: linear-gradient(to right, #f27121, #e94057, #8a2387);

        svg {
            color: white;
        }

        h4 {
            color: white;
        }
    }
`;



export default Category