import rawResults from './results.json';

// Parse the results from the notebook
export const timeSeriesData = rawResults.map(record => {
  const isAnomaly = record.final_prediction === 1;
  return {
    time: record.timestamp.split(' ')[1], // e.g., '00:00:00'
    cpu: record.cpu_usage,
    memory: record.memory_usage,
    disk: record.disk_usage,
    network: record.network_usage,
    processes: record.active_processes,
    isAnomaly: isAnomaly,
  };
});

export const scatterData = rawResults.map(record => ({
  cpu: record.cpu_usage,
  memory: record.memory_usage,
  type: record.final_prediction === 1 ? 'Anomaly' : 'Normal',
}));

// Filter and sort for the anomalies table
const anomalyRecords = rawResults
  .filter(record => record.final_prediction === 1)
  .sort((a, b) => a.final_anomaly_score - b.final_anomaly_score); // Lower scores = more anomalous

export const recentRecords = anomalyRecords.map((record, index) => ({
  id: `REC-${1000 + index}`,
  timestamp: record.timestamp,
  cpu: record.cpu_usage,
  memory: record.memory_usage,
  disk: record.disk_usage,
  network: record.network_usage,
  processes: record.active_processes,
  score: record.final_anomaly_score,
  status: 'Anomaly'
}));

// Representative preview: 5 recent anomalies and 5 recent normal records
const recentAnomaliesForPreview = rawResults.filter(r => r.final_prediction === 1).slice(-5);
const recentNormalForPreview = rawResults.filter(r => r.final_prediction === 0).slice(-5);
const mixedPreviewRecords = [...recentAnomaliesForPreview, ...recentNormalForPreview]
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first

export const latestActivityRecords = mixedPreviewRecords.map((record, index) => ({
  id: `ACT-${index}`,
  timestamp: record.timestamp,
  cpu: record.cpu_usage,
  memory: record.memory_usage,
  disk: record.disk_usage,
  network: record.network_usage,
  processes: record.active_processes,
  score: record.final_anomaly_score,
  status: record.final_prediction === 1 ? 'Anomaly' : 'Normal'
}));

// For dashboard current stats, we can show averages or total metrics
const totalAnomalies = anomalyRecords.length;
const lastRecord = rawResults[rawResults.length - 1];

export const currentStats = {
  cpu: lastRecord.cpu_usage,
  memory: lastRecord.memory_usage,
  disk: lastRecord.disk_usage,
  network: lastRecord.network_usage,
  processes: lastRecord.active_processes,
  anomaliesDetected: totalAnomalies,
};

// Calculate actual metrics using the actual labels and predictions
let tn = 0, fp = 0, fn = 0, tp = 0;
rawResults.forEach(r => {
  const actual = r.anomaly;
  const pred = r.final_prediction;
  if (actual === 0 && pred === 0) tn++;
  if (actual === 0 && pred === 1) fp++;
  if (actual === 1 && pred === 0) fn++;
  if (actual === 1 && pred === 1) tp++;
});

const accuracy = (tp + tn) / rawResults.length;
const precision = tp / (tp + fp) || 0;
const recall = tp / (tp + fn) || 0;
const f1 = (2 * precision * recall) / (precision + recall) || 0;

export const modelPerformance = {
  accuracy: accuracy * 100,
  precision: precision * 100,
  recall: recall * 100,
  f1Score: f1 * 100,
  trueNegative: tn,
  falsePositive: fp,
  falseNegative: fn,
  truePositive: tp,
};
