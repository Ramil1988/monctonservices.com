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
  color: inherit;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.22s ease;
`;

const ItemDiv = styled.div`
  width: 200px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 16px;
  padding: 22px;
  color: #e5e7eb;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  a:link {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    margin: 10px;
    padding: 18px;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    border-color: rgba(99, 102, 241, 0.45);
  }
`;

const ItemName = styled.h2`
  text-decoration: none;
  color: #e5e7eb;
  font-size: 16px;
  font-weight: 700;
  margin-top: 8px;
`;

const List = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Divider = styled.div`
  background: linear-gradient(90deg, rgba(99,102,241,0.5), rgba(34,211,238,0.5));
  height: 2px;
  width: 80%;
  margin: 10px auto 12px;
  border-radius: 999px;
`;

const Item = styled.img`
  height: 72px;
  border-radius: 16px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);

  @media screen and (max-width: 768px) {
    height: 72px;
  }
`;

export default ListOfServices;
