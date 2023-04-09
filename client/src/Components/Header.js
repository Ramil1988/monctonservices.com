import logo from "../Pictures/logo.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import SearchBar from "./SearchBar";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Wrapper>
      <Logo to={`/`} onClick={window.location.reload}>
        <img src={logo} alt="Logo" />
      </Logo>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      {currentUser && <UserName>Hello, {currentUser.name}</UserName>}
      <LoginButton />
      <LogoutButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Logo = styled(NavLink)`
  display: block;
  & img {
    width: 350px;
    margin: 20px;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.div`
  margin-right: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;

export default Header;
