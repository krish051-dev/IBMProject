from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler once on startup
try:
    model = joblib.load('server_anomaly_model.pkl')
    scaler = joblib.load('server_scaler.pkl')
    print("Successfully loaded model and scaler.")
except Exception as e:
    print(f"Error loading model or scaler: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # 1. Receive the five values in exact order
        cpu_usage = float(data.get('cpu_usage', 0))
        memory_usage = float(data.get('memory_usage', 0))
        disk_usage = float(data.get('disk_usage', 0))
        network_usage = float(data.get('network_usage', 0))
        active_processes = float(data.get('active_processes', 0))
        
        features = np.array([[
            cpu_usage,
            memory_usage,
            disk_usage,
            network_usage,
            active_processes
        ]])
        
        # 3. Apply the existing scaler
        scaled_features = scaler.transform(features)
        
        # 4 & 5. Get the prediction
        pred_value = model.predict(scaled_features)[0]
        
        # 6. Get the anomaly score
        anomaly_score = float(model.decision_function(scaled_features)[0])
        
        # 7. Return JSON
        status = "Normal" if pred_value == 1 else "Anomaly"
        
        return jsonify({
            'prediction': int(pred_value),
            'status': status,
            'anomaly_score': anomaly_score
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
