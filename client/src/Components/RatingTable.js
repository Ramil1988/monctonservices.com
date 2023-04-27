import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

const RatingTable = () => {
  const { serviceType } = useParams();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompaniesByServiceType(serviceType);
  }, [serviceType]);

  const renderStars = (rating) => {
    if (rating === 0) {
      return "-";
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key={"half"} />);
    }

    while (stars.length < 5) {
      stars.push(<BsStar key={stars.length} />);
    }

    return stars;
  };

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
            <Th>Average Rating</Th>
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
                <Td>
                  <StarWrapper>{renderStars(averageRating)}</StarWrapper>
                </Td>
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
  border-radius: 10px;
  padding: 2rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;

  background-color: #f2f2f2;
`;

const TableHeading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #003262;
  text-align: center;
`;

const Table = styled.table`
  font-size: 1.2rem;
  margin: auto;
  width: 70%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  padding: 16px;
  background-color: #003262;
  color: #fff;
  border: 1px solid #003262;
  font-weight: 600;
  &:first-child {
    border-top-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
  }
`;

const Td = styled.td`
  padding: 16px;
  border: 1px solid #d8d8d8;
  text-align: center;
`;

const StarWrapper = styled.span`
  display: inline-flex;
  color: gold;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: lightblue;
  }
`;

export default RatingTable;
