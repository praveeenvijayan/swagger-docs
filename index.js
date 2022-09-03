const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

const PORT = process.env.PORT || 4000;

// swagger Documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
  {
    id: "11",
    name: "learn react",
    price: 299,
  },
  {
    id: "22",
    name: "learn angular",
    price: 399,
  },
  {
    id: "33",
    name: "learn Django",
    price: 499,
  },
];

let lcoobjects = {
  id: "44",
  name: "learn backed",
  price: 399,
};

app.get("/", (req, res) => {
  res.status(200).send("helooooo");
});

app.get("/api/v1/lco", (req, res) => {
  res.status(200).send("helooooo from lco");
});

app.get("/api/v1/lcoobjects", (req, res) => {
  res.status(200).send(lcoobjects);
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.send(myCourse);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  let query = { location, device };
  res.send(query);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.send(true);
});

app.post("/api/v1/courseupload", (req, res) => {
  console.log(req.headers);
  const file = req.files.file;
  console.log(file);
  let path = __dirname + "/images/" + Date.now() + ".jpg";

  file.mv(path, (err) => {
    if (err) {
        res.send(false);
    }
    res.send(true);
  });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
