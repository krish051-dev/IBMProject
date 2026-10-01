import React from 'react';
import { BrainCircuit, Target, ShieldAlert, Cpu } from 'lucide-react';

const ModelInfo = () => {
  return (
    <div>
      <h1 className="text-3xl">Model Architecture</h1>
      <p className="text-muted mb-6">Understanding the One-Class SVM implementation for anomaly detection.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <BrainCircuit size={32} color="var(--accent-blue)" />
            <h2 className="text-2xl" style={{ margin: 0 }}>What is One-Class SVM?</h2>
          </div>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            One-Class Support Vector Machine (OC-SVM) is an unsupervised learning algorithm used for novelty detection. 
            Unlike traditional SVMs that separate two classes, OC-SVM is trained only on "normal" data. It learns to 
            create a boundary around this normal data in high-dimensional space. Anything falling outside this boundary 
            is classified as an anomaly or novelty.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <Target size={24} color="var(--accent-orange)" />
              <h3 className="card-title" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>RBF Kernel</h3>
            </div>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              We use the <strong>Radial Basis Function (RBF)</strong> kernel. It maps our input features into an infinite-dimensional 
              space, allowing the model to create highly complex, non-linear boundaries around the normal data points. 
              This is essential because server load patterns are rarely linear.
            </p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <ShieldAlert size={24} color="var(--accent-red)" />
              <h3 className="card-title" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>Configuration & Training</h3>
            </div>
            <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Our model uses <strong>gamma = auto</strong> and <strong>nu (ν) = 0.01</strong>. The nu parameter controls the trade-off between maximizing the margin and the expected number of anomalies. 
              <br /><br />
              Crucially, the model was <strong>trained only on the 987 normal records</strong> out of our 1,000 record dataset. By observing only healthy server states during training, it successfully learned to flag the 13 true anomalies during evaluation.
            </p>
          </div>

        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Cpu size={24} color="var(--accent-green)" />
            <h3 className="card-title" style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>Input Features</h3>
          </div>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Our model continuously monitors 5 critical system metrics to determine the server's state:
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            <li><strong>CPU Usage (%):</strong> Total processor utilization.</li>
            <li><strong>Memory Usage (%):</strong> RAM consumption.</li>
            <li><strong>Disk Usage (%):</strong> Storage I/O and capacity utilization.</li>
            <li><strong>Network Usage (%):</strong> Bandwidth consumption for incoming/outgoing traffic.</li>
            <li><strong>Active Processes:</strong> Total count of running tasks/threads.</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default ModelInfo;
