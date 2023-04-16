import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceTypes } from "./serviceTypes";
import { AiFillStar } from "react-icons/ai";

const PopularServices = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchTopCompaniesByServiceTypes();
  }, []);

  const fetchTopCompaniesByServiceTypes = async () => {
    const servicesWithTopCompanies = [];

    const selectedServiceTypes = [
      serviceTypes.restaurants,
      serviceTypes.autodealership,
      serviceTypes.beautysalons,
    ];

    for (const serviceType of selectedServiceTypes) {
      try {
        const response = await fetch(`/companies/${serviceType.id}`);
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
            {service.topCompanies.map((company, index) => {
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
  margin-top: 40px;
`;

const ServiceBox = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 1.3px 17.9px rgba(0, 0, 0, 0.182), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const ServiceTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
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
  font-weight: 500;
  color: #333;
  text-decoration: none;
`;

const Name = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  position: relative;

  &:hover {
    background-color: lightblue;
  }
`;

const AverageGrade = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-right: 5px;

  svg {
    color: gold;
    margin-right: 2px;
  }
`;

const CompanyReviews = styled.span`
  font-size: 14px;
  color: #777;
`;

export default PopularServices;
