import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './heartRate.css';

const Chart = ({ data, dataKey, label, strokeColor, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
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
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const generateFakeData = () => {
      const currentTime = new Date().getTime();

      const heartRate = [];
      const bloodPressure = [];
      const oxygenSaturation = [];
      const temperature = [];
      const respiratoryRate = [];

      for (let i = 0; i < 10; i++) {
        heartRate.push({
          timestamp: new Date(currentTime - i * 1000 * 60 * 60).toLocaleString(),
          value: Math.floor(Math.random() * (120 - 60 + 1)) + 60,
        });

        bloodPressure.push({
          timestamp: new Date(currentTime - i * 1000 * 60 * 60).toLocaleString(),
          value: `${Math.floor(Math.random() * (180 - 110 + 1)) + 110}/${Math.floor(Math.random() * (120 - 70 + 1)) + 70}`,
        });

        oxygenSaturation.push({
          timestamp: new Date(currentTime - i * 1000 * 60 * 60).toLocaleString(),
          value: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
        });

        temperature.push({
          timestamp: new Date(currentTime - i * 1000 * 60 * 60).toLocaleString(),
          value: (Math.random() * (37 - 36) + 36).toFixed(1),
        });

        respiratoryRate.push({
          timestamp: new Date(currentTime - i * 1000 * 60 * 60).toLocaleString(),
          value: Math.floor(Math.random() * (20 - 12 + 1)) + 12,
        });
      }

      setHeartRateData(heartRate);
      setBloodPressureData(bloodPressure);
      setOxygenSaturationData(oxygenSaturation);
      setTemperatureData(temperature);
      setRespiratoryRateData(respiratoryRate);
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
            <Chart data={heartRateData} dataKey="value" label="Heart Rate" strokeColor="#8884d8" />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Blood Pressure</h3>
            <Chart data={bloodPressureData} dataKey="value" label="Blood Pressure" strokeColor="#82ca9d" />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Oxygen Saturation</h3>
            <Chart data={oxygenSaturationData} dataKey="value" label="Oxygen Saturation" strokeColor="#ff7300" />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Temperature</h3>
            <Chart data={temperatureData} dataKey="value" label="Temperature" strokeColor="#ff4500" />
          </div>

          <div className="chart-container">
            <h3 className="chart-title">Respiratory Rate</h3>
            <Chart data={respiratoryRateData} dataKey="value" label="Respiratory Rate" strokeColor="#32cd32" />
          </div>
        </>
      )}
    </div>
  );
};

export default Heartrate;
