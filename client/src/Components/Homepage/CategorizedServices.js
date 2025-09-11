import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { serviceCategories, getServicesByCategory } from "../serviceTypes";

const CategorizedServices = ({ data }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  
  const categorizedServices = getServicesByCategory(data);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <Container>
      {Object.entries(categorizedServices).map(([categoryId, services]) => {
        const category = serviceCategories[categoryId];
        const isExpanded = expandedCategories[categoryId];
        
        return (
          <CategorySection key={categoryId}>
            <CategoryCard onClick={() => toggleCategory(categoryId)}>
              <CategoryHeader>
                <CategoryIconWrapper color={category.color}>
                  {React.createElement(category.icon, { size: 28 })}
                </CategoryIconWrapper>
                <CategoryInfo>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryDescription>{category.description}</CategoryDescription>
                  <ServiceCount>{services.length} service{services.length !== 1 ? 's' : ''}</ServiceCount>
                </CategoryInfo>
                <ExpandIcon isExpanded={isExpanded}>
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </ExpandIcon>
              </CategoryHeader>
            </CategoryCard>
            
            <ServicesGrid isExpanded={isExpanded}>
              <ServicesContainer>
                {services.map((service) => (
                  <ServiceCard key={service.id}>
                    <StyledLink to={`/${service.id}`}>
                      <ServiceIconTile>
                        {service.icon ? (
                          <ServiceIconWrapper color={service.color || "#6366f1"}>
                            {React.createElement(service.icon, { size: 32 })}
                          </ServiceIconWrapper>
                        ) : service.imageSrc ? (
                          <ServiceIcon src={service.imageSrc} alt={service.name} />
                        ) : (
                          <ServiceFallbackIcon>
                            {(service.name || service.id || "?").charAt(0)}
                          </ServiceFallbackIcon>
                        )}
                      </ServiceIconTile>
                      <ServiceAccent />
                      <ServiceName>{service.name}</ServiceName>
                      <SourceBadge
                        variant={service.source === 'google' ? 'google' : 'custom'}
                        title={(service.source === 'google') ? 'Discovered via Google' : 'Added from companies'}
                      >
                        {service.source === 'google' ? 'Google' : 'Custom'}
                      </SourceBadge>
                    </StyledLink>
                  </ServiceCard>
                ))}
              </ServicesContainer>
            </ServicesGrid>
          </CategorySection>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CategorySection = styled.div`
  margin-bottom: 14px;
`;

const CategoryCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    border-color: var(--primary-start);
    background: rgba(255,255,255,0.02);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => props.color}15;
  border: 2px solid ${props => props.color}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px 0;
`;

const CategoryDescription = styled.p`
  font-size: 0.875rem;
  color: var(--muted);
  margin: 0 0 6px 0;
  line-height: 1.4;
`;

const ServiceCount = styled.span`
  font-size: 0.75rem;
  color: var(--primary-start);
  font-weight: 600;
  background: var(--primary-start)10;
  padding: 2px 8px;
  border-radius: 12px;
`;

const ExpandIcon = styled.div`
  color: var(--muted);
  transition: transform 0.2s ease, color 0.2s ease;
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  &:hover {
    color: var(--primary-start);
  }
`;

const ServicesGrid = styled.div`
  overflow: hidden;
  transition: all 0.3s ease;
  max-height: ${props => props.isExpanded ? 'none' : '0'};
  opacity: ${props => props.isExpanded ? '1' : '0'};
  margin-top: ${props => props.isExpanded ? '12px' : '0'};
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  padding: 12px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
  }
`;

const ServiceCard = styled.div`
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  transition: border-color 0.15s ease, transform 0.15s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-start);
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const ServiceIconTile = styled.div`
  height: 60px;
  width: 60px;
  margin: 0 auto 8px;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ServiceIconWrapper = styled.div`
  color: ${props => props.color || "#6366f1"};
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const ServiceIcon = styled.img`
  height: 40px;
  width: 40px;
  object-fit: contain;
  border-radius: 8px;
`;

const ServiceFallbackIcon = styled.div`
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: var(--pill-text);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
`;

const ServiceAccent = styled.div`
  background: linear-gradient(90deg, #60a5fa, #a78bfa, #34d399);
  height: 2px;
  width: 60%;
  margin: 0 auto 6px;
  border-radius: 999px;
`;

const ServiceName = styled.h4`
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  line-height: 1.3;
`;

const SourceBadge = styled.span`
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  background: ${props => props.variant === 'google'
    ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
    : 'linear-gradient(90deg, #10b981, #34d399)'};
`;

export default CategorizedServices;
