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
              <SectionTitle step="1">
                Before arriving reach out to Monctoncares
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
              <SectionTitle step="2">
                Start searching for an apartment
              </SectionTitle>
              <SectionText>
                We gathered for you local companies that provide apartments for
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
              <SectionTitle step="3">
                Set up Power and Internet with NB Power
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
                profile. The major Internet providers in Moncton: Bell, Rogers
                and Eastlink. Call them and schedule an appointment for Internet
                set up.
              </SectionText>
            </SectionTextWrapper>
          </Section>
        </BounceInLeftAnimationIcon>
        <BounceInLeftAnimationIcon delay="3s">
          <Section>
            <SectionTextWrapper>
              <SectionTitle step="4">
                Get your Social Insurance Number (SIN)
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
              <SectionTitle step="5">
                Update Current Address for PR Cards
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
              <SectionTitle step="6">
                Apply for Medicare Health Insurance
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
              <SectionTitle step="7">Open Bank Account</SectionTitle>
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
              <SectionTitle step="8">Get Driver License</SectionTitle>
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
                You can also study at an Driving school and gain three years of
                driving experience after completion. That will effect on your
                car insurance fee. Wa gathered for you all Driving schools in
                Moncton here in this{" "}
                <StyledAnchor
                  href="https://monctonservices.com/drivingschool"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link,
                </StyledAnchor>
                as well as insurance companies in this
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
              <SectionTitle step="9">
                Apply for Child Benefit and GST/HST Credit
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
              <SectionTitle step="10">Find a Family Doctor</SectionTitle>
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
              <SectionTitle step="11">
                Register Children in School
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
              <SectionTitle step="12">
                Additional Support Resources
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
  max-width: 1000px;
  margin: 16px auto;
  padding: 32px 20px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--background);
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px 16px;
    margin: 12px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
    margin: 8px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
  background: linear-gradient(135deg, var(--primary-start) 0%, var(--primary-end) 100%);
  border-radius: 16px;
  padding: 40px 24px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 32px;
    padding: 32px 20px;
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const AboutTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const AboutSubtitle = styled.h2`
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 400;
  line-height: 1.5;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Section = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.6s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary-start);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: var(--primary-start);

    &::before {
      transform: scaleY(1);
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTextWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 12px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '${props => props.step}';
    background: var(--primary-start);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
    flex-shrink: 0;
  }
`;

const SectionText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
  margin: 0;

  & span {
    font-weight: 600;
    color: var(--text);
    background: rgba(var(--primary-rgb), 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const StyledAnchor = styled.a`
  font-weight: 600;
  color: var(--primary-start);
  text-decoration: none;
  padding: 3px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin: 0 2px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.2);

  &::after {
    content: '↗';
    font-size: 0.8em;
    opacity: 0.7;
  }

  &:hover {
    background: var(--primary-start);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(var(--primary-rgb), 0.3);
  }
`;

export default Guide;
