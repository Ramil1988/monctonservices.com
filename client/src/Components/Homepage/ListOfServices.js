import styled from "styled-components";
import { Link } from "react-router-dom";

const ListOfServices = ({ data }) => {
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <List>
        {sortedData.map((item) => {
          return (
            <Card key={item.id}>
              <StyledLink to={`/${item.id}`}>
                <IconTile>
                  {item.icon ? (
                    <IconComponent
                      as={item.icon}
                      color={item.color || "var(--primary-start)"}
                    />
                  ) : item.imageSrc ? (
                    <Icon src={item.imageSrc} alt={item.name} />
                  ) : (
                    <FallbackIcon>
                      {(item.name || item.id || "?").charAt(0)}
                    </FallbackIcon>
                  )}
                </IconTile>
                <Accent />
                <ItemName>{item.name}</ItemName>
              </StyledLink>
            </Card>
          );
        })}
      </List>
    </>
  );
};

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  color: inherit;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.22s ease;
`;

const Card = styled.div`
  width: 260px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 16px;
  padding: 24px 22px 18px;
  color: var(--text);
  font-family: "Raleway", sans-serif;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, box-shadow 0.22s ease,
    border-color 0.22s ease;

  a:link {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    width: calc(50% - 24px);
    margin: 10px;
    padding: 20px 16px 14px;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
    border-color: var(--primary-start);
  }
`;

const ItemName = styled.h2`
  text-decoration: none;
  color: var(--text);
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
`;

const List = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Accent = styled.div`
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399);
  height: 3px;
  width: 88%;
  margin: 12px auto 0;
  border-radius: 999px;
`;

const IconTile = styled.div`
  height: 112px;
  width: 112px;
  margin: 0 auto 12px;
  border-radius: 22px;
  background: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
`;

const IconWrapper = styled.div`
  font-size: 48px;
  color: ${(props) => props.color || "var(--primary-start)"};
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const Icon = styled.img`
  height: 88px;
  width: 88px;
  object-fit: contain;
  border-radius: 16px;
`;

const FallbackIcon = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 28px;
  font-weight: 800;
  color: var(--pill-text);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
`;

export default ListOfServices;
