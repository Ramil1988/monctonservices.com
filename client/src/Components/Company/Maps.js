import styled from "styled-components";

const Maps = (address) => {
  const mapSrc = `https://maps.google.com/maps?&q="+${address.address}"&output=embed`;

  return (
    <Wrapper>
      <iframe
        width="300"
        height="300"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapSrc}
      ></iframe>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 20px;
  @media (max-width: 370px) {
    display: none;
  }
`;

export default Maps;
