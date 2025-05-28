"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const DeleteProduct = ({ toolName, onClose, toolId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Call the delete API with the toolId
    const res = await fetch(
      `https://xklp1j7zp3.execute-api.ap-southeast-2.amazonaws.com/default/voyex_tool_workspace?tool_id=${toolId}`,
      { method: 'DELETE' }
    );

      // Assuming success status is 200 (adjust if needed)
      if (res.status === 200) {
        toast.success(`${toolName} has been deleted successfully.`);
        onClose();
        // Redirect to /workspace after a slight delay so toast can be seen
        setTimeout(() => {
          router.push('/workspace');
        }, 100);
      } else {
        toast.error('Failed to delete the product. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to delete the product. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(19,19,20,0.8)] flex items-center justify-center z-50">
      <div className="bg-[#000000] text-white rounded-[41px] p-6 w-[482px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Delete Model?</h2>
          <button onClick={onClose} className="flex items-center justify-center">
            <Image src={'/close-square.svg'} alt="Close" width={58} height={58} />
          </button>
        </div>
        {/* Content */}
        <p className="mb-6 text-lg">
          Do you wish to delete <span className="text-xl font-bold">{toolName}</span> from GALACTIMART and every other place this model might have shown up?{' '}
          <a href="#" className="text-[#c088fb] underline">
            Learn more
          </a>
        </p>
        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 bg-transparent text-white rounded-[25px] hover:bg-gray-600 border border-[#FFFFFF26] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-5 py-2.5 text-[#0a0a0b] rounded-[25px] transition ${
              loading ? 'bg-red-400 cursor-not-allowed' : 'bg-[#ff1e1e] hover:bg-red-700'
            }`}
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
