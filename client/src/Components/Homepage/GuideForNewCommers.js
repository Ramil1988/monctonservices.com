import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { bounceInLeft } from "react-animations";

const bounceAnimation = keyframes`${bounceInLeft}`;

const BounceInLeftAnimationIcon = styled.div`
  animation: 2s ${bounceAnimation};
  animation-delay: ${(props) => props.delay || "0s"};
  animation-fill-mode: backwards;
`;

const Guide = () => {
  return (
    <AboutWrapper>
      <Header>
        <TitleWrapper>
          <AboutTitle>
            {" "}
            Welcome, Newcomer! Your essential first steps to do once settle in
            Moncton{" "}
          </AboutTitle>
          <AboutSubtitle>
            We are delighted to guide you through some invaluable resources to
            assist you in your early days in Canada.
          </AboutSubtitle>
        </TitleWrapper>
      </Header>
      <AboutContent>
        <BounceInLeftAnimationIcon delay="0s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 1: Before arriving reach out to Monctoncares
              </SectionTitle>
              <SectionText>
                If you are newcomers to Canada and planning your settlement in
                Moncton Call Monctoncares or Whatsapp on +1 506 588 5819 or use
                this
                <StyledAnchor
                  href="https://monctoncares.ca/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link
                </StyledAnchor>
                to connect with them. You can rely on them for airport and train
                pickups, as well as other accommodations needs.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="1s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 2: Start searching for an appartment
              </SectionTitle>
              <SectionText>
                We gathered for you local companies that provide appartments for
                rent. Use this
                <StyledAnchor
                  href="https://monctonservices.com/propertymanagement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link{" "}
                </StyledAnchor>{" "}
                and start calling them. You should schedule an appointment to
                look at an apartment as soon as possible, since they rarely call
                you back.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="2s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 3: Once found an appartment, reach out to NB Power and
                Internet provider to get your power and Internet set up
              </SectionTitle>
              <SectionText>
                You will need to call to NB Power by phone + 1 800 663 622 upon
                check-in. They issue electricity in your name. You can also sign
                up on their website in this
                <StyledAnchor
                  href="https://www.nbpower.com/Open/SignUp.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                Be aware that self-registration through their website takes two
                business days. When calling, the profile is made by the operator
                immediately. You must have some kind of ID (for example, a
                foreign passport) and the address of the rental place. Ask the
                operator to send info by email to check the opening of the
                profile. There are two major Internet providers in Moncton:
                Bell, Rogers and Eastlink. Call them and schedule an appointment
                for Internet set up.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="3s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 4: Get your Social Insurance Number (SIN)
              </SectionTitle>
              <SectionText>
                SIN - can be issued online, but it may be unpredictable to
                receive the final document in time. You can also make an
                appointment with Service Canada using this
                <StyledAnchor
                  href="https://eservices.canada.ca/en/reservation/application/?booking-privacy=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link
                </StyledAnchor>
                or by calling them +1 866 274-6627 and come in person a 95
                Foundry St, Moncton, NB E1C 5H7 and get the SIN the same day.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="4s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 5: Update Your Current Address for recieving your PR Cards
              </SectionTitle>
              <SectionText>
                Usually, you provide your future residence address at the border
                when landing. However, if you're uncertain about where you'll be
                living, you can always update your current address using this
                <StyledAnchor
                  href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/change-address.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                Please take note of this crucial step to ensure receipt of your
                PR Cards. You should receive your cards within three months.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="5s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 6: Apply for a Medicare Health Insurance card
              </SectionTitle>
              <SectionText>
                You need to visit any of two located in Moncton Service of New
                Brunswick (Service NB). One is located at 770 Main St, Moncton,
                NB E1C 1E3, another one at 200 Champlain St, Dieppe, NB E1A 1P1.
                You can also fill out this
                <StyledAnchor
                  href="https://www.pxw1.snb.ca/snb7001/e/1000/CSS-FOL-35-5012E.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  form
                </StyledAnchor>
                before visit Service NB.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="6s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>Step 7: Open Bank account</SectionTitle>
              <SectionText>
                You will need to open bank account to make any bank
                transactions. There are some branches in Moncton. For openning
                bank account you will need to provide your passport,
                confirmation of permanent residency (COPR) and current address.
                You will need to reach out to the bank in advance to book an
                appoitment. We gathered for you all bank branches in Moncton in
                this
                <StyledAnchor
                  href="https://monctonservices.com/banks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="7s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>Step 8: Get driver license</SectionTitle>
              <SectionText>
                First, you will need to pass theory test. Yo can practice tests
                here in this
                <StyledAnchor
                  href="https://tests.ca/new-brunswick/drivers-test-practice/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                Sign up for the road test after passing the theory and vision
                tests (because after these two procedures, the license category
                7.1 is assigned.). To book an appoitnment you will need to call
                them + 1 888 762-8600. All relevent information you can find in
                this
                <StyledAnchor
                  href="https://www2.snb.ca/content/snb/en/driving_tests.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="8s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 9: Apply for Canada child benefit and GST/HST credit
              </SectionTitle>
              <SectionText>
                Once all above steps done you will need to apply for a Canada
                child benefit here in this.
                <StyledAnchor
                  href="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-apply.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                Also, in most cases, all you have to do to receive the GST/HST
                credit each year is file your taxes, even if you have no income
                to report. Find more information here in this
                <StyledAnchor
                  href="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/gsthstc-apply.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="9s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>Step 10: Find a famil doctor</SectionTitle>
              <SectionText>
                Getting a family doctor in Moncton may take some time. Through
                Service NB you can register to be assigned a family doctor. If
                you do not have a family doctor you can use instead walk-in and
                after-hours medical clinics. Different clinics have different
                operating times and you will need to book an appoitment before
                going. We gathered for you all walk-in and after-hours medical
                clinics in Moncton here in this
                <StyledAnchor
                  href="https://monctonservices.com/walkinClinics"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="10s">
          <Section>
            <ImageIcon>
              <FontAwesomeIcon icon={faCheck} size="1x" />
            </ImageIcon>
            <SectionTextWrapper>
              <SectionTitle>
                Step 11: Register your children in school
              </SectionTitle>
              <SectionText>
                To register your children in school, contact the school where
                you live for an appointment. You will need immigration
                documents, proof of address and health care information
                including vaccines. There are two separate school system in New
                Brunswick - English (Anglophone) and French (Francophone). Visit
                the school board websites to find schools in your neighbourhood.
                Anglophone East School District
                <StyledAnchor
                  href="https://asdeast.nbed.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                Francophone East School District
                <StyledAnchor
                  href="https://francophonesud.nbed.nb.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
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
  background: linear-gradient(to right, #f2f2f2, #c4c4c4);

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

const TitleWrapper = styled.div`
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
  align-items: start;
  min-height: 150px;
  animation: ${fadeIn} 2s ease-in;

  &:hover {
    transform: scale(1.01);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SectionIcon = styled.span`
  font-size: 48px;
  margin-left: 10px;
  width: 150px;

  img {
    border-radius: 50%;
  }
`;

const ImageIcon = styled(SectionIcon)`
  img {
    border-radius: 0%;
  }
  flex-basis: 70px;
  flex-shrink: 0;
`;

const SectionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0;
  margin-left: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SectionText = styled.p`
  font-size: 20px;
  line-height: 2;
  color: #333;
`;

const StyledAnchor = styled.a`
  color: black;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 2s ease;

  &:hover {
    background-color: lightblue;
    font-weight: bold;
  }
`;

export default Guide;
