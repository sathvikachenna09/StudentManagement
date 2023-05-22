import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
function App() {
  const [students, setStudents] = useState([]);
  const [rollno, setRollno] = useState('');
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.log('Error fetching students:', error);
    }
  };
  const createStudent = async () => {
    try {
      const response = await axios.post('/api/students', { rollno,name, branch });
      setStudents([...students, response.data]);
      setRollno('');
      setName('');
      setBranch('');
      console.log(response.data);
    } catch (error) {
      console.log('Error creating student:', error);
    }
  };

  return (
    <div >
      <h1>Student Management System</h1>
      <form style={{width:"40%" }} onSubmit={createStudent}>
        <input 
        
          type="text"
          placeholder="rollno"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
        /><br></br>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br></br>
        <input
          type="text"
          placeholder="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        /><br></br>
        <button type="submit">Add Student</button>
      </form>
      <div className="row my-5">
      <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Roll Number</th>
                <th scope="col">Name</th>
                <th scope="col">Branch</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {students &&
                students.map((student, id) => {
                  return (
                    <tr key={id}>
                      <td>{id + 1}</td>
                      <td>{student.rollno}</td>
                      <td>{student.name}</td>
                      <td>{student.branch}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
