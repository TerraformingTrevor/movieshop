import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookDeleteDialog } from "./_components/book-delete-dialog";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BookUpdateDrawer } from "./update/_components/book_update_drawer";

export default async function MovieDetailsPage(
    props: PageProps<"/movies/[movieId]">
) {
    const params = await props.params;
    const movieId = (params.movieId);

    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: { author: true}, 
    });

    if (!movie) {
        notFound();
    }
return (
  
<div className="space-y-2 p-6">

  <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold">
      {movie.title}
    </h1>

    <Link
      href="/listing"
      className={buttonVariants({ variant: "outline" })}
    >
      Back to List
    </Link>
  </div>

  <h2 className="mt-2 text-lg text-black-500 font-bold">
    Author: {movie.author?.name ?? "Deleted Author"}
  </h2>

  <p>
    Published: {movie.published.toLocaleDateString("sv-SE")}
  </p>

  <h2 className="text-gray-500">
    isbn: {movie.isbn}

    <div className="flex gap-2">

<MovieUpdateDrawer
  movie={{
    id: movie.id,
    title: movie.title,
    author: movie.author?.name ?? "Deleted Author",
    published: new Date(movie.published),
    isbn: movie.isbn,
  }}
/>

        <MovieDeleteDialog movieId={movie.id} redirectTo="/movies" /> 
        </div>
    </h2>
  </div>
);
}
