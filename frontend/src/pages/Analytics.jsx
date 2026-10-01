import React from 'react';
import { ScatterPlotChart, NetworkChart } from '../components/Charts';
import { modelPerformance } from '../data/sampleData';

const Analytics = () => {
  return (
    <div>
      <h1 className="text-3xl">Analytics & Model Evaluation</h1>
      <p className="text-muted mb-6">Detailed performance metrics and data distribution visualizations.</p>

      <div className="grid-stats">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
            {modelPerformance.accuracy.toFixed(2)}%
          </div>
          <div className="text-muted">Accuracy</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-orange)' }}>
            {modelPerformance.precision.toFixed(2)}%
          </div>
          <div className="text-muted">Precision</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>
            {modelPerformance.recall.toFixed(2)}%
          </div>
          <div className="text-muted">Recall</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>
            {modelPerformance.f1Score.toFixed(2)}%
          </div>
          <div className="text-muted">F1 Score</div>
        </div>
      </div>

      <div className="grid-charts">
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Confusion Matrix</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '1px', backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
            {/* Header row */}
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1rem' }}></div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Predicted Normal</div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Predicted Anomaly</div>

            {/* Row 1 */}
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1rem', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Actual Normal</div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>
              <div style={{ color: 'var(--accent-green)' }}>{modelPerformance.trueNegative}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>True Negative</div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>
              <div style={{ color: 'var(--accent-red)' }}>{modelPerformance.falsePositive}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>False Positive</div>
            </div>

            {/* Row 2 */}
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '1rem', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Actual Anomaly</div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>
              <div style={{ color: 'var(--accent-red)' }}>{modelPerformance.falseNegative}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>False Negative</div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>
              <div style={{ color: 'var(--accent-green)' }}>{modelPerformance.truePositive}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>True Positive</div>
            </div>
          </div>
        </div>

        <ScatterPlotChart />
      </div>

      <div className="grid-charts">
        <NetworkChart />
      </div>
    </div>
  );
};

export default Analytics;
