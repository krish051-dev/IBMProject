import React from 'react';
import { Cpu, MemoryStick, HardDrive, Network, Activity, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';
import { CpuMemoryChart } from '../components/Charts';
import AnomalyTable from '../components/AnomalyTable';
import { currentStats, latestActivityRecords } from '../data/sampleData';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>
      <p className="text-muted mb-6">Real-time overview of server health and anomaly detection.</p>

      <div className="grid-stats">
        <StatCard
          title="CPU Usage"
          value={Number(currentStats.cpu).toFixed(2)}
          unit="%"
          icon={Cpu}
          trend={{ isPositive: false, value: 2.1 }}
        />
        <StatCard
          title="Memory Usage"
          value={Number(currentStats.memory).toFixed(2)}
          unit="%"
          icon={MemoryStick}
          color="var(--accent-orange)"
          trend={{ isPositive: true, value: 1.4 }}
        />
        <StatCard
          title="Disk Usage"
          value={Number(currentStats.disk).toFixed(2)}
          unit="%"
          icon={HardDrive}
          color="var(--accent-green)"
        />
        <StatCard
          title="Network Usage"
          value={Number(currentStats.network).toFixed(2)}
          unit="%"
          icon={Network}
          color="var(--accent-blue)"
        />
        <StatCard
          title="Active Processes"
          value={Math.round(Number(currentStats.processes))}
          unit=""
          icon={Activity}
          color="var(--text-main)"
        />
        <StatCard
          title="Detected Anomalies"
          value={currentStats.anomaliesDetected}
          unit=""
          icon={AlertCircle}
          color="var(--accent-red)"
          trend={{ isPositive: true, value: 12.5 }}
        />
      </div>

      <div className="grid-charts">
        <CpuMemoryChart />
      </div>

      <AnomalyTable records={latestActivityRecords} limit={10} />
    </div>
  );
};

export default Dashboard;
