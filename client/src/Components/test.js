import React from "react";
import { GrFacebook, GrInstagram, GrTwitter, GrYoutube } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/**
 *
 * @returns a simple footer element with navLinks to different selected pages
 */
const Footer = () => {
  return (
    <StyledFooter id="contact">
      <FooterContainer>
        <NavFoot to="/warranty">
          <p>Warranty</p>
        </NavFoot>
        <NavFoot to="/returns">
          <p>Returns</p>
        </NavFoot>
        <NavFoot to="/orderstatus">
          <p>Order Status</p>
        </NavFoot>
        <NavFoot to="/producthelp">
          <p>Product Help</p>
        </NavFoot>
      </FooterContainer>
      <FooterContainer>
        <NavFoot to="/contactinfo">
          <p>Contact Us</p>
        </NavFoot>
        <NavFoot to="newsletter">
          <p>Newsletter</p>
        </NavFoot>
        <NavFoot to="/helpcenter">
          <p>Help Center</p>
        </NavFoot>
        <NavFoot to="/faq">
          <p>FAQ</p>
        </NavFoot>
      </FooterContainer>
      <FooterContainer>
        <h1>Follow us:</h1>
        <FooterMediaWrapper>
          <GrFacebook size={30} />
          <GrInstagram size={30} />
          <GrYoutube size={30} />
          <GrTwitter size={30} />
        </FooterMediaWrapper>
      </FooterContainer>
    </StyledFooter>
  );
};

const FooterMediaWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const FooterContainer = styled.div`
  margin: 0px 10%;
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  & p {
    font-size: 1.3em;
    margin: 15px;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 98.9vw;
  background-color: black;
  height: 300px;
  color: white;
  bottom: 0;
  & p {
    cursor: pointer;
    line-height: 1.3;
  }
  & p:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  & p:hover:after {
    transform: scaleX(1);
  }
`;

const NavFoot = styled(NavLink)`
  text-decoration: none;
  color: white;
  & p {
    cursor: pointer;
    line-height: 1.3;
  }
  & p:after {
    display: block;
    content: "";
    border-bottom: solid 3px white;
    transform: scaleX(0);
    transition: transform 500ms ease-in-out;
  }
  & p:hover:after {
    transform: scaleX(1);
  }
`;

export default Footer;
