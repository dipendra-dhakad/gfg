import React from "react";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        {/* Logo */}
        <div className="flex justify-start mb-4">
          <img
            src="https://logospng.org/download/w3schools/w3schools-1536.png"
            alt="W3Schools Logo"
            className="w-12 p-0"
          />
        </div>

        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">Home</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">Tutorials</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">References</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 hover:bg-gray-700">Exercises</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-900 text-white p-4 flex justify-between">
          <span className="text-lg font-bold">W3Schools Clone</span>
          <button className="bg-green-500 px-3 py-1 rounded">Login</button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Server Code Section */}
          <h1 className="text-2xl font-bold mb-4">Server Code</h1>

          <pre className="bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
            <code className="whitespace-pre-wrap">
{`const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/book_routes");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB = process.env.MONGODB_URL;

// DB Connection
try {
  mongoose.connect(DB);
  console.log("DB connected Successfully");
} catch (error) {
  console.log("Error while connecting DB ", error);
}

// Defining Routes
app.use("/api", bookRoutes);

app.listen(PORT, () => {
  console.log("App is listening at ", PORT);
});`}
            </code>
           

          </pre>
          <h1 className="text-2xl font-bold mb-4">Controllers</h1>
          <pre className="bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
          <code className="whitespace-pre-wrap">
            {
              `const multer = require("multer");
const path = require("path");
const Form = require("../model/formSchema");
const { response } = require("express");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Initialize Multer
const upload = multer({ storage, fileFilter });

// Submit Controller with Multer
exports.submitController = async (req, res) => {
  try {
    const { name, email, phone, skills, role, preferredLocation } = req.body;
    const image = req.file ? req.file.filename : null;

    let missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!role) missingFields.push("role");
    if (!preferredLocation) missingFields.push("preferredLocation");
    if (!skills || skills.length === 0) missingFields.push("skills");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields,
      });
    }

    const newUser = new Form({
      name,
      email,
      phone,
      skills: skills,
      role,
      preferredLocation,
      image,
    });

    await newUser.save();
    return res.status(201).json({
      message: "Data submitted successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in submitController:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const user = Form.find();
    return res.status(200).json({ message: "this is all users", data: user });
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}`
            }
          </code>
          </pre>
          <h1 className="text-2xl font-bold mb-4">Schema</h1>
          <pre className="bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
          <code className="whitespace-pre-wrap">
            {
              `const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  image: { type: String },
  skills: [{ type: String }],
  preferredLocation: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("Form", formSchema);
`
            }
          </code>
          </pre>
          <h1 className="text-2xl font-bold mb-4">routes</h1>
          <pre className="bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
          <code className="whitespace-pre-wrap">
            {
              `const express = require("express");
const router = express.Router();

const { submitController, getAllUser } = require("../controllers/book_controller")


router.get("/getAll", getAllUser);
router.post("/submit", submitController);
module.exports = router;

`
            }
          </code>
          </pre>
          <h1 className="text-2xl font-bold mb-4">frontend</h1>
          <pre className="bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
          <code className="whitespace-pre-wrap">
            {
              `import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const skillsOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Express", label: "Express" },
];

const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai"];
const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
];

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
    skills: [],
    preferredLocation: "",
    role: "",
  });

  const savedData = JSON.parse(localStorage.getItem("multiStepForm"));
  useEffect(() => {
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("multiStepForm", JSON.stringify(data));
  };

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
    saveToLocalStorage(updatedFormData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFormData = { ...formData, image: file };
      setFormData(updatedFormData);
      saveToLocalStorage(updatedFormData);
    }
  };

  const handleSkillsChange = (selectedOptions) => {
    const selectedSkills = selectedOptions.map((opt) => opt.value);
    const updatedFormData = { ...formData, skills: selectedSkills };
    setFormData(updatedFormData);
    saveToLocalStorage(updatedFormData);
  };

  // Handle Step Navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.image ||
      formData.skills.length === 0 ||
      !formData.preferredLocation ||
      !formData.role
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        if (!(file instanceof File)) {
          resolve(null);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
  
    let imageBase64 = null;
    if (formData.image instanceof File) {
      imageBase64 = await convertToBase64(formData.image);
    }
  
    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      preferredLocation: formData.preferredLocation,
      skills: formData.skills,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/submit",
        formDataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      alert("Form submitted successfully!");
      localStorage.removeItem("multiStepForm");
      setFormData({
        name: "",
        email: "",
        phone: "",
        image: null,
        skills: [],
        preferredLocation: "",
        role: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Step {step} of 3</h2>

      {step === 1 && (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full mb-2"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <Select
            isMulti
            options={skillsOptions}
            onChange={handleSkillsChange}
            value={skillsOptions.filter((option) =>
              formData.skills.includes(option.value)
            )}
            className="mb-2"
          />
          <select
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Previous
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
`
            }
          </code>
          </pre>
        </main>
      </div>
    </div>
  );
};

export default App;
