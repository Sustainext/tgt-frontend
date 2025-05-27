'use client';

import { useState } from 'react';

const subsectionOptions = {
  about_company: [
    { id: 'business_model', label: 'Business Model and Impact',
      children: [
        { id: 'value_chain', label: 'Activities, Value Chain and Business Relationships' },
        { id: 'excluded_entities', label: 'Entities Included in the Organization’s Sustainability Reporting' },
       ]
     },
     { id: 'supply_chain', label: 'Supply Chain' },
  ],
  materiality: [
    { id: 'list_of_materials', label: 'List of material topics' },
    { id: 'topic_changes', label: 'Changes in the list of material topics' },
    { id: 'materiality_process', label: 'Materiality assessment – Process' },
    { id: 'management_strategy', label: 'Management of material topic' },
  ],
  community: [
    {
      id: 'community_management',
      label: 'Management of material topic',
      children: [
        { id: 'violation_rights', label: 'Incidents of Violation of Rights of Indigenous People' }
      ]
    },
    { id: 'csr', label: 'CSR' },
  ],
  customers: [
    {
      id: 'products_services',
      label: 'Products and services',
      children: [
        { id: 'safety_impact', label: 'Health and safety impacts of product and service categories' },
        { id: 'non_compliance', label: 'Incidents of non-compliance' }
      ]
    },
    {
      id: 'product_labeling',
      label: 'Product and service information & labeling',
      children: [
        { id: 'label_management', label: 'Management of material topic' }
      ]
    },
  ],
};

export default function SubsectionSelector({ sections, onNext, onBack }) {
  const enabledSections = sections.filter((s) => s.enabled);
  const [selectedSubs, setSelectedSubs] = useState(() => {
    const init = {};
    enabledSections.forEach((section) => {
      const available = subsectionOptions[section.id] || [];
      const collectIds = (subs) => subs.flatMap((s) => [s.id, ...(s.children ? collectIds(s.children) : [])]);
      init[section.id] = collectIds(available);
    });
    return init;
  });

  const toggleSub = (sectionId, subId) => {
    setSelectedSubs((prev) => {
      const current = prev[sectionId] || [];
      const updated = current.includes(subId)
        ? current.filter((id) => id !== subId)
        : [...current, subId];
      return {
        ...prev,
        [sectionId]: updated,
      };
    });
  };

  const renderSubsection = (sectionId, sub, level = 0) => {
    const isChecked = selectedSubs[sectionId]?.includes(sub.id) || false;

    return (
      <div key={sub.id} className={`pl-${level * 4} mb-2`}>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => toggleSub(sectionId, sub.id)}
            className="w-4 h-4 accent-green-600"
          />
          <span className={`text-[14px] ${sub.children ? 'font-medium' : ''} text-[#2E0B34]`}>
            {sub.label}
          </span>
        </label>
        {sub.children && (
          <div className="mt-1">
            {sub.children.map((child) => renderSubsection(sectionId, child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleProceed = () => {
    onNext(selectedSubs);
  };

  return (
    <div>
      <div className="space-y-8 border border-gray-400 p-6 rounded-md">
        {enabledSections.map((section, idx) => {
          const subs = subsectionOptions[section.id] || [];
          return (
            <div key={section.id} className='border-b border-gray-200'>
              <h3 className="mb-2 font-medium text-[#2E0B34] text-[16px]">
                {idx + 1}. {section.title}
              </h3>
              <div className='mb-4'>
                {subs.map((sub) => renderSubsection(section.id, sub))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>
        <button
          onClick={handleProceed}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Proceed to Report →
        </button>
      </div>
    </div>
  );
}
