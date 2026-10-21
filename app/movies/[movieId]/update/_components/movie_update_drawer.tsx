"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MovieUpdateForm } from "../../_components/movie_update_form";


interface MovieUpdateDrawerProps {
  movie: {
    id: string;
    title: string;
    description: string;
    price: number;
    releaseDate: Date; // Date? No, required in Prisma
    imageUrl: string | null;
    stock: number;
    runtime: number;
    personId: number | null;
    directorId: number | null;
  };
}


export function MovieUpdateDrawer({ movie }: MovieUpdateDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger
        render={
          <Button variant="outline">
            Update
          </Button>
        }
      />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update movie</DrawerTitle>
          <DrawerDescription>
            Change the information for this movie.
          </DrawerDescription>
        </DrawerHeader>

        <MovieUpdateForm movie={movie} />
      </DrawerContent>
    </Drawer>
  );
}