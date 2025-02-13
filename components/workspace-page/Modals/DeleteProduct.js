import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteProduct = ({ toolName, onClose, onDelete }) => {
  // This function sends the DELETE request when the user confirms deletion.
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace",
        {
          data: { Tool_Name: toolName }, // Send data inside the `data` object
          headers: {
            "Content-Type": "application/json",
          },

        }
      );
  
      toast.success("Product deleted successfully!");
      onDelete()
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      toast.error("Product deletion failed. Please try again.");
    } finally {
      onClose();
    }
  };
  
  

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-6 w-[482px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Delete Model?</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>
        {/* Content */}
        <p className="mb-6 text-lg">
          Do you wish to delete <span className='text-xl font-bold'>{toolName}</span> from GALACTIMART and every other place this model might have shown up?{" "}
          <a href="#" className="text-[#c088fb] underline">
            Learn more
          </a>
        </p>
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-5 py-2.5 bg-[#ff1e1e] text-[#0a0a0b] rounded-[25px] hover:bg-red-700 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
