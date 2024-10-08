"use client";
import Image from "next/image";
import React, { useId } from "react";
import { motion } from "framer-motion";
import lakshya from "../../public/lakshya.jpeg";
import naman from "../../public/naman.jpeg";
import GoCute from "../../public/GoCute.png";
import sid from "../../public/sid.png";
import matrix from "../../public/dummy.webp";

export default function ExpandableCardDemo() {
  const id = useId();

  return (
    <>
      <div className="max-w-[40vh] text-white">
        <ul className="max-w-2xl mx-auto w-full gap-4">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={`card-${card.title}-${id}`}
              className="p-4 flex flex-col md:flex-row justify-between items-center rounded-xl cursor-default"
            >
              <div className="flex gap-4 flex-col md:flex-row ">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <Image
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-100 dark:text-neutral-200 text-center md:text-left"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
              <motion.a
                layoutId={`button-${card.title}-${id}`}
                href={card.ctaLink}
                target="_blank"
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-800 hover:text-white text-black mt-4 md:mt-0"
              >
                {card.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}

const cards = [
  {
    description: "@ReactLak",
    title: "Lakshya Jain",
    src: lakshya,
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "@naman7262",
    title: "Naman",
    src: naman,
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "@B1smuth",
    title: "Siddhartha",
    src: sid,
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "@shashavt",
    title: "Shashwat Singh",
    src: GoCute,
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "@theMatrix",
    title: "Neo Vance",
    src: matrix,
    ctaText: "Follow ",
    ctaLink: "https://ui.aceternity.com/templates",
  },
];
