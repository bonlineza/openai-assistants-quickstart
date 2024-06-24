import axios from "axios";

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

const getData = async (orderID) => {
  try {
    const response = await axios.post('http://localhost:8008/shop/test', {
      order_number: orderID
    });

    if (response.status === 200) {
      const purchase = response.data.purchase;

      console.log(purchase);

      // Extract the needed fields
      const orderDate = new Date(purchase.order_date);
      const formattedOrderDate = orderDate.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });

      return {
        order_date: formattedOrderDate,
        purchase_status: purchase.purchase_status,
        products: purchase.products,
        is_paid: purchase.is_paid,
        estimated_payout_date: purchase.estimated_payout_date,
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
