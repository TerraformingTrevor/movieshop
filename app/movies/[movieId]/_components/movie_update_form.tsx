"use client";

import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateMovie } from "@/actions/update-action"; 


interface MovieUpdateFormProps {
  movie: {
    id: string;
    title: string;
    author: {
      id: number;
      name: string;
    } | null;
    releaseDate: Date;
    director: {
      id: number;
      name: string;
    } | null;
  };
}


const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(75, "Title must be at most 75 characters"),

  author: z
    .string()
    .min(1, "Movie author is required"),

   releaseDate: z
    .string().date("Invalid date").refine((val) => { const year = parseInt(val.split("-")[0], 10);
      const currentYear = new Date().getFullYear();
      return year >= 1000 && year <= currentYear;
    }, "Release date must be between 1000 and the current year"),

  director: z
    .string()
    .min(1, "Movie director is required"),

});

export function MovieUpdateForm({
  movie,
}: MovieUpdateFormProps) {
  const form = useForm({
    defaultValues: {
      title: movie.title,
      author: movie.author?.name ?? "Deleted Author",
      releaseDate: movie.releaseDate.toISOString().split("T")[0],
      director: movie.director?.name ?? "Deleted Director",
    },

    directorrs: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      await updateMovie({
        id: movie.id,
        title: value.title,
        author: value.author,
        releaseDate: value.releaseDate,
        director: value.director,
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        {/* TITLE */}
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Title
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  aria-invalid={isInvalid}
                  placeholder="Movie title"
                />

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* AUTHOR */}
        <form.Field name="author">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Author
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  aria-invalid={isInvalid}
                  placeholder="Author name"
                />

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        {/* PUBLICATION DATE */}
        <form.Field name="releaseDate">
  {(field) => {
    const isInvalid =
      field.state.meta.isTouched &&
      !field.state.meta.isValid;

    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>
          Release Date
        </FieldLabel>

        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          type="date"
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          aria-invalid={isInvalid}
          autoComplete="off"
        />

        {isInvalid && (
          <FieldError
            className="text-xs"
            errors={field.state.meta.errors}
          />
        )}
      </Field>
    );
  }}
</form.Field>

        {/* DIRECTOR */}
        <form.Field name="director">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Director
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(event.target.value)
                  }
                  aria-invalid={isInvalid}
                  placeholder="Director name"
                />

                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <Button type="submit">
        Update Movie
      </Button>
    </form>
  );
}