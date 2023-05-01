import styled, { keyframes } from "styled-components";
import logo from "/Users/ramilsharapov/Desktop/monctonservices.com/client/src/Pictures/avatar.png";
import ramil from "/Users/ramilsharapov/Desktop/monctonservices.com/client/src/Pictures/Ramil.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <AboutWrapper>
      <Header>
        <Logo src={logo} alt="Logo" />
        <TitleWrapper>
          <AboutTitle>
            {" "}
            Hello our valuable visitor of monctonservices.com!
          </AboutTitle>
          <AboutSubtitle>
            If you are searching for the best services in Moncton, we are the
            ultimate resource for you.
          </AboutSubtitle>
        </TitleWrapper>
      </Header>
      <AboutContent>
        <Section>
          <SectionIcon>
            <SectionIcon>🎯</SectionIcon>
          </SectionIcon>
          <SectionTextWrapper>
            <SectionTitle>Mission</SectionTitle>
            <SectionText>
              The primary objective of this website is to present a carefully
              curated selection of service providers in Moncton, systematically
              arranged according to customer evaluations and testimonials. This
              approach ensures that users are provided with reliable and
              credible options in their search for quality services.
            </SectionText>
          </SectionTextWrapper>
        </Section>
        <Section>
          <SectionIcon>
            <FontAwesomeIcon icon={faEye} size="1x" />
          </SectionIcon>
          <SectionTextWrapper>
            <SectionTitle>Vision</SectionTitle>
            <SectionText>
              Create a user-friendly platform that connects people with
              top-rated service providers in Moncton. By focusing on real
              customer reviews, we aim to help users make informed choices while
              supporting local businesses and strengthening our community.
            </SectionText>
          </SectionTextWrapper>
        </Section>
        <Section>
          <SectionIcon>
            <img src={ramil} width="80" height="80" />
          </SectionIcon>
          <SectionTextWrapper>
            <SectionTitle>Developer</SectionTitle>
            <SectionText>
              Greetings to you! I am Ramil Sharapov, the sole creator behind
              this website. Driven by a passion to serve, I have designed it
              with you in mind, offering it freely for your benefit. May my
              efforts aid you in discovering precisely what you seek. Your
              thoughts and feedback are invaluable to me, so please do not
              hesitate to connect through this
              <StyledAnchor
                href="https://docs.google.com/forms/d/e/1FAIpQLSffu4RY9a9lgezB9TTJGPhQ-y1iicDpno781sITK4zuRqiohw/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Form.
              </StyledAnchor>
              Let us embark on this journey together!
            </SectionText>
          </SectionTextWrapper>
        </Section>
      </AboutContent>
    </AboutWrapper>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AboutWrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 50px 20px;
  font-family: "Raleway", sans-serif;
  animation: ${fadeIn} 2s ease-in;
  border-radius: 10px;
  background-color: #f2f2f2;

  @media (max-width: 1040px) {
    padding: 20px 10px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 1040px) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 500px;

  @media (max-width: 1040px) {
    display: none;
  }

  @media (max-width: 1040px) {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  width: 60%;
  text-align: left;
  margin-left: 50px;

  @media (max-width: 1040px) {
    width: 90%;
    margin-left: 0;
  }
`;

const AboutTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;

  @media (max-width: 1040px) {
    font-size: 30px;
  }
`;

const AboutSubtitle = styled.h2`
  font-size: 24px;
  font-weight: normal;
  color: #333;
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  animation: ${fadeIn} 2s ease-in;
`;

const SectionIcon = styled.span`
  font-size: 48px;
  margin-left: 10px;
  width: 150px;

  img {
    border-radius: 50%;
  }
`;

const SectionTextWrapper = styled.div``;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const SectionText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  margin-left: 20px;
`;

const StyledAnchor = styled.a`
  color: black;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 2s ease;

  &:hover {
    background-color: lightblue;
  }
`;

export default About;
