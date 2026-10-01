import React from 'react';
import AnomalyTable from '../components/AnomalyTable';
import { recentRecords } from '../data/sampleData';

const Anomalies = () => {
  return (
    <div>
      <h1 className="text-3xl">Anomaly Detection Log</h1>
      <p className="text-muted mb-6">Complete history of classified server events.</p>

      <AnomalyTable records={recentRecords} />
    </div>
  );
};

export default Anomalies;
