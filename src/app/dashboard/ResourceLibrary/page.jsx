"use client"
import React,{ useState, useMemo } from "react"
import Sidebar from "./components/mainSidebar"
import NavigationData from './data/navigation.json'
import RightSidebar from "./components/rightSidebar"
import Content from './components/content'
import HtmlTemplates from './data/htmlTemplates/htmlMapping';

function extractSectionsFromHtml(html) {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  // Tune this selector as needed, e.g. main sections are divs with id and maybe a class
  const nodes = [...doc.querySelectorAll('div[id]')];

  return nodes.map(div => {
    // Get title (assume the first <p> or <h2> inside? adapt as needed!)
    let title = '';
    const p = div.querySelector('p,.adjustLetterSpacing,h2,h3');
    if (p) title = p.textContent.trim();

    // You may want to filter for "section level" here if your HTML is messy!
    return {
      slug: div.id,
      title: title || div.id,
    };
  });
}

function findSidebarTitleBySlug(nav, slug) {
  for (const item of nav) {
    if (item.slug === slug && item.sidebarTitle) return item.sidebarTitle;
    if (item.children) {
      const found = findSidebarTitleBySlug(item.children, slug);
      if (found) return found;
    }
  }
  return undefined;
}

const ReportLibrary=()=>{

  const [activeSlug, setActiveSlug] = useState('gri-reporting-principles');
  const sidebarTitle = useMemo(
    () => findSidebarTitleBySlug(NavigationData, activeSlug) || 'Overview',
    [activeSlug]
  );

  // Look up HTML string for activeSlug
  const html = HtmlTemplates[activeSlug];
  console.log(html,activeSlug)

  // Dynamically extract right sidebar sections from HTML
  const sections = useMemo(
    () => extractSectionsFromHtml(html),
    [html]
  );

    return (
        <>
        <div className="flex">
              <Sidebar navData={NavigationData} activeSlug={activeSlug} onSelect={setActiveSlug} />
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
            <div className="flex">
              <div className="w-[80%]">
                <Content html={html} />
            </div>
            <div className="w-[20%]">
              <RightSidebar sections={sections} title={sidebarTitle} />
            </div>
             
            </div>
            
          </div>
        </div>
        </>
    )
}

export default ReportLibrary