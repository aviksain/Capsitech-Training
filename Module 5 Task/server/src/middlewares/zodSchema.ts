import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not be longer than 20 characters."),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createTodoSchema = z.object({
  content: z
    .string()
    .min(3, "content must be at least 3 characters")
    .max(100, "Content must not be longer than 100 characters."),
});

export const updateTodoSchema = z.object({
  content: z.string().optional(),
  completed: z.boolean().optional(),
});

export const validate =
  (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res
        .status(400)
        .json({ message: "Invalid request body", errors: result.error.errors });
      return;
    }
    next();
  };
