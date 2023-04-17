const Maps = (address) => {
  const mapSrc = `https://maps.google.com/maps?&q="+${address.address}"&output=embed`;


  return (
    <div>
      <iframe
        width="300"
        height="300"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src={mapSrc}
      ></iframe>
    </div>
  );
};

export default Maps;
