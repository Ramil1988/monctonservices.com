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
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    & img {
      width: 200px;
      margin-left: 0;
    }
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: white;
  padding: 40px 0;
  margin-top: 50px;
  border-top: 2px solid lightgray;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 1024px) {
    align-items: center;
    margin: 20px;
  }
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

  @media (max-width: 768px) {
    margin-top: -20px;
    font-size: 12px;
  }
`;

export default Footer;
