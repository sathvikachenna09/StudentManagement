
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://sathvikachenna:sathvika09@cluster0.kjkoq03.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB Atlas:', error);
  });
  const studentSchema = new mongoose.Schema({
    rollno: String,
    name: String,
    branch: String,
  });
  
  const Student = mongoose.model('Student', studentSchema);
  app.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving students' });
    }
  });
  
  app.post('/api/students', async (req, res) => {
    try {
      const { rollno, name, branch } = req.body;
      const newStudent = new Student({ rollno, name, branch });
      await newStudent.save();
      res.json(newStudent);
    } catch (error) {
      res.status(500).json({ error: 'Error creating student' });
    }
  });
  
  // Implement other routes for updating and deleting students
  const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
