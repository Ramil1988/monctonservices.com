const Maps = (address) => {
  const mapSrc = `https://maps.google.com/maps?&q="+${address.address}"&output=embed`;

  return (
    <div>
      <iframe
        width="300"
        height="300"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapSrc}
      ></iframe>
    </div>
  );
};

export default Maps;
