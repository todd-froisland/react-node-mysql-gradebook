const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();


const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'gradebook'
});

connection.connect(err => {
    if(err) {
        console.log('connection error');
        console.log(connection);
        return err;
    }
    console.log('database connection established')
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /gradebook/student to see student');
});

app.get('/gradebook/student', (req, res) => {
    const selectAllStudents = 'SELECT * FROM student';
    connection.query(selectAllStudents, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.post('/gradebook/student/add', (req, res) => {
    const {studentName, studentId, studentEmail} = req.query;
    console.log();
    const INSERT_STUDENT_QUERY = 
    `INSERT INTO student 
    (studentName, studentId, studentEmail)
    VALUES('${studentName}', '${studentId}', '${studentEmail}')`;
    connection.query(INSERT_STUDENT_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send(results);
        }
    })

})

app.get('/gradebook/course', (req, res) => {
    const COURSE_CATALOG_QUERY = `SELECT * FROM course`;
    connection.query(COURSE_CATALOG_QUERY, (err, results) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/gradebook/course/add', (req, res) => {
    const {courseName, courseId} = req.query;
    const ADD_COURSE_QUERY = `INSERT INTO course
    (courseName, courseId) VALUES('${courseName}','${courseId}')`;
    connection.query(ADD_COURSE_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added new course');
        }
    })
});

app.get('/gradebook/grades', (req, res) => {
    const GET_ALL_GRADES_QUERY = 'SELECT * From grade';
    connection.query(GET_ALL_GRADES_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/gradebook/grades/add', (req, res) => {
    const {courseId, studentId, letterGrade, numberGrade} = req.query;
    const ADD_GRADE_QUERY = `INSERT INTO grade
    (courseId, studentId, letterGrade, numberGrade) VALUES('${courseId}','${studentId}','${letterGrade}', ${numberGrade})`;
    connection.query(ADD_GRADE_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added grade to gradebook');
        }
    })
});

app.get('/gradebook/grades/average', (req, res) => {
    const {studentId} = req.query;
    const AVERAGE_GPA_QUERY = `SELECT numberGrade FROM grade WHERE studentId='${studentId}'`;
})


app.listen(4000, () => {
    console.log('server listening on port 4000')
});

