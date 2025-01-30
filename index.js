const express = require("express");
const mongoose = require("mongoose")
const cors = require ("cors")

const schema = require ("./schema.js")

const corsOptions = {
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

const app = express();  
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection URI
const url ='mongodb+srv://wsu_admission:196TQKatAtlas@cluster0.sjgov.mongodb.net/wsuvn?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url)
  .then(() => 
    console.log('Connected to MongoDB')
  )
  .catch((err) => 
    console.error('Error connecting to MongoDB:', err)
);

const port = 3000
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
 
// table STUDENT Routes
const StudentModel = mongoose.model('admissions', schema.StudentSchema);

app.get("/getStudentsByCondi", async (rqst, res) => {
  try {
    // neu co cac truong phu nhu sort/fields... phai loai ra truoc
    const exclField = ['sort','page','limit','fields']
    let qryObj = {...rqst.query}
    exclField.forEach((ele) => {
      delete qryObj[ele]
    })
    // neu query string co so va dk là gte/gt.. thi phai them $ vao qry string nhu sau
    let qryString = JSON.stringify (qryObj)
    qryString = qryString.replace (/\b(gte|gt|lte\lt)\b/g, (match) => `$${match}`)

    qryObj = JSON.parse(qryString)

    let queryCondi = StudentModel.find(qryObj)

    //neu co sort
    if (rqst.query.sort){
      const sortBy = rqst.query.sort.split (',').join (' ')
      queryCondi = queryCondi.sort(sortBy)
    }
  // neu can specify field
    if (rqst.query.fields){
      const fieldList = "-__v " + rqst.query.fields.split (',').join (' ')
      queryCondi = queryCondi.select(fieldList)
    }
    else {
        queryCondi = queryCondi.select("-__v")
    }

    const arrStdts = await queryCondi
    res.status(200).json(arrStdts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/createStudent", async (rqst, res) => {
  try {
    const { MSSV, FullName } = rqst.body;
    const newStudent = new StudentModel({ MSSV, FullName });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: "Failed to create new student" });
  }
});

// Table BLAH Routes


// notes //
// cach goi bt : localhost:2000/getStudentByCondi?MSSV=blah&FullName=blah
// neu có so sanh : localhost:2000/getStudentByCondi?DOB[gt]=blah&Tuoi[gte]=blah
//cach goi localhost:2000/getStudentByCondi?MSSV=blah&FullName=blah&sort=-MSSV,FullName
//cach goi localhost:2000/getStudentByCondi?MSSV=blah&FullName=blah&fields=MSSV,FullName,DOB
