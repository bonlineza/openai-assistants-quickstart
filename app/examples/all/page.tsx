"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/requests";
import FileViewer from "../../components/file-viewer";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});

  const functionCallHandler = async (call) => {
    if (call?.function?.name !== "get_user_profile") return;
    console.log("The function");
    const args = JSON.parse(call.function.arguments);
    const data = getWeather(args.location);
    // setWeatherData(data);
    return JSON.stringify(data);
  };

  return (
    <main className={styles.main}>
      <h1>Test</h1>
    </main>
  );
};

export default FunctionCalling;
