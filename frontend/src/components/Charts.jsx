import React from 'react';
import {
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { timeSeriesData, scatterData } from '../data/sampleData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        padding: '10px',
        borderRadius: 'var(--radius-md)'
      }}>
        <p style={{ margin: 0, marginBottom: '5px', color: 'var(--text-main)' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0, fontSize: '0.875rem' }}>
            {entry.name}: {Number(entry.value).toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const CpuMemoryChart = () => (
  <div className="card" style={{ height: '400px' }}>
    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>CPU & Memory Usage Over Time</h3>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent-orange)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--accent-orange)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" />
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="cpu" name="CPU" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorCpu)" />
        <Area type="monotone" dataKey="memory" name="Memory" stroke="var(--accent-orange)" fillOpacity={1} fill="url(#colorMem)" />
        {/* Draw X markers for anomalies on the CPU and Memory lines */}
        <Scatter dataKey="cpu" data={timeSeriesData.filter(d => d.isAnomaly)} fill="var(--accent-red)" shape="cross" />
        <Scatter dataKey="memory" data={timeSeriesData.filter(d => d.isAnomaly)} fill="var(--accent-red)" shape="cross" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export const NetworkChart = () => (
  <div className="card" style={{ height: '400px' }}>
    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Network Usage Over Time</h3>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="var(--text-muted)" />
        <YAxis stroke="var(--text-muted)" />
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="network" name="Network" stroke="var(--accent-green)" fillOpacity={1} fill="url(#colorNet)" />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export const ScatterPlotChart = () => {
  const normalData = scatterData.filter(d => d.type === 'Normal');
  const anomalyData = scatterData.filter(d => d.type === 'Anomaly');

  return (
    <div className="card" style={{ height: '400px' }}>
      <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>CPU vs Memory (Anomaly Distribution)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis type="number" dataKey="cpu" name="CPU" unit="%" stroke="var(--text-muted)" />
          <YAxis type="number" dataKey="memory" name="Memory" unit="%" stroke="var(--text-muted)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ backgroundColor: 'var(--bg-panel)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ color: 'var(--text-main)', margin: 0 }}>{payload[0].payload.type}</p>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>CPU: {Number(payload[0].value).toFixed(2)}%</p>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Memory: {Number(payload[1].value).toFixed(2)}%</p>
                  </div>
                )
              }
              return null;
            }}
          />
          <Scatter name="Normal" data={normalData} fill="var(--accent-blue)" fillOpacity={0.6} />
          <Scatter name="Anomaly" data={anomalyData} fill="var(--accent-red)" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
