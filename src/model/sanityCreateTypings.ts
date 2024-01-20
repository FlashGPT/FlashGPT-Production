import { Reference } from "./defaultSanityTypings";

/**
 * This file contains the typings for creating data in sanity
 */

/**
 * Auth typing for post and patch requests to sanity
 * @param name name of the auth
 * @param username username of the auth
 * @param password password of the auth
 * @param category category to reference to
 */
export interface AuthCreate {
  _type: "auth";
  name: string;
  username: string;
  email: string;
  password: string;
  category: Reference[];
  calendar: Reference[];
}

/**
 * Category typing for post and patch requests to sanity
 * @param name name of the category
 * @param description description of the category
 * @param flashcardDeck flashcardDeck to reference to
 * @param content content to reference to
 */
export interface CategoryCreate {
  _type: "category";
  name: string;
  description: string;
  flashcardDeck: Reference[];
  content: Reference[];
}

export interface CategoryInfo {
  _type: "category";
  name: string;
  description: string;
}

export interface ContentCreate {
  _type: "content";
  name: string;
  file: File;
}

/**
 * FlashcardDeck with all type references
 */
export interface FlashcardDeckCreate {
  _type: "flashcardDeck";
  category: Reference;
  name: string;
  description: string;
  flashcard: Reference[];
}

/**
 * FlashcardDeck without the references
 */
export interface FlashcardDeckInfo {
  _type: "flashcardDeck";
  name: string;
  description: string;
}

export interface FlashcardCreate {
  _type: "flashcard";
  name: string;
  question: string;
  answer: string;
}

export interface CalendarCreate {
  _type: "calendar";
  flashcardDeck: Reference;
}
