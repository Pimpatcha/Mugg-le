const express = require("express");
const multer = require('multer');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const cors = require("cors");
app.use(cors());

/*=================================
        Database
===================================*/
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mugg-le", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

/*********schema-user********* */
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  repassword: String,
});

const UserModel = mongoose.model("UserModel", userSchema);

/**********schema-item********** */
const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  image: String,
  description: String,
});

const ProductModel = mongoose.model("ProductModel", productSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // กำหนดที่อยู่ที่เก็บไฟล์ภาพ
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });


/*============================
          get
=============================*/
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


/*=================================
            post
===================================*/
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, repassword } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ message: "This email id is already registered" });
    } else {
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password,
        repassword,
      });
      await newUser.save();
      res.send({ message: "Successfully registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "This email id is not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/update", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = password;
      await user.save();
      res.send({ message: "Profile updated successfully", user: user });
    } else {
      res.send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post('/additem', upload.single('image'), async (req, res) => {
  const { name, type, description } = req.body;

  try {
    const newItem = new ProductModel({
      name,
      type,
      image: req.file ? req.file.filename : '', // อัปเดตการอ่านข้อมูลรูปภาพ
      description,
    });
    await newItem.save();
    res.send({ message: 'Item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


/*============================
          delete
=============================*/
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await UserModel.findByIdAndDelete(userId);
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


/*============================
        listen
=============================*/
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
