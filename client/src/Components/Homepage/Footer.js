import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
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

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: var(--surface);
  color: var(--text);
  padding: 30px 16px;
  border-top: 1px solid var(--surface-border);
  margin-top: auto;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavFoot = styled(NavLink)`
  text-decoration: none;
  color: var(--text);

  & p {
    font-size: 1rem;
    margin: 0;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  & p:after {
    display: block;
    content: "";
    border-bottom: solid 2px var(--primary-start);
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  & p:hover {
    color: var(--primary-start);
  }

  & p:hover:after {
    transform: scaleX(1);
  }
`;

const StyledAnchor = styled.a`
  text-decoration: none;
  color: var(--text);

  & p {
    font-size: 1rem;
    margin: 0;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  & p:after {
    display: block;
    content: "";
    border-bottom: solid 2px var(--primary-start);
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }

  & p:hover {
    color: var(--primary-start);
  }

  & p:hover:after {
    transform: scaleX(1);
  }
`;

export default Footer;
