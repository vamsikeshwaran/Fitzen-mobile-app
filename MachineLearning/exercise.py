from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and process the dataset
data = pd.read_csv('/Users/vamsikeshwaran/Desktop/exercisebar.csv')
df = pd.DataFrame(data)

# Encode categorical columns
label_encoders = {}
for column in ['Gender', 'Physical Activity Level', 'Exercise']:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# Features and target variable
X = df[['Gender', 'Age',
        'Weight (kg)', 'Height (cm)', 'Physical Activity Level']]
y = df['Exercise']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Train the KNN classifier
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Function to recommend exercises


def recommend_exercises(gender, age, weight, height, activity_level):
    # Encode input
    input_data = np.array([[label_encoders['Gender'].transform([gender])[0],
                            age, weight, height,
                            label_encoders['Physical Activity Level'].transform([activity_level])[0]]])

    # Get indices of the top 10 nearest neighbors
    distances, indices = knn.kneighbors(input_data, n_neighbors=10)

    # Get recommended exercises
    recommended_exercises = y_train.iloc[indices[0]].values

    # Retrieve the corresponding details for the recommended exercises
    recommended_details = df[df['Exercise'].isin(recommended_exercises)]

    # Build the result with exercise, description, time, calories, and image URL
    result = []
    for _, row in recommended_details.iterrows():
        exercise_name = label_encoders['Exercise'].inverse_transform([row['Exercise']])[
            0]
        result.append({
            'Exercise': exercise_name,
            'Description': row['Description'],
            'Time Taken (mins)': row['Time Taken (mins)'],
            'Calories Burned': row['Calories Burned'],
            'Activity Level': activity_level,
            'Image': row['Image']  # Include the image URL
        })

    return result

# Flask endpoint


@app.route('/recommend', methods=['POST'])
def get_recommendations():
    data = request.json
    gender = data['gender']
    age = data['age']
    weight = data['weight']
    height = data['height']
    activity_level = data['activity_level']

    # Get the recommendations
    recommendations = recommend_exercises(
        gender, age, weight, height, activity_level)

    return jsonify(recommendations)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
