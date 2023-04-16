import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const RatingTable = () => {
  const { serviceType } = useParams();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompaniesByServiceType(serviceType);
  }, [serviceType]);

  const fetchCompaniesByServiceType = async (serviceType) => {
    try {
      const response = await fetch(`/companies/${serviceType}`);
      const data = await response.json();
      const companies = data.data;
      const sortedCompanies = companies.sort((a, b) => {
        return b.reviews.length - a.reviews.length;
      });
      setCompanies(sortedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  if (companies.length === 0) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Wrapper>
      <TableHeading>
        {serviceType.replace(/\b\w/g, (l) => l.toUpperCase())} Rating
      </TableHeading>
      <Table>
        <thead>
          <tr>
            <Th>Place</Th>
            <Th>Company Name</Th>
            <Th>Overall Rating</Th>
            <Th>Reviews</Th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => {
            const averageRating =
              company.reviews.length > 0
                ? (
                    company.reviews.reduce(
                      (sum, review) => sum + review.grade,
                      0
                    ) / company.reviews.length
                  ).toFixed(1)
                : 0;
            return (
              <tr key={company._id}>
                <Td>{index + 1}</Td>
                <Td>
                  <StyledLink to={`/company/${company._id}`}>
                    {company.name}
                  </StyledLink>
                </Td>
                <Td>{averageRating}</Td>
                <Td>{company.reviews.length}</Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
`;

const TableHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #003262;
`;

const Table = styled.table`
  font-size: 1.2rem;
  margin: auto;
  width: 90%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Th = styled.th`
  padding: 16px;
  background-color: #f8f9fa;
  border: 1px solid #d8d8d8;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 16px;
  border: 1px solid #d8d8d8;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    background-color: lightblue;
  }
`;

export default RatingTable;
