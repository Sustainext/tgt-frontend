"use client";
import React, { useState, useEffect,Suspense } from "react";
import dynamic from 'next/dynamic';
import SkeletonLoader from '../skeletonUI'


const GovernanceComponent = dynamic(() => import('./mainComponent'), {
  suspense: true,
  loading: () => <SkeletonLoader height="1000px" width="100%" />,
});

const Governance = ({ open }) => {
  return (
    <Suspense fallback={<SkeletonLoader height="1000px" width="100%" />}>
      <GovernanceComponent open={open} />
    </Suspense>
  );
};

export default Governance;
