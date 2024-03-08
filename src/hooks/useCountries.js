import { useEffect, useState } from "react";

export const useCountries = () => {
  const [allCountries, setAllCountries] = useState();

  useEffect(() => {
    const URL = "https://restcountries.com/v3.1/all";

    const getCountriesData = async () => {
      try {
        let arrayInOrder = [];

        const response = await fetch(URL);
        const data = await response.json();

        if (data) {
          data.map((country) => {
            arrayInOrder.push({countryName: country.translations.spa.common, countryCode: country.cca2});
          });
        }

        setAllCountries(arrayInOrder);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCountriesData();
  }, []);

  return {
    allCountries,
  };
};
