
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// CREATE
const createMovieSchema = z.object({
  title: z
    .string()
    .min(3, "Title has to be at least 3 characters")
    .max(75, "Title must be at most 75 characters"),

  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  releaseDate: z.iso.date("Release date is required"),
  imageUrl: z.string().min(1, "Image URL is required"),
  stock: z.string().min(1, "Stock is required"),
  runtime: z.string().min(1, "Runtime is required"),
  author: z.string().min(1, "Movie author is required"),
  director: z.string().min(1, "Director is required"),
});

type CreateMovieInput = z.input<typeof createMovieSchema>;

export async function createMovie(input: CreateMovieInput) {
  let movieId: string;

  try {
    const data = createMovieSchema.parse(input);

    const author = await prisma.author.upsert({
      where: { name: data.author },
      update: {},
      create: { name: data.author },
    });

    // Reuse an existing director or create one if needed
    let director = await prisma.director.findFirst({
      where: { name: data.director },
    });

    if (!director) {
      director = await prisma.director.create({
        data: { name: data.director },
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseInt(data.price, 10),
        releaseDate: new Date(data.releaseDate),
        imageUrl: data.imageUrl,
        stock: parseInt(data.stock, 10),
        runtime: parseInt(data.runtime, 10),
        author: {
          connect: { id: author.id },
        },
        director: {
          connect: { id: director.id },
        },
      },
    });

    movieId = movie.id;
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return false;
    }

    return false;
  }

  revalidatePath("/movies");
  redirect(`/movies/${movieId}?toast=created`);
}
