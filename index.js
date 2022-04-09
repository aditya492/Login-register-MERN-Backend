import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/myLoginRegisterDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected!");
  }
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Routes

// app.get('/',(req,res)=>{
//     res.send("MY API")
// })

app.post("/login", (req, res) => {
    const {email, password } = req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password===user.password){
               res.send({messgae:"Login SuccessFull",user:user})
           }
           else{
               res.send({message:"Password Didn't match"})
           }
        }
        else{
            res.send({ message: "User Not Registered" });
        }
    })
});

app.post("/register", (req, res) => {
  const { name, email, password, reEnterPassword } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Registered" });
    }
    else{
        const user = new User({
            name,
            email,
            password,
          });
          user.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send({ message: "Successfully Registered" });
            }
          });        
    }

    
  });
  
  // res.status(200).send("RUnninggggg")
});

app.listen(9002, () => {
  console.log("server Started ");
});
