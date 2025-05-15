"use client";
import React, { useState, useEffect,Suspense } from "react";
import dynamic from 'next/dynamic';

const SkeletonLoader = ({ height = "1000px", width = "100%" }) => {
  return (
    <div className="w-full" style={{ height, width }}>
      {/* Header skeleton */}
      <div className="h-20 px-8 py-4 bg-gray-100 shadow-sm border-b border-gray-200 flex items-center mb-4 animate-pulse">
        <div className="h-8 w-56 bg-gray-300 rounded"></div>
      </div>

      {/* Tabs skeleton */}
      <div className="border-b border-gray-200 mb-6 px-8">
        <div className="flex space-x-8">
          <div className="py-4 px-1 border-b-2 border-blue-500 w-16 bg-gray-200 animate-pulse"></div>
          <div className="py-4 px-1 border-b-2 border-transparent w-32 bg-gray-200 animate-pulse"></div>
        </div>
      </div>

      {/* Main content area */}
      <div className="px-8">
        {/* Title and description */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-3/4">
            <div className="h-8 w-64 bg-gray-300 rounded animate-pulse mb-3"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-36 h-10 bg-blue-300 rounded-lg animate-pulse"></div>
        </div>

        {/* Search and filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-2 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="col-span-1 h-5 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Table rows */}
          {[...Array(5)].map((_, index) => (
            <div 
              key={index} 
              className="grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-100 animate-pulse"
            >
              <div className="col-span-2">
                <div className="h-5 w-4/5 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1">
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="col-span-1 flex justify-end space-x-2">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
                <div className="h-5 w-5 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-blue-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse ml-4"></div>
        </div>
      </div>
    </div>
  );
};

const OptimiseComponent = dynamic(() => import('./mainComponent'), {
  suspense: true,
  loading: () => <SkeletonLoader height="1000px" width="100%" />,
});

const Report = ({ open }) => {
  return (
    <Suspense fallback={<SkeletonLoader height="1000px" width="100%" />}>
      <OptimiseComponent open={open} />
    </Suspense>
  );
};

export default Report;
