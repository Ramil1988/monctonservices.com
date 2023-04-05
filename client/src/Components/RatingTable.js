import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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
      }); // Sort companies in descending order of review count
      setCompanies(sortedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th>Place</Th>
          <Th>Name</Th>
          <Th>Overall Rating</Th>
          <Th>Reviews</Th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => {
          const averageRating = (
            company.reviews.reduce((sum, review) => sum + review.grade, 0) /
            company.reviews.length
          ).toFixed(1);

          return (
            <tr key={company._id}>
              <Td>{index + 1}</Td>
              <Td>
                <Link to={`/company/${company._id}`}>{company.name}</Link>
              </Td>
              <Td>{averageRating}</Td>
              <Td>{company.reviews.length}</Td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d8d8d8;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background-color: #f8f9fa;
  border: 1px solid #d8d8d8;
`;

const Td = styled.td`
  text-align: left;
  padding: 16px;
  border: 1px solid #d8d8d8;
`;

export default RatingTable;
