import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const ROOT_API = "/.netlify/functions/api";

const PopularServices = ({ types = [] }) => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchTopCompaniesByServiceTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(types)]);

  const fetchTopCompaniesByServiceTypes = async () => {
    const servicesWithTopCompanies = [];

    // Make all API calls in parallel for much faster loading
    const promises = types.map(async (serviceType) => {
      try {
        const response = await fetch(
          `${ROOT_API}/companies/${serviceType.id}?cities=Moncton,Dieppe,Riverview`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const companies = Array.isArray(data.data) ? data.data : [];

        const totalReviews = companies.reduce((sum, c) => sum + (c.reviews?.length || 0), 0);
        
        // Only include service types that have reviews
        if (totalReviews > 0) {
          const sortedCompanies = companies
            .slice()
            .sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0))
            .slice(0, 5);

          return {
            ...serviceType,
            topCompanies: sortedCompanies,
            totalReviews,
          };
        }
        return null;
      } catch (error) {
        console.error(
          `Error fetching companies for ${serviceType.name}:`,
          error
        );
        return null;
      }
    });

    // Wait for all requests to complete
    const results = await Promise.all(promises);
    
    // Filter out null results and sort by total reviews
    const validResults = results.filter(result => result !== null);
    const ordered = validResults
      .sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0))
      .slice(0, 3);
      
    setServicesData(ordered);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
`;

const ServiceBox = styled.div`
  width: 100%;
  padding: 14px 16px;
  background: rgba(255,255,255,0.06);
  color: var(--text);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  font-family: "Raleway", sans-serif;
  box-shadow: 0 6px 18px rgba(0,0,0,0.20);
  backdrop-filter: blur(6px);
  transition: transform 0.18s ease, box-shadow 0.22s ease, border-color 0.22s ease;

  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
    box-shadow: 0 14px 30px rgba(0,0,0,0.30);
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
