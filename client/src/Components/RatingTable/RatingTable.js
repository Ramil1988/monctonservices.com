import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../Helper/Spinner";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CopyButton from "../Company/CoppyButton";
import Maps from "../Company/Maps";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const ROOT_API = "https://monctonservices-com.onrender.com";

const RatingTable = () => {
  const { serviceType } = useParams();
  const [companies, setCompanies] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleDialogOpen = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleCityFilterChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city === "All") {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company.address.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

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
      const response = await fetch(`${ROOT_API}/companies/${serviceType}`);
      const data = await response.json();
      const companies = data.data;
      const sortedCompanies = companies.sort((a, b) => {
        if (a.reviews.length === 0 && b.reviews.length === 0) {
          return a.name.localeCompare(b.name);
        }
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
      <CenteredWrapper>
        <FilterWrapper>
          <FilterLabel>Filter by city:</FilterLabel>
          <FilterSelect value={selectedCity} onChange={handleCityFilterChange}>
            <option value="All">All</option>
            <option value="Moncton">Moncton</option>
            <option value="Dieppe">Dieppe</option>
            <option value="Riverview">Riverview</option>
          </FilterSelect>
        </FilterWrapper>
      </CenteredWrapper>
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
          {filteredCompanies.map((company, index) => {
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
                  <QuestionButton onClick={() => handleDialogOpen(company)}>
                    <AiOutlineQuestionCircle size="1.2em" />
                  </QuestionButton>
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

      <CenteredDialog
        open={open}
        onClose={handleDialogClose}
        fullWidth={true}
        onMouseEnter={() => handleDialogOpen(selectedCompany)}
        onMouseLeave={() => handleDialogClose()}
      >
        {selectedCompany ? (
          <>
            <DialogTitle id="dialog-title" style={{ paddingRight: "100px" }}>
              {selectedCompany.name}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleDialogClose}
                aria-label="close"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  marginRight: "20px",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentStyled>
                <span>Address</span>: {selectedCompany.address}
                <CopyButton textToCopy={selectedCompany.address} />
              </DialogContentStyled>
              {selectedCompany.phoneNumber && (
                <>
                  <DialogContentStyled>
                    <span>Phone number</span>: {selectedCompany.phoneNumber}
                    <CopyButton textToCopy={selectedCompany.phoneNumber} />
                  </DialogContentStyled>
                </>
              )}
              <DialogContentText>
                <Maps address={selectedCompany.address}></Maps>
              </DialogContentText>
            </DialogContent>
          </>
        ) : null}
      </CenteredDialog>
    </Wrapper>
  );
};

const CenteredDialog = styled(Dialog)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogContentStyled = styled(DialogContentText)`
  display: flex;

  & span {
    font-weight: bold;
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #003262;
  padding: 10px;
  border-radius: 5px;
`;

const FilterLabel = styled.label`
  margin-right: 0.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #003262;
  font-weight: bold;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  &:focus {
    border-color: #003262;
  }
`;

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

  @media (max-width: 768px) {
    padding: 0.2rem;
    background-color: white;
  }
`;

const TableHeading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #003262;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Th = styled.th`
  text-align: center;
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
  padding: 15px;
  border: 1px solid #d8d8d8;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
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

const QuestionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #003262;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    color: #f2b01e;
  }
`;

export default RatingTable;
