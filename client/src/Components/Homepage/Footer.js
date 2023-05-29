import logo from "../../Pictures/logo-black.png";
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
          <NavFoot to="/about">
            <p>About the project</p>
          </NavFoot>
          <NavLinks>
            <StyledAnchor
              href="https://docs.google.com/forms/d/e/1FAIpQLSffu4RY9a9lgezB9TTJGPhQ-y1iicDpno781sITK4zuRqiohw/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Contact Us</p>
            </StyledAnchor>
          </NavLinks>
        </NavLinksContainer>
      </FooterContainer>
    </StyledFooter>
  );
};

const Logo = styled(NavLink)`
  display: block;

  & img {
    width: 300px;
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    & img {
      display: none;
    }
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: white;
  padding: 40px 0;
  border-top: 2px solid lightgray;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
  margin-left: 40px;
  margin-top: -5px;
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
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: black;
  margin-top: -5px;
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
  }
`;

export default Footer;
