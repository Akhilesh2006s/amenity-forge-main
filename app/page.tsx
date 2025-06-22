"use client"

import HeroGeometric from "../components/Amenity forge/hero-geometric"
import Book from "../components/Amenity forge/interactive-book"
import Service from "../components/Amenity forge/Services"
import Choose from "../components/Amenity forge/Choose"
import Project from "../components/Amenity forge/Projects"
import Result from "../components/Amenity forge/Results"

export default function Page() {
  return (
    <>
    <HeroGeometric />
    <Service/>
    <Choose/>
    <Project/>
    <Result/>
    <Book />
    </>
  );
}
