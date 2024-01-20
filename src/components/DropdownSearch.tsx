import React, { useState, useRef, useEffect, BaseSyntheticEvent } from "react";
import { createCategory } from "../utils/createUtils/createCategory";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CategoryFetch } from "@/model/sanityFetchTypings";
import { modifyAuthCategory } from "@/utils/modifyUtils/modifyAuthCategory";

type Props = {
  arr: CategoryFetch[];
  setArr: Function;
  userId: string;
  setSelectedCategory: Function;
  isLoading: boolean;
  setIsLoading: Function;
};

type Inputs = {
  categoryName: string;
  categoryDescription: string;
};

function DropdownSearch(props: Props) {
  const [selectedName, setSelectedName] = useState<string>("");
  const [isAddable, setIsAddable] = useState<boolean>(false);

  /** This handles changes when users select dropdown */
  const handleChange = (
    event: BaseSyntheticEvent,
    value: { label: string; id: string } | null,
  ) => {
    event.preventDefault();
    if (!value) {
      return;
    }
    const selectedCategory = props.arr.find(
      (category) => category._id === value.id,
    );
    props.setSelectedCategory(selectedCategory);
    setSelectedName(value.label);
  };

  /** This handles change when user types something into the input */
  const handleInputChange = (event: BaseSyntheticEvent, value: string) => {
    event.preventDefault();
    checkIsAddable(value);
    setSelectedName(value);

    if (value == "") {
      props.setSelectedCategory(undefined);
    }
  };

  /** Checks if the current category can be added */
  const checkIsAddable = (selectedName: string) => {
    if (
      selectedName === "" ||
      props.arr.find((category) => category.name === selectedName)
    ) {
      setIsAddable(false);
    } else {
      setIsAddable(true);
    }
  };

  /** Handles the creation of category */
  const createCategoryHandler = async (formData: Inputs) => {
    props.setIsLoading(true);

    const res = await createCategory({
      _type: "category",
      name: formData.categoryName,
      description: formData.categoryDescription,
    });

    if (!res) {
      console.error("Could not create category");
      return;
    }

    const resAuth = await modifyAuthCategory(res, props.userId);

    if (!resAuth) {
      console.error("Could not modify auth");
      return;
    }

    // Construct the new category object
    const newCategory: CategoryFetch = {
      _id: res,
      _type: "category",
      name: formData.categoryName,
      description: formData.categoryDescription,
      flashcardDeck: [],
      content: [],
      _createdAt: "",
      _updatedAt: "",
      _rev: "",
    };
    await props.setArr([...props.arr, newCategory]);

    props.setIsLoading(false);
  };

  const displayCategories = () => {
    return props.arr.map((category) => {
      return { label: category.name, id: category._id };
    });
  };

  return (
    <div className="flex space-x-4">
      <Autocomplete
        disablePortal
        freeSolo
        id="category-combo-box"
        options={displayCategories()}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" />}
        onChange={(event, value) => {
          if (typeof value === "string") {
            value = { label: value, id: "" };
          }
          handleChange(event, value);
        }}
        onInputChange={(event, value) => {
          handleInputChange(event, value);
        }}
      />
      <button
        className={`rounded-full px-6 m-2 text-white text-sm bg-darkBlue shadow-md ${
          isAddable || props.isLoading ? "opacity-100" : "opacity-50 bg-blue"
        }}`}
        onClick={() =>
          createCategoryHandler({
            categoryName: selectedName,
            categoryDescription: "",
          })
        }
        disabled={!isAddable || props.isLoading}
      >
        {props.isLoading ? "Loading..." : "Create"}
      </button>
    </div>
  );
}

export default DropdownSearch;
