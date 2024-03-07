import React, { useState, useEffect } from 'react';


const CurrencyWorld = () => {
  const [currency, setCurrency] = useState('');
  const [countries, setCountries] = useState([]);
  const [flagCodes, setFlagCodes] = useState({});
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Fetch flag codes
    fetch(`https://flagcdn.com/en/codes.json`)
      .then(response => response.json())
      .then(data => {
        setFlagCodes(data);
      })
      .catch(error => {
        console.error('Error fetching flag codes:', error);
      });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://restcountries.com/v3.1/currency/${inputValue}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data);
        setCurrency(inputValue);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setInputValue(''); // Reset the input value after fetching data
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="searchContainer">
            <img src="/search-icon.png" alt="Search Logo" className="searchLogo" />
            <input
                type="text"
                placeholder="Search By Currency INR, EUR"
                value={inputValue}
                onChange={handleChange}
                className="inputField"
            />
        </div>
      </form>
      <div className="headingContainer">
        <h2>Countries with Currency: {currency}</h2>
      </div>
      <div className="countryContainer">
        {countries.map((country) => (
          <div key={country.name.common} className="countryBox">
            <div className="boxWrapper">
                <div className="flagBox">
                {flagCodes[country.cca2] || (
                    <img src={`https://flagsapi.com/${country.cca2}/flat/64.png`} alt="Flag" style={{ width: '100%', height: '100%' }} />
                )}
                </div>
                <div className="infoBox">
                <p className="countryName">Name: {country.name.common}</p>
                <p className="capitalName">Capital: {country.capital}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyWorld;
