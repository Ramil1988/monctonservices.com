import styled from "styled-components";
import { Link } from "react-router-dom";

const ListOfItems = ({ data }) => {
  return (
    <>
      <List>
        {data.map((item) => {
          return (
            <ItemDiv key={item.id}>
              <Link to={`companies/${item.id}`}>
                <Item src={item.imageSrc} alt={item.name} />
                <Divider />
                <ItemName>{item.name}</ItemName>
              </Link>
            </ItemDiv>
          );
        })}
      </List>
    </>
  );
};

const ItemDiv = styled.div`
  width: 150px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
  margin-bottom: 80px;
  background-color: white;
  border-radius: 16px;
  border-color: black;
  padding: 30px;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 1.3px 17.9px rgba(0, 0, 0, 0.182), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);

  & p {
    font-size: 20px;
    font-style: italic;
    color: lightgray;
    font-weight: bold;
  }

  a:link {
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    margin: 10px;
    padding: 20px;
  }
`;

const ItemName = styled.h1`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;

const List = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Divider = styled.div`
  background-color: lightgray;
  height: 2px;
  width: 120px;
  margin: auto;
`;

const Item = styled.img`
  height: 90px;
  border-radius: 16px;
  margin: 20px;

  @media screen and (max-width: 768px) {
    height: 60px;
    margin: 10px;
  }
`;

export default ListOfItems;
