from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

@app.route('/api/predict', methods=['GET'])
def predict():
    np.random.seed(42)

    days = np.arange(1, 31)
    work_hours = np.random.uniform(2, 10, size=len(days))
    active_minutes = np.random.uniform(0, 60, size=len(days))

    mood = []
    for work, activity in zip(work_hours, active_minutes):
        if work > 4 and activity >= 30:
            mood.append(np.random.uniform(6.1, 10))
        else:
            mood.append(np.random.uniform(1, 5.9))
    mood = np.array(mood)

    X_train = np.column_stack((work_hours, active_minutes))
    y_train = mood

    model = LinearRegression()
    model.fit(X_train, y_train)

    future_days = np.arange(1, 31)
    future_work_hours = np.random.uniform(2, 10, size=len(future_days))
    future_active_minutes = np.random.uniform(0, 60, size=len(future_days))

    X_future = np.column_stack((future_work_hours, future_active_minutes))
    predicted_mood = model.predict(X_future)

    def classify_mood(value):
        if 7 <= value <= 10:
            return 'happy'
        elif 5 <= value < 7:
            return 'calm'
        elif 3 <= value < 5:
            return 'angry'
        elif 0 <= value < 3:
            return 'sad'
        else:
            return 'unknown'

    results = [
        {"day": int(day), "mood": round(mood_value, 1), "mood_type": classify_mood(mood_value)}
        for day, mood_value in zip(future_days, predicted_mood)
    ]

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
