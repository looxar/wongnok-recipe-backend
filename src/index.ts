import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
const cors = require("cors");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const bcrypt = require("bcryptjs");
import multer, { Multer } from 'multer'; 
const path = require('path');

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://localhost:8001",
      "http://localhost:3000",
      "http://localhost:8081",
    ],
  })
);
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('recipes-img'));
//app.use(express.static('public'))
//app.use('/recipes-img',express.static(path.join(__dirname,'../recipes-img')));
//app.use('/recipes-img/', express.static(path.join(__dirname, '../', 'recipes-img')));

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

app.post(`/signup`, async (req: Request, res: Response) => {
  try {
    const {
      params: { user_name, email, password },
    } = req.body;
    // Generate salt and hash the password
    const saltRounds = 10; // Number of salt rounds (recommended value)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const result = await prisma.user.create({
      data: {
        user_name: user_name,
        email: email,
        password: hashedPassword, // Store the hashed password in the database
        salt: salt, // Store the salt in the database
      },
    });

    res.json(result);
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(`/login`, async (req: Request, res: Response) => {
  try {
    const {
      params: { email, password },
    } = req.body;
    // Retrieve user from the database based on the provided email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // If the user doesn't exist or the provided email is incorrect, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    // If the passwords don't match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If authentication is successful, return a success message or user data
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const checkMemberRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Your middleware logic here
    next();
  } catch (error) {
    console.error("Error in checkMemberRole middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/user/all", async (req: Request, res: Response) => {
  
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        user_name: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/recipe/all", async (req: Request, res: Response) => {
  console.log("__dirname "+__dirname);
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        duration: true,
        difficult: true,
        user: {
          select: {
            id: true,
            email: true,
            user_name: true,
          },
        },
      },
    });

    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Set up Multer to store files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './recipes-img');
  },
  filename: function (req, file, cb) {
    // Use a placeholder for the ID in the filename
    cb(null, 'recipe_' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the configured storage options
const upload = multer({ storage: storage });

app.post(`/recipecreate`, upload.single('image'), async (req: MulterRequest, res: Response) => {
  try {
    // const {
    //   params: {
    //     menu_name,
    //     raw_material,
    //     step,
    //     duration,
    //     difficult,
    //     user,
    //   },
    // } = req.body;
    const { menu_name, raw_material, step, duration, difficult, user } = req.body;
    const pathimg = req.file ? req.file.filename : null; // Use the filename provided by Multer

    const result = await prisma.recipe.create({
      data: {
        menu_name: menu_name,
        pathimg: pathimg,
        raw_material: raw_material,
        step: step,
        duration: {
          connect: { id: parseInt(duration) },
        },
        difficult: {
          connect: { id: parseInt(difficult) },
        },
        user: {
          connect: { id: parseInt(user) },
        },
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Error create recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/recipe/byduration", async (req: Request, res: Response) => {
  try {
    console.log("req.body : " + JSON.stringify(req.body));
    const {
      params: { setDuration },
    } = req.body;
    // Check if setDuration is provided and is a valid number
    if (!setDuration || isNaN(parseInt(setDuration))) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'setDuration' parameter" });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        durationId: parseInt(setDuration),
      },
      include: {
        duration: true,
        difficult: true,
        user: {
          select: {
            id: true,
            email: true,
            user_name: true,
          },
        },
      },
    });
    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/recipe/bylevel", async (req: Request, res: Response) => {
  try {
    const {
      params: { setLevel },
    } = req.body;

    // Check if setDuration is provided and is a valid number
    if (!setLevel || isNaN(parseInt(setLevel))) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'setDuration' parameter" });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        levelId: parseInt(setLevel),
      },
      include: {
        difficult: true,
        duration: true,
        user: {
          select: {
            id: true,
            email: true,
            user_name: true,
          },
        },
      },
    });

    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/recipe/bybothcon", async (req: Request, res: Response) => {
  try {
    const {
      params: { setLevel, setDuration },
    } = req.body;
    // Check if setDuration is provided and is a valid number
    if (!setLevel || isNaN(parseInt(setLevel))) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'setDuration' parameter" });
    }
    if (!setDuration || isNaN(parseInt(setDuration))) {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'setDuration' parameter" });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        levelId: parseInt(setLevel),
        durationId: parseInt(setDuration),
      },
      include: {
        difficult: true,
        duration: true,
        user: {
          select: {
            id: true,
            email: true,
            user_name: true,
          },
        },
      },
    });

    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const server = app.listen(8080, () =>
  console.log(`
🚀 Server ready at: http://localhost:8080
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`)
);
