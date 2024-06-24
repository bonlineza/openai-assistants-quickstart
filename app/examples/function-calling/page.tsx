"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getData, getWeather } from "../../utils/weather";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const isEmpty = Object.keys(weatherData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    if (call?.function?.name !== "get_order") return;

    const args = JSON.parse(call.function.arguments);
    console.log("Arguments", args);

    try {
      const data = await getData(args.order_number); // Await the asynchronous function call
      console.log("The returned data", data);
      setWeatherData(data);
      return JSON.stringify(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return JSON.stringify({ error: "Something went wrong" });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          {/* <WeatherWidget
            location={weatherData.location || "---"}
            temperature={weatherData.temperature?.toString() || "---"}
            conditions={weatherData.conditions || "Sunny"}
            isEmpty={isEmpty}
          /> */}
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
