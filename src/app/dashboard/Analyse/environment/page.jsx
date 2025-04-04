"use client";
import React, { useState, useEffect,Suspense } from "react";
import dynamic from 'next/dynamic';
import SkeletonLoader from '../../skeletonUI'


const AalyseEnvironmentComponent = dynamic(() => import('./mainComponent'), {
  suspense: true,
  loading: () => <SkeletonLoader height="1000px" width="100%" />,
});

const AalyseEnvironment = ({ open }) => {
  return (
    <Suspense fallback={<SkeletonLoader height="1000px" width="100%" />}>
      <AalyseEnvironmentComponent open={open} />
    </Suspense>
  );
};

export default AalyseEnvironment;
