import React from 'react';
import ProductCard from './ProductCard';
import Modal from './Modals/Modal';

const Card = ({ templates, selectedProduct, setSelectedProduct }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <ProductCard
            key={template.template_id}
            product={template}
            onClick={() => setSelectedProduct(template)}
          />
        ))}
      </div>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Card;
