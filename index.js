require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error: ', err));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});