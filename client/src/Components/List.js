import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/allCompanies")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Company List</h2>
      {companies.map((company) => (
        <div key={company._id}>
          <h3>{company.name}</h3>
          <img
            src={company.image}
            alt={company.name}
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
          />
          <p>Service Type: {company.serviceType}</p>
          <p>Address: {company.address}</p>
          <h4>Reviews:</h4>
          <ul>
            {company.reviews.map((review) => (
              <li key={review._id}>
                <p>
                  <strong>{review.Title}</strong> by {review.User}
                </p>
                <p>Date: {review.Date}</p>
                <p>Text: {review.Text}</p>
                <p>Grade: {review.Grade}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
