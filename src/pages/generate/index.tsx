import React, { useCallback, useState } from "react";
import { getAuthSession } from "@/utils/authUtils/getAuthSession";
import { openaiPrompt } from "../../../openai/openaiPrompt";
import { useDropzone } from "react-dropzone";
import { QA } from "../../../openai/utils/parseCompletion";
import DropdownSearch from "@/components/DropdownSearch";
import { AuthFetch, CategoryFetch } from "../../model/sanityFetchTypings";
import FileDisplayComponent from "@/components/generateComponents/FileDisplayComponent";
import DropzoneComponent from "@/components/generateComponents/DropzoneComponent";
import { fetchAuthUsernameAll } from "@/utils/fetchUtils/fetchAuthUsernameAll";
import { createFlashcard } from "@/utils/createUtils/createFlashcard";
import {
  FlashcardCreate,
  FlashcardDeckInfo,
} from "@/model/sanityCreateTypings";
import { createFlashcardDeck } from "@/utils/createUtils/createFlashcardDeck";
import { modifyCategoryFlashcardDeck } from "@/utils/modifyUtils/modifyCategoryFlashcardDeck";
import InputComponent from "@/components/InputComponent";
import { useRouter } from "next/router";

// @ts-ignore
import extractTextFromPDF from "pdf-parser-client-side";

/**
 * Page to generate flashcards
 */
type Props = {
  categories: CategoryFetch[];
  user: AuthFetch;
};

export default function Generate({ categories, user }: Props) {
  // File handling and prompt
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [flashCards, setFlashCards] = useState<QA[]>([]);

  // Error handling
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dropdown
  const [dropdownCategories, setDropdownCategories] =
    useState<CategoryFetch[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFetch>();

  // Form
  const [flashcardDeckName, setFlashcardDeckName] = useState<string>("");
  const [flashcardDeckDescription, setFlashcardDeckDescription] =
    useState<string>("");

  // Status
  const [statusMessage, setStatusMessage] = useState<string>("Loading...");
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  /** Generates the flashcards from all the uploaded files */
  async function generateFlashCards(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!selectedCategory || flashcardDeckName === "") {
      setError("Please select a category and enter a flashcard deck name");
      return;
    }
    setIsLoading(true);

    if (uploadedFiles.length === 0) {
      setError("Please upload a file");
      return;
    }

    // const promises = uploadedFiles.map((file) => parseFlashcard(file));
    console.log("parsing...");
    const combinedContent: string[] = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const data = await extractTextFromPDF(uploadedFiles[i]);
      combinedContent.push(data);
    }

    try {
      console.log("Generating...", combinedContent);
      const completions = await openaiPrompt(combinedContent);

      setFlashCards(completions);
      const flashcardCreate: FlashcardCreate[] = completions.map(
        (completion, key) => {
          return {
            _type: "flashcard",
            name: `${uploadedFiles[0].name}_${key}`,
            question: completion.question,
            answer: completion.answer,
          };
        },
      );

      setStatusMessage("Uploading...");
      const resFlashcardIds = await createFlashcard(flashcardCreate);

      const flashcardDeckInfo: FlashcardDeckInfo = {
        _type: "flashcardDeck",
        name: flashcardDeckName,
        description: flashcardDeckDescription,
      };

      // Then create flashcardDeck
      const resFlashcardDeck = await createFlashcardDeck(
        flashcardDeckInfo,
        resFlashcardIds,
        selectedCategory._id,
      );

      // Then modify category
      const resModifyCategory = await modifyCategoryFlashcardDeck(
        selectedCategory._id,
        resFlashcardDeck,
      );

      router.push(`/flashcard`);
    } catch (error) {
      console.error("Error parsing flashcards:", error);
      throw error; // Rethrow the error if needed
    } finally {
      setIsLoading(false);
    }
  }

  /** Will be called to parse flashcards using the generation callback */
  async function parseFlashcard(file: File): Promise<string> {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/extractPdf`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) {
      console.log("response is not ok");
      return "";
    }
    const data = await response.json();

    return data.content;
  }

  return (
    <div className="w-full h-auto flex flex-col overflow-auto space-y-8 my-16 mx-8">
      <p className="text-4xl font-semibold">Tell FlashGPT what to generate</p>
      <div className="flex flex-col space-y-4">
        <div className="flex gap-2 items-center">
          <h1>Select Category:</h1>
          <DropdownSearch
            arr={dropdownCategories}
            setArr={setDropdownCategories}
            userId={user._id}
            setSelectedCategory={setSelectedCategory}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <InputComponent
          label="Flashcard Deck Name:"
          value={flashcardDeckName}
          onChange={setFlashcardDeckName}
        />
        <InputComponent
          label="Flashcard Deck Description:"
          value={flashcardDeckDescription}
          onChange={setFlashcardDeckDescription}
        />
      </div>
      <div className="flex flex-col items-center space-y-8">
        <DropzoneComponent
          isDragActive={isDragActive}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
        />
        {uploadedFiles.length > 0 && (
          <FileDisplayComponent
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        )}
        <button
          className={`bg-darkBlue text-white py-2 px-4 rounded-lg w-[200px] ${
            isLoading || !selectedCategory || flashcardDeckName === ""
              ? "opacity-80 bg-grey hover:opacity-80 cursor-default"
              : "hover:opacity-80 cursor-pointer transition-all"
          }}`}
          onClick={generateFlashCards}
          disabled={isLoading || !selectedCategory || flashcardDeckName === ""}
        >
          {isLoading ? statusMessage : "Generate"}
        </button>
        {error != "" && <span className="text-red">{error}</span>}
      </div>
    </div>
  );
}

/**
 * Require authentication to access this page
 */
export async function getServerSideProps(context: any) {
  try {
    const result = await getAuthSession(context);
    if (!result.isSession) {
      return {
        redirect: {
          destination: result.redirect.destination,
          permanent: result.redirect.permanent,
        },
      };
    }

    const session = result.session;
    if (!session || !session.user || !session.user.email) {
      return {
        props: {},
      };
    }

    const auth = await fetchAuthUsernameAll("", session.user.email);
    const user = auth[0];
    const categories = user.category;

    return {
      props: {
        session,
        categories,
        user,
      },
    };
  } catch (error: any) {
    console.error(error.message);
  }

  return {
    props: {},
  };
}
