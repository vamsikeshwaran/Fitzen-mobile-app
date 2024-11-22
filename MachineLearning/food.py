from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)

# Load the dataset
data = pd.read_csv('/Users/vamsikeshwaran/Desktop/food.csv')

# Encode categorical variables
label_encoder_gender = LabelEncoder()
label_encoder_dietary = LabelEncoder()

data['Gender'] = label_encoder_gender.fit_transform(data['Gender'])
data['Dietary Tag'] = label_encoder_dietary.fit_transform(data['Dietary Tag'])

# Features and target variable
X = data[['Height (cm)', 'Weight (kg)', 'Gender', 'Age']]
y = data[['Food Name', 'Calories', 'Ingredients', 'Cuisine',
          'Dietary Tag', 'Description', 'Image']]  # Include 'image' column

# Initialize KNN model
knn = NearestNeighbors(n_neighbors=10)  # Recommend 10 foods
knn.fit(X)

# Function to recommend food based on input parameters


def recommend_food(height, weight, gender, age):
    # Preprocess input
    gender_encoded = label_encoder_gender.transform([gender])[0]
    input_data = [[height, weight, gender_encoded, age]]

    # Find the nearest neighbors (recommended foods)
    distances, indices = knn.kneighbors(input_data)

    # Fetch recommended foods with details
    recommended_foods = y.iloc[indices[0]].copy()

    # Convert Dietary Tag back to original string labels
    recommended_foods['Dietary Tag'] = label_encoder_dietary.inverse_transform(
        recommended_foods['Dietary Tag']
    )

    # Format the response as a list of dictionaries
    response = recommended_foods.to_dict(orient='records')
    return response


@app.route('/recommend_food', methods=['POST'])
def recommend():
    data = request.get_json()

    height = data.get('height')
    weight = data.get('weight')
    gender = data.get('gender')
    age = data.get('age')

    recommended_foods = recommend_food(height, weight, gender, age)
    return jsonify(recommended_foods)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7000, debug=True)
