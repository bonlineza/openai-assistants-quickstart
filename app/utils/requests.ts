import axios from "axios";
import { profile } from "console";

const getWeather = (location) => {
  // chose a random temperature and condition
  const randomTemperature = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
  const randomConditionIndex = Math.floor(Math.random() * 5);
  const conditions = ["Cloudy", "Sunny", "Rainy", "Snowy", "Windy"];

  return {
    location: location,
    temperature: randomTemperature,
    unit: "F",
    conditions: conditions[randomConditionIndex],
  };
};

export { getWeather };

const getData = async (contactNumber) => {
  try {
    const response = await axios.post('http://localhost:8008/shop/test', {
      contact_number: contactNumber
    });

    if (response.status === 200) {
      const data = response.data;

      return {
        profile: data
      };
    } else {
      console.log('failed here')
      return {
        error: 'Something went wrong'
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.log('failed 2')
      return {
        error: 'Unprocessable Entity'
      };
    } else {
      return {
        error: 'Something went wrong'
      };
    }
  }
};

export { getData };
