import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./charts.css";

const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    const timestamp = label;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-GB", {
      month: "short",
      day: "2-digit",
    });


    const value = payload[0].value;

    return (
      <div className="custom-tooltip">
        <p>{`Date: ${formattedDate}`}</p>
        <p>{`Value: ${value}`}</p>
      </div>
    );
  }

  return null;
};

const Chart = ({ data, dataKey, label, strokeColor, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(timestamp) =>
          new Date(timestamp).toLocaleString("en-GB", {
            month: "short",
            day: "2-digit",
          })
        }
      />
      <YAxis />
      <Tooltip
        contentStyle={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
        itemStyle={{
          color: "#fff",
        }}
        labelStyle={{
          color: "#8884d8",
        }}
        labelFormatter={(label) => new Date(label).toLocaleString()}
      />

      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke={strokeColor} />
    </LineChart>
  </ResponsiveContainer>
);

const Heartrate = () => {
  const [heartRateData, setHeartRateData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [oxygenSaturationData, setOxygenSaturationData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [respiratoryRateData, setRespiratoryRateData] = useState([]);
  const [co2LevelData, setCo2LevelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateFakeData = () => {
      const currentTime = new Date();
      const heartRate = [];
      const bloodPressure = [];
      const oxygenSaturation = [];
      const temperature = [];
      const respiratoryRate = [];
      const co2Level = [];

      for (let i = 0; i < 10; i++) {

        const newDate = new Date(currentTime);
        newDate.setDate(currentTime.getDate() + i);

        const timestamp = newDate.getTime();

        heartRate.push({
          timestamp,
          value: Math.floor(Math.random() * (120 - 60 + 1)) + 60,
        });

        bloodPressure.push({
          timestamp: newDate.toLocaleString(),
          systolic: Math.floor(Math.random() * (180 - 110 + 1)) + 110,
          diastolic: Math.floor(Math.random() * (120 - 70 + 1)) + 70,
        });

        oxygenSaturation.push({
          timestamp,
          value: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
        });

        temperature.push({
          timestamp,
          value: (Math.random() * (37 - 36) + 36).toFixed(1),
        });

        respiratoryRate.push({
          timestamp,
          value: Math.floor(Math.random() * (20 - 12 + 1)) + 12,
        });

        co2Level.push({
          timestamp,
          value: Math.floor(Math.random() * (10 - 3 + 1)) + 3, 
        });
      }

      setHeartRateData(heartRate);
      setBloodPressureData(bloodPressure);
      setOxygenSaturationData(oxygenSaturation);
      setTemperatureData(temperature);
      setRespiratoryRateData(respiratoryRate);
      setCo2LevelData(co2Level);
      setIsLoading(false);
    };

    generateFakeData();
  }, []);

  return (
    <div className="wrapper-chart">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="chart-container">
            <h3 className="chart-title">Heart Rate</h3>
            <Chart
              data={heartRateData}
              dataKey="value"
              label="Heart Rate"
              strokeColor="#8884d8"
            />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Blood Pressure</h3>
            <Chart
              data={bloodPressureData}
              dataKey="value"
              label="Blood Pressure"
              strokeColor="#fffff"
            />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Oxygen Saturation</h3>
            <Chart
              data={oxygenSaturationData}
              dataKey="value"
              label="Oxygen Saturation"
              strokeColor="#ff7300"
            />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Temperature</h3>
            <Chart
              data={temperatureData}
              dataKey="value"
              label="Temperature"
              strokeColor="#ff4500"
            />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Respiratory Rate</h3>
            <Chart
              data={respiratoryRateData}
              dataKey="value"
              label="Respiratory Rate"
              strokeColor="#32cd32"
            />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Carbon Dioxide Level</h3>
            <Chart
              data={co2LevelData}
              dataKey="value"
              label="CO2 Level"
              strokeColor="#ff0000"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Heartrate;


