import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";

const ListOfServices = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <List>
        {sortedData.map((item) => {
          return (
            <ItemDiv key={item.id}>
              <StyledLink to={`/${item.id}`}>
                <Item src={item.imageSrc} alt={item.name} />
                <Divider />
                <ItemName>{item.name}</ItemName>
              </StyledLink>
            </ItemDiv>
          );
        })}
      </List>
    </>
  );
};

const scaleAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  color: black;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: rotate(360deg);
  }
`;

const ItemDiv = styled.div`
  width: 200px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 25px;
  background-color: white;
  border-radius: 20px;
  padding: 25px;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 1.3px 17.9px rgba(0, 0, 0, 0.182), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  a:link {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    margin: 10px;
    padding: 20px;
  }

  ${({ index }) => css`
    animation: ${scaleAnimation} 10s ease-in-out infinite;
    animation-delay: ${index * 1}s;
  `}

  &:hover {
    ${({ index }) => css`
      animation: ${scaleAnimation} 0.5s ease-in-out infinite;
      animation-delay: ${index * 1}s;
    `}
  }
`;

const ItemName = styled.h2`
  text-decoration: none;
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

const List = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Divider = styled.div`
  background-color: lightgray;
  height: 2px;
  width: 80%;
  margin: auto;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const Item = styled.img`
  height: 80px;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    height: 80px;
  }
`;

export default ListOfServices;
