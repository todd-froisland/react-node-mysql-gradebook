import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [newStudent, setNewStudent] = useState({
    studentName: '',
    studentId: '',
    studentEmail: '',
  });

  const getData = () => {
    fetch("http://localhost:4000/gradebook/grades")
    .then((response) => response.json())
    .then(({ data }) => {
      setGrades(data);
      
    }, 
    fetch("http://localhost:4000/gradebook/student")
    .then((response) => response.json())
    .then(({ data }) => {
      setStudents(data)
    }),
    fetch("http://localhost:4000/gradebook/course")
    .then((response) => response.json())
    .then(({ data }) => {
      setCourses(data);
      setIsLoaded(true);
    }),
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  };

  const addStudent = () => {
    const {studentName, studentId, studentEmail} = newStudent;
    console.log(studentName , studentEmail, studentId);
    fetch("http://localhost:4000/gradebook/student/add", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
    .then(function(response) {
      return response.json()
    }).then(function(body) {
      console.log(body);
    })
    .then(getData());
  }

    useEffect(() => {
      getData()
    }, []);

if (error) {
  return <div classname="header">
    <h1>Error: {error.message}</h1>
    </div>
}
else if (!isLoaded) {
  return <div>
    <h1>loading...</h1>

    </div>
}
else {
  return (
    <div className="App">

      <div className="container">
        <h1 className="header">GRADEBOOK</h1>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Course ID</th>
              <th>Letter Grade</th>
              <th>Number Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {grades.map(grade => (
              <tr>
                <td>{grade.studentId}</td>
                <td>{grade.courseId}</td>
                <td>{grade.letterGrade}</td>
                <td>{grade.numberGrade}</td>
                <td><button>REMOVE</button></td>
              </tr>
            ))}
            <tr>
              <td><input type="text" placeholder="Student ID"></input></td>
              <td><input type="text" placeholder="Course ID"></input></td>
              <td><input type="text" placeholder="Letter Grade"></input></td>
              <td><input type="text" placeholder="Number Grade"></input></td>
              <td><button className = "submit" type="submit">ADD</button></td>
            </tr>
            </tbody>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>Average GPA</th>
              <th></th>
            </tr>
            </thead>
            {students.map(student => (
              
              <tr>
                <td>{student.studentName}</td>
                <td>{student.studentId}</td>
                <td>{student.studentEmail}</td>
                <td>{student.averageGPA}</td>
                <td><button>REMOVE</button></td>
              </tr>
            ))}
            <tr>
              <td><input type="text" placeholder="Student Name" onChange={e => setNewStudent({...newStudent, studentName: e.target.value})}></input></td>
              <td><input type="text" placeholder="Student ID" onChange={e => setNewStudent({...newStudent, studentId: e.target.value})}></input></td>
              <td><input type="text" placeholder="Email" onChange={e => setNewStudent({...newStudent, studentEmail: e.target.value})}></input></td>
              <td></td>
              <td><button className="submit" onClick={() => addStudent()} type="submit">ADD</button></td>
            </tr>
            <thead>
              <tr>
                <th>Reference Only*</th>
                <th>Course Name</th>
                <th>Course ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {courses.map(course => (
              <tr>
                <td></td>
                <td>{course.courseName}</td>
                <td>{course.courseId}</td>
                <td></td>
                <td><button>REMOVE</button></td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td><input type="text" placeholder="Course Name"></input></td>
              <td><input type="text" placeholder="Course ID"></input></td>
              <td></td>
              <td><button className = "submit" type="submit">ADD</button></td>
              </tr>
        </table>
      </div>
    </div>
  );
}
}

export default App;
