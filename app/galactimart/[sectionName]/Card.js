'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/galatimart-page/ProductCard';

const Card = ({ sectionName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get('https://2zztcz7h0a.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tools_api');
        const sectionTools = response.data[sectionName] || [];

        const formatted = sectionTools.map(tool => ({
          id: tool.tool_id,
          title: tool.tool_name,
          image: tool.tool_assets_metadata?.icon || '',
          rating: tool.rating,
          tags: tool.use_case_tags,
          description: tool.large_description,
        }));

        // Sort alphabetically by title
        formatted.sort((a, b) => a.title.localeCompare(b.title));
        setProducts(formatted);
      } catch (err) {
        console.error('Error loading tools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [sectionName]);

  if (loading) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Card;
