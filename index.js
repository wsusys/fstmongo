// https://fstmongo.onrender.com

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const schema = require ("./schema.js")
const cors = require ("cors")
const corsOptions = {origin:'*', credentials:true, optionSuccessStatus:200};
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME
const port = process.env.APP_PORT || 3200

const app = express();  
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection URI
const url =`mongodb+srv://${dbUser}:${dbPassword}@cluster0.sjgov.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url)
  .then(() => 
    console.log('Connected to MongoDB')
  )
  .catch((err) => 
    console.error('Error connecting to MongoDB:', err)
);

//mongoose.set('debug', true)

app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
})

app.put("/API/UpdateDocument/:collName/:Id", async (rqst, res) => {
  try {
    const id = rqst.params.Id
    const collName = rqst.params.collName
    const dataModel = mongoose.model(collName, schema.beyondoneones);    
    const exclField = ['_id']
    let objBeingUpdated = {...rqst.body}
    exclField.forEach((ele) => {
      delete objBeingUpdated[ele]
    })
    const updatedDoc = await dataModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, { $set: objBeingUpdated }, { new: true, writeConcern: { w: 'majority' }, strict: false })
    res.status(200).json(updatedDoc);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


app.post("/API/InsertIntoCollection/:collName", async (rqst, res) => {
  try {
    const newExp = await mongoose.connection.db.collection(rqst.params.collName).insertOne(rqst.body)
    res.status(201).json(newExp);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


app.get("/API/SelectData", async (rqst, res) => {
  try {
    
    const collName = rqst.query["collName"]
    const andOr = rqst.query["AndOr"]
    const dataModel = mongoose.model(collName, schema[collName]);    
    // neu co cac truong phu nhu sort/fields... phai loai ra truoc
    const exclField = ['sort','page','limit','fields','collName','andOr']
    let qryObj = {...rqst.query}
    exclField.forEach((ele) => {
      delete qryObj[ele]
    })
    // neu query string co so va dk là gte/gt.. thi phai them $ vao qry string nhu sau
    let queryCondi 
    if (andOr=='A'){
      let qryString = JSON.stringify (qryObj)
      qryString = qryString.replace (/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
      qryObj = JSON.parse(qryString)
      queryCondi = dataModel.find(qryObj).pretty().lean()
    } else {
      const conditions = [];
      for (const [cle, val] of Object.entries(qryObj)) {
        conditions.push({ [cle] : { $regex: val, $options: 'i' } })
      }
      const filter = conditions.length ? { $or: conditions } : {};
      queryCondi = dataModel.find(filter).pretty().lean()
    }

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

    const arrResuls = await queryCondi
    res.status(200).json(arrResuls);

  } catch (err) {
    res.status(500).json({ errors: err });
  }
});
