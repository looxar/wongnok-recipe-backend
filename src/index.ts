import { Request, Response, NextFunction } from 'express';
const cors = require('cors')
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

const bcrypt = require('bcryptjs');

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:8000',
}));

app.post(`/signup`, async (req: Request, res: Response) => {
  try {
    const { user_name, email, password } = req.body;

    // Generate salt and hash the password
    const saltRounds = 10; // Number of salt rounds (recommended value)
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const result = await prisma.user.create({
      data: {
        user_name: user_name,
        email: email,
        password: hashedPassword, // Store the hashed password in the database
        salt: salt // Store the salt in the database
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
    const { email, password } = req.body;

    // Retrieve user from the database based on the provided email
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    // If the user doesn't exist or the provided email is incorrect, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    // If the passwords don't match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If authentication is successful, return a success message or user data
    res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

  const checkMemberRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Your middleware logic here
      next();
    } catch (error) {
      console.error('Error in checkMemberRole middleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  app.get("/user/all", async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          user_name: true
        }
      });
  
      res.json(users);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/recipe/all", async (req: Request, res: Response) => {
    try {
      const recipes = await prisma.recipe.findMany({
        include: {
          duration: true,
          level: true,
          user: {
            select: {
              id: true,
              email: true,
              user_name: true
            }
          },
        }
      });
  
      res.json(recipes);
    } catch (error) {
      console.error("Error retrieving recipes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post(`/recipecreate`, checkMemberRole , async (req: Request, res: Response) => {
    try {
      const { menu_name, pathimg, raw_material1, step, duration, difficult, user } =
        req.body;
      const result = await prisma.recipe.create({
        data: {
          menu_name: menu_name,
          img: pathimg,
          raw_material: raw_material1,
          step: step,
          time: {
            connect: { id: duration },
          },
          level_name: {
            connect: { id: difficult },
          },
          user_name: {
            connect: { id: user },
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
    const { setDuration } = req.body;

    // Check if setDuration is provided and is a valid number
    if (!setDuration || isNaN(parseInt(setDuration))) {
      return res.status(400).json({ error: "Invalid or missing 'setDuration' parameter" });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        durationId: parseInt(setDuration)
      },
      include: {
        duration: true,
        level: true,
        user: {
          select: {
            id: true,
            email: true,
            user_name: true
          }
        },
      }
    });

    res.json(recipes);
  } catch (error) {
    console.error("Error retrieving recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/recipe/bylevel", async (req: Request, res: Response) => {
  try {
    const { setLevel } = req.body;

    // Check if setDuration is provided and is a valid number
    if (!setLevel || isNaN(parseInt(setLevel))) {
      return res.status(400).json({ error: "Invalid or missing 'setDuration' parameter" });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        levelId: parseInt(setLevel)
      },
      include: {
        duration: true,
        level: true,
        user: {
          select: {
            id: true,
            email: true,
            user_name: true
          }
        },
      }
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
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)

