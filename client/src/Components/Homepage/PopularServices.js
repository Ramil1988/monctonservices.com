import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceTypes } from "../serviceTypes";
import { AiFillStar } from "react-icons/ai";

const ROOT_API = "/.netlify/functions/api";

const PopularServices = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchTopCompaniesByServiceTypes();
  }, []);

  const fetchTopCompaniesByServiceTypes = async () => {
    const servicesWithTopCompanies = [];

    const selectedServiceTypes = [
      serviceTypes.hotels,
      serviceTypes.beautysalons,
      serviceTypes.dentalclinics,
    ];

    for (const serviceType of selectedServiceTypes) {
      try {
        const response = await fetch(`${ROOT_API}/companies/${serviceType.id}`);
        const data = await response.json();
        const companies = data.data;

        const sortedCompanies = companies
          .sort((a, b) => b.reviews.length - a.reviews.length)
          .slice(0, 5);

        servicesWithTopCompanies.push({
          ...serviceType,
          topCompanies: sortedCompanies,
        });
      } catch (error) {
        console.error(
          `Error fetching companies for ${serviceType.name}:`,
          error
        );
      }
    }

    setServicesData(servicesWithTopCompanies);
  };

  return (
    <ServiceBoxesWrapper>
      {servicesData.map((service) => (
        <ServiceBox key={service.id}>
          <ServiceTitle>{service.name}</ServiceTitle>
          <TopCompanies>
            {service.topCompanies.map((company) => {
              const averageGrade = company.reviews.length
                ? (
                    company.reviews.reduce(
                      (sum, review) => sum + review.grade,
                      0
                    ) / company.reviews.length
                  ).toFixed(1)
                : 0;
              return (
                <Company key={company._id}>
                  <Wrapper>
                    <Name to={`/company/${company._id}`}>
                      <CompanyName>{company.name}</CompanyName>
                    </Name>
                    <AverageGrade>
                      <AiFillStar />
                      {averageGrade}
                    </AverageGrade>
                  </Wrapper>
                  <CompanyReviews>
                    {company.reviews.length} reviews
                  </CompanyReviews>
                </Company>
              );
            })}
          </TopCompanies>
        </ServiceBox>
      ))}
    </ServiceBoxesWrapper>
  );
};

const ServiceBoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 32px;
`;

const ServiceBox = styled.div`
  width: 360px;
  padding: 18px 20px;
  background: rgba(255,255,255,0.06);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-6px);
    cursor: pointer;
    box-shadow: 0 18px 40px rgba(0,0,0,0.35);
    border-color: var(--primary-start);
  }
`;

const ServiceTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
`;

const TopCompanies = styled.ul`
  list-style-type: none;
  padding: 5px;
  margin-bottom: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Company = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const CompanyName = styled.span`
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
`;

const Name = styled(Link)`
  font-size: 0.95rem;
  text-decoration: none;
  position: relative;
  color: inherit;
`;

const AverageGrade = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text);
  margin-right: 5px;

  svg {
    color: #fbbf24;
    margin-right: 4px;
  }
`;

const CompanyReviews = styled.span`
  font-size: 13px;
  color: var(--muted);
`;

export default PopularServices;
