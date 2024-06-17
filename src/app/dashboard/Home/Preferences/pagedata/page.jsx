'use client'
import React, { useState, useEffect } from "react";
import SDGCards from "./SDGCards";
import Frameworks from "./Frameworks";
import Certifications from "./Certifications";
import Targets from "./Targets";
import Ratings from "./Ratings";
import Regulation from "./Regulation";

const PreferencePages = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const currentPageParam = searchParams.get("currentPage");
      const initialPage = currentPageParam ? parseInt(currentPageParam) : 1;
      setCurrentPage(initialPage);
      console.log('page', initialPage);
    }
  }, []);

  return (
    <div>
      {currentPage === 1 && <SDGCards />}
      {currentPage === 2 && <Frameworks />}
      {currentPage === 3 && <Certifications />}
      {currentPage === 4 && <Targets />}
      {currentPage === 5 && <Ratings />}
      {currentPage === 6 && <Regulation />}
    </div>
  );
};

export default PreferencePages;
