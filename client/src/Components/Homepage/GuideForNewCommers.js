import React from "react";
import styled, { keyframes } from "styled-components";
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
                You can also study at an Autoshool and gain three years of
                driving experience after completion. That will effect on your
                car insurance fee. The total list of insurance companies you can
                find in this
                <StyledAnchor
                  href="https://monctonservices.com/insurance"
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
            <SectionTextWrapper>
              <SectionTitle>Step 10: Find a family doctor</SectionTitle>
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
        <BounceInLeftAnimationIcon delay="11s">
          <Section>
            <SectionTextWrapper>
              <SectionTitle>
                Step 12: Additional support you might apply for
              </SectionTitle>
              <SectionText>
                <span>Visit Magma/Cafi</span>: Both of these organizations can
                assist you with a variety of essential needs, such as job
                searching, filing taxes, language courses, etc. Magma{" "}
                <StyledAnchor
                  href="https://magma-amgm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>{" "}
                Cafi{" "}
                <StyledAnchor
                  href="https://cafi-nb.org/wp2021/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                <br></br>
                <span>Daycare Assistance Program</span>: The Daycare Assistance
                Program offers financial support to families to help them pay
                the daycare cost of Early Learning and Childcare Centres for{" "}
                <StyledAnchor
                  href="https://www2.gnb.ca/content/gnb/en/services/services_renderer.14136.Daycare_Assistance_Program.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>{" "}
                We gathered for you daycares in Moncton, look it up here in this
                <StyledAnchor
                  href="https://monctonservices.com/daycares"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                <br></br>
                <span>Canada - New Brunswick Housing Benefit</span>: You might
                be eligible for Canada-New Brunswick Housing Benefit if you make
                under 50 000 CAD per year. It can cover up to 500 CAD of your
                rental payments. More information you can find here in this{" "}
                <StyledAnchor
                  href="https://socialsupportsnb.ca/en/simple_page/canada-new-brunswick-housing-benefit-application-form"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.
                </StyledAnchor>
                <br></br>
                <span>Food bank</span>: In the early days of your arrival in
                Canada, it might be necessary for your family to receive food
                from some volunteer organizations, like Peter McKee Community
                Food Centre. For more information call them +1 506 383-42-81 or
                visit at 475 St. George St, Moncton, NB E1C 1Y4.
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
  border-radius: 10px;
  background: linear-gradient(to right, #f2f2f2, #c4c4c4);

  @media (max-width: 1040px) {
    padding: 20px 10px;
  }

  @media (max-width: 768px) {
    padding: 10px 5px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 1040px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const TitleWrapper = styled.div`
  text-align: left;
  margin-left: 50px;

  @media (max-width: 1040px) {
    width: 90%;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
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

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const AboutSubtitle = styled.h2`
  font-size: 24px;
  font-weight: normal;
  color: #333;

  @media (max-width: 1040px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Section = styled.div`
  margin: 0px 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: start;
  min-height: 150px;
  animation: ${fadeIn} 2s ease-in;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }

  &:hover {
    transform: scale(1.01);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 0;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 1040px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SectionText = styled.p`
  font-size: 20px;
  line-height: 2;
  color: #333;

  & span {
    font-weight: bold;
  }

  @media (max-width: 1040px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledAnchor = styled.a`
  font-weight: bold;
  color: black;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 2s ease;

  &:hover {
    background-color: lightblue;
  }
`;

export default Guide;
