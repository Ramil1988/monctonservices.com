import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

const MapComponent = ({ companies }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [markerGroup, setMarkerGroup] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const mapInstance = L.map(mapContainerRef.current, {
        center: [46.0878, -64.7782], // center of Moncton, New Brunswick, Canada
        zoom: 11,
        layers: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      });

      setMap(mapInstance);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (map) {
      if (markerGroup) {
        markerGroup.clearLayers();
      }

      const markerClusterGroup = L.markerClusterGroup();

      filteredCompanies.forEach((company) => {
        if (company.lat && company.lang) {
          const link = (
            <a href="/company/${company._id}" id="company-${company._id}">
              ${company.name}
            </a>
          );
          const marker = L.marker([company.lat, company.lang], {
            icon: L.AwesomeMarkers.icon({
              icon: "map-marker",
            }),
          })
            .on("click", () => {
              window.location.href = `/company/${company._id}`;
            })
            .addTo(markerClusterGroup)
            .bindPopup(link)
            .bindTooltip(company.name, { direction: "top" });

          marker.on("popupopen", () => {
            const element = document.getElementById(`company-${company._id}`);
            if (element) {
              element.addEventListener("click", (e) => {
                e.preventDefault();
                window.location.href = e.target.getAttribute("href");
              });
            }
          });

          markerClusterGroup.addLayer(marker);
        }
      });

      map.addLayer(markerClusterGroup);
      setMarkerGroup(markerClusterGroup);
    }
  }, [map, filteredCompanies]);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchQuery, companies]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a company"
        />
      </SearchContainer>
      <MapContainer ref={mapContainerRef} />
    </div>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
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

const MapContainer = styled.div`
  height: 80vh;
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
`;

export default MapComponent;
