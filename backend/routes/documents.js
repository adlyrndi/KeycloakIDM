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

const getDocuments = async (req, res) => {
    try {
      const email = req.user;
      if (!email) {
        return res.status(400).send("User not authenticated");
      }
      res.status(200).send(req.user);
    } catch (err) {
      console.error(err);  
      res.status(500).send("Internal server error");
    }
  };

  const getTask = async (req, res) => {
    try {
      const email = req.user;
  
      res.status(200).send(data[email]);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  

router.get("/", getDocuments);
export default router;