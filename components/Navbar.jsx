"use client";



import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

import { EASE } from "@/lib/motion";

import { LOGO_SRC, IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/imageConfig";

import CircleMenu from "@/components/ui/CircleMenu";

import { useMotionActive } from "@/lib/useMotionActive";

import { cn } from "@/lib/utils";



const navSlide = {

  hidden: { opacity: 0, y: -100 },

  show: {

    opacity: 1,

    y: 0,

    transition: { duration: 0.6, ease: EASE },

  },

};



const staticNav = {

  hidden: { opacity: 1, y: 0 },

  show: { opacity: 1, y: 0 },

};



export default function Navbar() {

  const { disableMotion, motionKey } = useMotionActive();

  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);

  }, []);



  return (

    <motion.header

      key={motionKey}

      variants={disableMotion ? staticNav : navSlide}

      initial={disableMotion ? "show" : "hidden"}

      animate="show"

      className={cn("fixed inset-x-0 top-0", menuOpen ? "z-[110]" : "z-50")}

    >

      <div className="relative">

        <motion.div

          className="pointer-events-none absolute inset-0 border-b border-green-line bg-green-abyss"

          animate={{ opacity: scrolled ? 1 : 0 }}

          transition={{ duration: 0.3, ease: EASE }}

        />



        <nav className="relative mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 md:h-[4.5rem]">

          <Link

            href="/"

            className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-green-abyss"

          >

            <Image

              src={LOGO_SRC}

              alt="Jamana Hub"

              width={140}

              height={32}

              quality={IMAGE_QUALITY.emblem}

              sizes={IMAGE_SIZES.nav}

              className="h-8 w-auto"

            />

          </Link>



          <CircleMenu onOpenChange={setMenuOpen} />

        </nav>

      </div>

    </motion.header>

  );

}

