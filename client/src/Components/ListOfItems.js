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
`;

const Item = styled.img`
  height: 90px;
  border-radius: 20px;
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    height: 60px;
    margin-bottom: 10px;
  }
`;

export default ListOfItems;
