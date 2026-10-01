import React from 'react';

const AnomalyTable = ({ records, limit }) => {
  const displayRecords = limit ? records.slice(0, limit) : records;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-2xl">Recent Activity</h2>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>CPU (%)</th>
              <th>Memory (%)</th>
              <th>Disk (%)</th>
              <th>Network (%)</th>
              <th>Processes</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.timestamp}</td>
                <td>{Number(record.cpu).toFixed(2)}</td>
                <td>{Number(record.memory).toFixed(2)}</td>
                <td>{Number(record.disk).toFixed(2)}</td>
                <td>{Number(record.network).toFixed(2)}</td>
                <td>{Math.round(Number(record.processes))}</td>
                <td style={{ color: record.score < 0 ? 'var(--accent-red)' : 'var(--text-main)' }}>
                  {Number(record.score).toFixed(4)}
                </td>
                <td>
                  <span className={`badge ${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnomalyTable;
