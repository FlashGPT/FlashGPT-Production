import { SanityBody, File } from "./defaultSanityTypings";

/**
 * This file contains the typings for the Sanity schema.
 */
export interface AuthFetch extends SanityBody {
  _type: "auth";
  name: string;
  username: string;
  email: string;
  password: string;
  category: CategoryFetch[];
  calendar: CalendarFetch[];
}

export interface CategoryFetch extends SanityBody {
  _type: "category";
  name: string;
  description: string;
  flashcardDeck: FlashcardDeckFetch[];
  content: ContentFetch[];
}

export interface ContentFetch extends SanityBody {
  _type: "content";
  name: string;
  file: File;
}

export interface FlashcardDeckFetch extends SanityBody {
  _type: "flashcardDeck";
  category: CategoryFetch;
  name: string;
  description: string;
  flashcard: FlashcardFetch[];
}

export interface FlashcardFetch extends SanityBody {
  _type: "flashcard";
  name: string;
  question: string;
  answer: string;
}

export interface CalendarFetch extends SanityBody {
  _type: "calendar";
  flashcardDeck: FlashcardDeckFetch;
}
