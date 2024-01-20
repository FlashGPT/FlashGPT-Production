import React from "react";
import Image from "next/image";
import { FlashcardDeckFetch } from "@/model/sanityFetchTypings";
import Link from "next/link";

type Props = {
  deck: FlashcardDeckFetch;
  colors: string[];
  image: string;
};

function DeckComponent({ deck, colors, image }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <Link href={`/flashcard/${deck._id}`}>
        <div
          className={`h-44 aspect-square rounded-2xl rotate-[10deg] hover:rotate-[-10deg] duration-150`}
          style={{
            backgroundColor: colors[0],
          }}
        >
          <div
            className={`h-44 aspect-square rounded-2xl rotate-[-20deg] hover:rotate-[20deg] duration-150`}
            style={{
              backgroundColor: colors[1],
            }}
          >
            <div
              className={`h-44 aspect-square rounded-2xl flex justify-center items-center rotate-[10deg] relative hover:rotate-[-10deg] duration-150`}
              style={{
                backgroundColor: colors[2],
              }}
            >
              <Image
                src={image}
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-2xl border-2"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="text-center">
        <h1 className="text-xl font-bold">{deck.category.name}</h1>
        <h1>{deck.name}</h1>
        <h1 className="text-sm">{deck.description}</h1>
      </div>
    </div>
  );
}

export default DeckComponent;
