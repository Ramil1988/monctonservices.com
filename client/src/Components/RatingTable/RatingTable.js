import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../Helper/Spinner";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { FiPhone, FiMapPin, FiExternalLink, FiNavigation } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import MapComponent from "./Map";

const ROOT_API = "/.netlify/functions/api";

const RatingTable = () => {
  const { serviceType } = useParams();
  const [companies, setCompanies] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [sortBy, setSortBy] = useState("reviews");
  const [minRating, setMinRating] = useState(0);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getAverageRating = (company) => {
    if (!company.reviews || company.reviews.length === 0) return 0;
    return company.reviews.reduce((sum, review) => sum + review.grade, 0) / company.reviews.length;
  };

  const sortCompanies = (companies, sortBy) => {
    const sorted = [...companies];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "rating":
        return sorted.sort((a, b) => getAverageRating(b) - getAverageRating(a));
      case "reviews":
        return sorted.sort((a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    let filtered = companies;

    // Filter by city
    if (selectedCity !== "All") {
      filtered = filtered.filter((company) =>
        company.address.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter((company) => getAverageRating(company) >= minRating);
    }

    // Sort companies
    filtered = sortCompanies(filtered, sortBy);

    setFilteredCompanies(filtered);
  }, [companies, selectedCity, searchQuery, minRating, sortBy]);

  const displayName = (serviceType || "")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

  const handleCityFilterChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getPhoneLink = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return `tel:${cleanPhone}`;
  };

  const getDirectionsLink = (address) => {
    if (!address) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const formatCity = (address) => {
    const parts = address.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (['Moncton', 'Dieppe', 'Riverview'].includes(trimmed)) {
        return trimmed;
      }
    }
    return 'Moncton Area';
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
      const response = await fetch(
        `${ROOT_API}/companies/${serviceType}?cities=Moncton,Dieppe,Riverview`
      );
      const data = await response.json();
      const companies = Array.isArray(data.data) ? data.data : [];
      const sortedCompanies = companies.sort((a, b) => {
        if ((a.reviews?.length || 0) === 0 && (b.reviews?.length || 0) === 0) {
          return a.name.localeCompare(b.name);
        }
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      });
      setCompanies(sortedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    }
  };

  if (companies.length === 0) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleShowMap = () => {
    setShowTable(false);
  };

  return (
    <Wrapper>
      <Header>
        <Title>Best {displayName} in Moncton</Title>
        <ViewToggle>
          <ToggleButton active={showTable} onClick={handleShowTable}>
            List View
          </ToggleButton>
          <ToggleButton active={!showTable} onClick={handleShowMap}>
            Map View
          </ToggleButton>
        </ViewToggle>
      </Header>

      {showTable ? (
        <>
          <FilterBar>
            <FilterGroup>
              <FilterSelect value={selectedCity} onChange={handleCityFilterChange}>
                <option value="All">All Cities</option>
                <option value="Moncton">Moncton</option>
                <option value="Dieppe">Dieppe</option>
                <option value="Riverview">Riverview</option>
              </FilterSelect>
              
              <SearchInput
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              
              <FilterSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="reviews">Most Reviews</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </FilterSelect>
              
              <FilterSelect value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                <option value={0}>All Ratings</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </FilterSelect>
            </FilterGroup>
            
            <ResultsCount>
              {filteredCompanies.length} {filteredCompanies.length === 1 ? 'result' : 'results'}
            </ResultsCount>
          </FilterBar>

          <CompanyGrid>
            {filteredCompanies.map((company, index) => {
              const averageRating = getAverageRating(company);
              const reviewCount = company.reviews?.length || 0;
              
              return (
                <CompanyCard key={company._id}>
                  <CardHeader>
                    <Rank>#{index + 1}</Rank>
                    <CityBadge>{formatCity(company.address)}</CityBadge>
                  </CardHeader>
                  
                  <CompanyName to={`/company/${company._id}`}>
                    {company.name}
                  </CompanyName>
                  
                  <RatingSection>
                    <StarWrapper>{renderStars(averageRating)}</StarWrapper>
                    <RatingText>
                      {averageRating > 0 ? averageRating.toFixed(1) : 'No rating'} 
                      ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                    </RatingText>
                  </RatingSection>
                  
                  <Address>
                    <FiMapPin size={14} />
                    {company.address}
                  </Address>
                  
                  <ActionBar>
                    {company.phoneNumber && (
                      <ActionButton as="a" href={getPhoneLink(company.phoneNumber)}>
                        <FiPhone size={16} />
                        Call
                      </ActionButton>
                    )}
                    
                    <ActionButton 
                      as="a" 
                      href={getDirectionsLink(company.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiNavigation size={16} />
                      Directions
                    </ActionButton>
                    
                    {company.website && (
                      <ActionButton 
                        as="a" 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink size={16} />
                        Website
                      </ActionButton>
                    )}
                  </ActionBar>
                </CompanyCard>
              );
            })}
          </CompanyGrid>
          
          {filteredCompanies.length === 0 && (
            <EmptyState>
              <p>No companies found matching your criteria.</p>
              <p>Try adjusting your filters or search terms.</p>
            </EmptyState>
          )}
        </>
      ) : (
        <MapComponent companies={filteredCompanies} />
      )}
    </Wrapper>
  );
};

// New Modern Styled Components
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--app-bg);
  color: var(--text);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToggleButton = styled.button`
  background: ${({ active }) =>
    active
      ? "linear-gradient(90deg, var(--primary-start), var(--primary-end))"
      : "var(--surface)"};
  color: ${({ active }) => (active ? "var(--pill-text)" : "var(--text)")};
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const FilterBar = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSelect = styled.select`
  padding: 0.625rem;
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  background: var(--app-bg);
  color: var(--text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-start);
  }
`;

const SearchInput = styled.input`
  padding: 0.625rem;
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  background: var(--app-bg);
  color: var(--text);
  font-size: 0.875rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-start);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

const ResultsCount = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
  text-align: center;
`;

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CompanyCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const Rank = styled.div`
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  color: var(--pill-text);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`;

const CityBadge = styled.div`
  background: var(--surface-border);
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`;

const CompanyName = styled(Link)`
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  margin-bottom: 0.75rem;
  line-height: 1.3;

  &:hover {
    color: var(--primary-start);
  }
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const StarWrapper = styled.div`
  display: flex;
  color: #fbbf24;
  gap: 1px;
`;

const RatingText = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
`;

const Address = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.4;

  svg {
    margin-top: 0.1rem;
    flex-shrink: 0;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  background: var(--app-bg);
  border: 1px solid var(--surface-border);
  border-radius: 6px;
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-start);
    color: var(--pill-text);
    border-color: var(--primary-start);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  
  p {
    margin: 0.5rem 0;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

export default RatingTable;
