import logo from "../Pictures/logo-black.png";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <Logo to={`/`} onClick={window.location.reload}>
          <img src={logo} alt="Logo" />
        </Logo>
        <NavLinksContainer>
          <NavLinks>
            <NavFoot to="/contactinfo">
              <p>Contact Us</p>
            </NavFoot>
            <NavFoot to="/about">
              <p>About the project</p>
            </NavFoot>
          </NavLinks>
        </NavLinksContainer>
      </FooterContainer>
    </StyledFooter>
  );
};

const Logo = styled.div`
  display: block;

  & img {
    width: 300px;
    margin-bottom: 20px;
    margin-left: 20px;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: white;
  padding: 40px 0;
  margin-top: 30px;
  border-top: 2px solid lightgray;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavFoot = styled(NavLink)`
  text-decoration: none;
  color: black;
  margin-top: -20px;
  margin-left: 40px;

  & p {
    font-size: 1.1em;
    margin: 0;
    cursor: pointer;
  }

  & p:after {
    display: block;
    content: "";
    border-bottom: solid 2px black;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  & p:hover:after {
    transform: scaleX(1);
  }
`;

export default Footer;
