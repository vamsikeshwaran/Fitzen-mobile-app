const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5001;
const cors = require('cors');

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://vamsikeshwaran:admin@cluster0.eeruw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// POST route to create a new user
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, default: null }, // Set default to null
    age: { type: Number, default: null },    // Set default to null
    weight: { type: Number, default: null }, // Set default to null
    height: { type: Number, default: null }, // Set default to null
    goal: { type: String, default: null },   // Set default to null
    activity: { type: String, default: null } // Set default to null
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Check if the email already exists
        const userExists = await mongoose.connection.db.collection('User').findOne({ email });
        if (userExists) {
            return res.status(400).send('User with this email already exists.');
        }

        // Create a model with the collection name based on the user's name
        const UserModel = mongoose.model(name, userSchema, name);

        // Create a new user instance with specific fields set to null
        const newUser = new UserModel({
            name,
            email,
            password,
            gender: null,   // Explicitly setting to null
            age: null,      // Explicitly setting to null
            weight: null,   // Explicitly setting to null
            height: null,   // Explicitly setting to null
            goal: null,     // Explicitly setting to null
            activity: null   // Explicitly setting to null
        });

        // Save the user into the dynamically created collection
        await newUser.save();
        res.status(201).send('User registered successfully in a separate collection');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server error');
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        // Get a list of all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Loop through each collection and check for matching email and password
        for (const collection of collections) {
            const model = mongoose.model(collection.name, userSchema, collection.name);
            const user = await model.findOne({ email });

            if (user && user.password === password) {
                return res.status(200).send({ status: 'Authenticated', name: user.name, gender: user.gender });
            }
        }

        // If no matching email/password found
        return res.status(401).send('Invalid email or password');
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Server error');
    }
});

app.put('/update/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    const { field, newValue } = req.body;

    // Validate inputs
    if (!collectionName || !field || newValue === undefined) {
        return res.status(400).send('Collection name, field, and new value are required.');
    }

    console.log(`Updating collection: ${collectionName}, field: ${field}, newValue: ${newValue}`);

    try {
        // Check if the collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === collectionName);

        if (!collectionExists) {
            return res.status(404).send('Collection not found.');
        }

        // Check if the model already exists
        let collection;
        if (mongoose.models[collectionName]) {
            collection = mongoose.models[collectionName]; // Use the existing model
        } else {
            // Dynamically create the model if it doesn't exist
            collection = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);
        }

        // Update all documents in the collection by setting the new value for the specified field
        const result = await collection.updateMany({}, { $set: { [field]: newValue } });

        console.log(`Update result:`, result);

        if (result.nModified === 0) {
            return res.status(200).send(`No documents updated. Either the field already exists with the same value or there were no documents to update.`);
        }

        res.status(200).send(`Updated ${result.nModified} documents in the "${collectionName}" collection.`);
    } catch (error) {
        console.error('Error updating field:', error);
        res.status(500).send('Server error');
    }
});

app.get('/fetch/:collectionName', async (req, res) => {
    const { collectionName } = req.params;

    try {
        // Check if the collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === collectionName);

        if (!collectionExists) {
            return res.status(404).send('Collection not found.');
        }

        // Dynamically create the model if it doesn't exist already
        let collection;
        if (mongoose.models[collectionName]) {
            collection = mongoose.models[collectionName]; // Use the existing model
        } else {
            collection = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);
        }

        // Fetch all documents from the collection
        const data = await collection.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).send('Server error');
    }
});

app.get('/progress/:collectionName', async (req, res) => {
    const { collectionName } = req.params;

    try {
        // Check if the collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === collectionName);

        if (!collectionExists) {
            return res.status(404).send('Collection not found.');
        }

        // Dynamically create the model if it doesn't exist already
        let collection;
        if (mongoose.models[collectionName]) {
            collection = mongoose.models[collectionName]; // Use the existing model
        } else {
            collection = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);
        }

        // Fetch documents from the collection where "identifier" is "Progress"
        const data = await collection.find({ identifier: "Progress" });

        if (data.length === 0) {
            return res.status(404).send('No documents found with identifier: "Progress".');
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).send('Server error');
    }
});

app.put('/update-exercise/:collectionName', async (req, res) => {
    const { collectionName } = req.params;
    const { exerciseName, count } = req.body;

    // Validate inputs
    if (!exerciseName || count === undefined) {
        return res.status(400).send('Exercise name and count are required.');
    }

    try {
        // Check if the collection exists
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === collectionName);

        if (!collectionExists) {
            return res.status(404).send('Collection not found.');
        }

        // Dynamically access the collection
        const Exercise = mongoose.connection.collection(collectionName);

        // Find the closest matching exercise entry
        const closestExercise = await Exercise.findOne({
            exerciseName: { $regex: new RegExp(`^${exerciseName}$`, 'i') }
        }, { sort: { date: -1 } }); // Sort by date descending (most recent first)

        if (!closestExercise) {
            return res.status(404).send('No matching exercise found.');
        }

        // Update the count for the found exercise
        const updateResult = await Exercise.updateOne(
            { _id: closestExercise._id },
            { $set: { count } }
        );

        if (updateResult.modifiedCount > 0) {
            res.status(200).send(`Updated count for "${exerciseName}" to ${count}.`);
        } else {
            res.status(400).send('Failed to update exercise count.');
        }
    } catch (error) {
        console.error('Error updating exercise:', error);
        res.status(500).send('Server error');
    }
});


const server = app.listen(port, () => {
    const networkInterfaces = require('os').networkInterfaces();
    let ipAddress = '';

    // Loop through network interfaces to find the local IP address
    for (const interfaceName in networkInterfaces) {
        for (const net of networkInterfaces[interfaceName]) {
            if (net.family === 'IPv4' && !net.internal) {
                ipAddress = net.address;
                break;
            }
        }
    }

    console.log(`Server is running on http://${ipAddress}:${port}`);
});
