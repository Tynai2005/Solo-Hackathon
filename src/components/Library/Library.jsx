import React from "react";
import { useEffect } from "react";
import LibraryCard from "./LibraryCard";

const Library = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ minHeight: "80vh" }}>
      <LibraryCard /> 
    </div>
  );
};

export default Library;
