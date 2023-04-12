import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopFiveCompanies = ({ serviceType }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompaniesByServiceType(serviceType);
  }, [serviceType]);

  const fetchCompaniesByServiceType = async (serviceType) => {
    try {
      const response = await fetch(`/companies/${serviceType}`);
      const data = await response.json();
      const companies = data.data;
      const sortedCompanies = companies
        .sort((a, b) => b.reviews.length - a.reviews.length)
        .slice(0, 5); 
      setCompanies(sortedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  return (
    <ServiceBox>
      <ServiceTitle>{serviceType}</ServiceTitle>
      <Table>
        <tbody>
          {companies.map((company, index) => (
            <tr key={company._id}>
              <Td>{index + 1}</Td>
              <Td>
                <Link to={`/company/${company._id}`}>{company.name}</Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ServiceBox>
  );
};

const ServiceBox = styled.div`
  border: 1px solid #d8d8d8;
  padding: 16px;
  margin-bottom: 16px;
`;

const ServiceTitle = styled.h3`
  margin-bottom: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Td = styled.td`
  text-align: left;
  padding: 4px;
  border-bottom: 1px solid #d8d8d8;
`;

export default TopFiveCompanies;
