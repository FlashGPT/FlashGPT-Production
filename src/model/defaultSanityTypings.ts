/**
 * This file contains automated sanity created typings
 */
export interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

export interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface File {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Reference {
  _ref: string;
  _type: "reference";
  _key: string;
}
