import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MovieDeleteDialog } from "./_components/movie-delete-dialog";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MovieUpdateDrawer } from "./update/_components/movie_update_drawer";

export default async function MovieDetailsPage(
    props: PageProps<"/movies/[movieId]">
) {
    const params = await props.params;
    const movieId = parseInt(params.movieId);
    if (Number.isNaN(movieId)) {
        notFound();
    }
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
        include: { person: true}, 
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
    Person: {movie.person?.name ?? "Deleted Person"}
  </h2>

  <p>
    Release Date: {movie.releaseDate.toLocaleDateString("sv-SE")}
  </p>

  <h2 className="text-gray-500">
    Director: {movie.director?.name ?? "Deleted Director"}

    <div className="flex gap-2">

<MovieUpdateDrawer
  movie={{
    id: movie.id,
    title: movie.title,
    person: movie.person?.name ?? "Deleted Person",
    releaseDate: new Date(movie.releaseDate),
    director: movie.director?.name ?? "Deleted Director",
  }}
/>

        <MovieDeleteDialog movieId={movie.id} redirectTo="/movies" /> 
        </div>
    </h2>
  </div>
);
}
