import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const services = [
  { name: "Plumbing", category: "Home" },
  { name: "Home repair", category: "Home" },
  { name: "Home cleaning", category: "Home" },

  { name: "Auto Repair", category: "Automotive" },
  { name: "Auto Dealers", category: "Automotive" },

  { name: "Beauty salons", category: "Health and beauty" },
  { name: "Fitness Training", category: "Health and beauty" },
  { name: "Legal services", category: "Business services" },
  { name: "Banks", category: "Business" },
  { name: "IT services", category: "Business" },
  { name: "Tourism", category: "Entertainments" },

  { name: "Vet clinics", category: "Pet care" },
];

const ListOfServices = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <ListOfServicesWrapper>
      <CategoryBar>
        {categories.map((category) => (
          <Category
            key={category}
            onMouseEnter={() => setActiveCategory(category)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {category}
            {activeCategory === category && (
              <Popup>
                <ServiceList>
                  {services
                    .filter((service) => service.category === activeCategory)
                    .map((service) => (
                      <ServiceItem key={service.name}>
                        <StyledNavLink to={`/services/${service.name}`}>
                          {service.name}
                        </StyledNavLink>
                      </ServiceItem>
                    ))}
                </ServiceList>
              </Popup>
            )}
          </Category>
        ))}
      </CategoryBar>
    </ListOfServicesWrapper>
  );
};

const categories = [
  "Home",
  "Automotive",
  "Health and beauty",
  "Business",
  "Entertainments",
  "Pet care",
];

const ListOfServicesWrapper = styled.div`
  position: relative;
`;

const CategoryBar = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const Category = styled.div`
  position: relative;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: #204c84;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #fff;
    background-color: #204c84;
    transform: scale(1.1);
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 150%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-0.5rem);
  transition: all 0.15s ease-out;
  padding: 0.5rem;
  z-index: 2;

  ${Category}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 1rem;
  margin: 0;

  ${Popup}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServiceItem = styled.li`
  margin-bottom: 10px;
  font-family: "Aeroport", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

  &:hover {
    background-color: #204c84;
    transform: scale(1.1);
  }

  ${Category}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

export default ListOfServices;
