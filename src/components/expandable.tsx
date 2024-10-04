"use client";
import Image from "next/image";
import React, { useId } from "react";
import { motion } from "framer-motion";

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
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "Led Zeppelin",
    title: "Stairway To Heaven",
    src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
    ctaText: "Follow",
    ctaLink: "https://ui.aceternity.com/templates",
  },
  {
    description: "Mustafa Zahid",
    title: "Toh Phir Aao",
    src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
    ctaText: "Follow ",
    ctaLink: "https://ui.aceternity.com/templates",
  },
];
