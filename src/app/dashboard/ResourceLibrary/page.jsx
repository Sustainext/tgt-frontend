"use client"
import React,{ useState, useMemo } from "react"
import Sidebar from "./components/mainSidebar"
import NavigationData from './data/navigation.json'

function findFirstSlug(nav) {
  // Helper to find the first slug in navData recursively
  for (const item of nav) {
    if (item.slug) return item.slug;
    if (item.children) {
      const found = findFirstSlug(item.children);
      if (found) return found;
    }
  }
  return null;
}

const ReportLibrary=()=>{
     const firstSlug = useMemo(() => findFirstSlug(NavigationData), [NavigationData]);
  const [activeSlug, setActiveSlug] = useState(firstSlug);

  // Get active content from contentData
//   const activeContent = contentData?.[activeSlug];
    return (
        <>
        <div className="flex">
              <Sidebar navData={NavigationData} activeSlug={activeSlug}
        onSelect={setActiveSlug} />
          <div className="w-full">
            <div className="flex flex-col justify-start overflow-x-hidden scrollable-content ">
              <div className="flex justify-between items-center border-b border-gray-200 mb-2 w-full">
                <div className="w-full">
                  <div className="text-left mb-2 ml-3 pt-1">
                    <div className="flex">
                      <div>
                        <p className="gradient-text text-[22px] font-bold pt-4 pb-4 ml-3">
                          Resource Library
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
                content
            </div>
          </div>
        </div>
        </>
    )
}

export default ReportLibrary