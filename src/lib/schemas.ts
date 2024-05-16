import { z } from "zod";

export const petFormSchem = z
  .object({
    name: z.string().trim().min(3, { message: "name is required" }).max(20),
    ownerName: z
      .string()
      .trim()
      .min(3, { message: "ownername is required" })
      .max(20),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "must be valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(100),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl ||
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }));

export type petTypetwo = z.infer<typeof petFormSchem>;


export const authSchema = z.object({
  email: z.string().trim().email({ message: "email is required" }),
  password: z.string().trim().min(8, { message: "min 8 chars required" }),
});

export type authType = z.infer<typeof authSchema>;