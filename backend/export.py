import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.svm import OneClassSVM
import json
import os

np.random.seed(42)
n = 1000
timestamps = pd.date_range(start="2026-01-01 00:00:00", periods=n, freq="min")
cpu = np.random.normal(45, 10, n)
memory = np.random.normal(55, 8, n)
disk = np.random.normal(40, 10, n)
network = np.random.normal(30, 8, n)
processes = np.random.normal(100, 15, n)

cpu = np.clip(cpu, 5, 90)
memory = np.clip(memory, 10, 90)
disk = np.clip(disk, 5, 90)
network = np.clip(network, 5, 90)
processes = np.clip(processes, 30, 180)

anomaly = np.zeros(n)
cpu_anomaly_indices = [150, 300, 450, 600, 750]
cpu[cpu_anomaly_indices] = [97, 95, 99, 96, 98]
anomaly[cpu_anomaly_indices] = 1

memory_anomaly_indices = [200, 400, 500, 700, 850]
memory[memory_anomaly_indices] = [92, 94, 96, 95, 98]
anomaly[memory_anomaly_indices] = 1

combined_indices = [250, 550, 900]
cpu[combined_indices] = [96, 99, 97]
memory[combined_indices] = [94, 97, 96]
anomaly[combined_indices] = 1

df = pd.DataFrame({
    "timestamp": timestamps.astype(str),
    "cpu_usage": cpu,
    "memory_usage": memory,
    "disk_usage": disk,
    "network_usage": network,
    "active_processes": processes,
    "anomaly": anomaly.astype(int)
})

features = ["cpu_usage", "memory_usage", "disk_usage", "network_usage", "active_processes"]
X = df[features]
y_true = df["anomaly"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
normal_training_data = X_scaled[y_true == 0]

final_model = OneClassSVM(kernel="rbf", gamma="auto", nu=0.01)
final_model.fit(normal_training_data)

final_predictions = final_model.predict(X_scaled)
final_predicted_anomaly = (final_predictions == -1).astype(int)

results = df.copy()
results["final_prediction"] = final_predicted_anomaly
results["final_anomaly_score"] = final_model.decision_function(X_scaled)

out_dir = "../frontend/src/data"
os.makedirs(out_dir, exist_ok=True)
results.to_json(os.path.join(out_dir, "results.json"), orient="records")
print("Exported records successfully.")
