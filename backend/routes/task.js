import express from "express";
const router = express.Router();

let data = {
  "adly@gmail.com": [
    "Manage user",
    "Meeting",
    "Vendor meet",
    "Requirements gathering",
    
  ],
  "renadi@gmail.com": [
    "chek",
    "check",
    "check1",
    "chekc2",
    
  ],
};


  const getTask = async (req, res) => {
    try {
      const email = req.user;
  
      res.status(200).send(data[email]);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

router.get("/", getTask);
export default router;