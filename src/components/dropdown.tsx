import React, { useState, useRef, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import CategoryForm from "./CategoryForm";
import { createCategory } from "../utils/createUtils/createCategory";

type Props = {
  arr: any[];
  setArr: Function;
};

type Inputs = {
  categoryName: string;
  categoryDescription: string;
};

function Dropdown(props: Props) {
  const [color, setColor] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const primaryRef = useRef<HTMLSelectElement>(null);

  const toggleFormVisibility = (event: any) => {
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    // focus on input
    if (primaryRef.current && !isFormOpen) {
      primaryRef.current.focus();
    }
    if (primaryRef.current && isFormOpen) {
      primaryRef.current.blur();
    }
  }, [isFormOpen]);

  const handleChange = (event: any) => {
    event.preventDefault();
    setColor(event.target?.value);
    console.log(event.target?.value);
    props.setArr(event.target.value);
  };

  const createCategoryHandler = async (formData: Inputs) => {
    // add to array
    props.setArr([...props.arr, formData.categoryName]);
    // refresh dropdown
    setIsFormOpen(false);

    const res = await createCategory({
      _type: "category",
      name: formData.categoryName,
      description: formData.categoryDescription,
    });
  };

  return (
    <Select
      value={color}
      ref={primaryRef}
      onChange={handleChange}
      sx={{
        marginTop: 0,
        width: 250,
        height: 50,
      }}
    >
      {props.arr.map((item, key) => {
        return (
          <MenuItem value={item} key={key}>
            {item}
          </MenuItem>
        );
      })}
      <div>
        <button
          className="ml-3 p-2 border rounded-sm"
          onClick={toggleFormVisibility}
        >
          Add
        </button>
        {isFormOpen && (
          <CategoryForm
            formLabel="Add Category"
            onSubmit={createCategoryHandler}
          />
        )}
      </div>
    </Select>
  );
}

export default Dropdown;
