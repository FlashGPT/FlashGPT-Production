import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  formLabel: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<Inputs>;
  children?: React.ReactNode;
};

type Inputs = {
  categoryName: string;
  categoryDescription: string;
};

function CategoryForm({ formLabel, isLoading, onSubmit, children }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 mx-auto border p-16 rounded-md fixed"
    >
      <h2 className="text-lg">{formLabel}</h2>
      <input
        {...register("categoryName")}
        placeholder="Category Name"
        type="text"
        className="border rounded-md px-4 py-2"
      />
      <input
        {...register("categoryDescription")}
        placeholder="Category Description"
        type="categoryDescription"
        className="border rounded-md px-4 py-2"
      />
      <button
        type="submit"
        className="border padding-4 rounded-md"
        disabled={isLoading}
      >
        Submit
      </button>
      {children}
    </form>
  );
}

export default CategoryForm;
