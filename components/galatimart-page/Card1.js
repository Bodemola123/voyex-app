'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import ProductCard from './ProductCard';
import Link from 'next/link';

const Card1 = ({ selectedCategory }) => {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get('https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api');
        const apiData = response.data?.data || {};

        const transformedSections = {};

        // Transforming and reversing the order of tools within each section
        Object.entries(apiData).forEach(([sectionKey, tools]) => {
          transformedSections[sectionKey] = tools
            .slice(0, 6) // Limit to 6 tools
            .reverse() // Reverse the order to show most recent tools first
            .map((tool) => ({
              id: tool.tool_id,
              title: tool.tool_name,
              image: tool.tool_assets_metadata?.icon || '',
              rating: tool.rating,
              tags: tool.use_case_tags,
              description: tool.large_description,
            }));
        });

        setSections(transformedSections);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Filter tools by selected category
  const filteredSections = selectedCategory
    ? {
        [selectedCategory]: sections[selectedCategory] || [],
      }
    : sections;

  if (loading) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      {Object.entries(filteredSections).map(([sectionName, tools]) => (
        <div key={sectionName} className="flex flex-col gap-4">
          <div className="flex flex-row items-start justify-between">
            <div className="flex gap-2 flex-col h-20">
              <h1 className="text-2xl font-bold capitalize">{sectionName}</h1>
              <p>
                Where the cosmic meets the artificial, offering a stellar
                selection of AI companions tailored to your interstellar
                adventures
              </p>
            </div>
            <Link
              href={`/galactimart/${sectionName}`}
              passHref
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C088FB] via-[#8E3EFF] to-[#8E3EFF] px-3 py-1 flex items-center gap-2"
            >
              See More <MdOutlineKeyboardArrowRight className="text-[#c088fb]" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 w-auto">
            {tools.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card1;
