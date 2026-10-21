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
import { createMovie } from "@/actions/create-action";





const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title has to be at least 3 characters")
    .max(75, "Title must be at most 75 characters"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  releaseDate: z.iso.date("Invalid release date"),
  imageUrl: z.string().min(1, "Image URL is required"),
  stock: z.string().min(1, "Stock is required"),
  runtime: z.string().min(1, "Runtime is required"),
  person: z.string().min(1, "Person is required"),
  director: z.string().min(1, "Director is required"),
});

export function MovieCreateForm() {
const form = useForm({
  defaultValues: {
    title: "",
    description: "",
    price: "",
    releaseDate: "",
    imageUrl: "",
    stock: "",
    runtime: "",
    person: "",
    director: "",
  },

  validators: {
    onSubmit: formSchema,
  },

  onSubmit: async ({ value }) => {
    await createMovie({
      title: value.title,
      description: value.description,
      price: value.price,
      releaseDate: value.releaseDate,
      imageUrl: value.imageUrl,
      stock: value.stock,
      runtime: value.runtime,
      person: value.person,
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

        {/* PERSON */}
        <form.Field name="person">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched &&
              !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>
                  Person
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
                  placeholder="Person name"
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
        Create Movie
      </Button>
    </form>
  );
}