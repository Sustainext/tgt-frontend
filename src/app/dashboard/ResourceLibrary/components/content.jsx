'use client'
import React from "react";

const Content = ({ html }) => {
  if (!html) return null;

  return (
    <div
      className="prose max-w-none w-full px-2 md:px-8 py-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Content;