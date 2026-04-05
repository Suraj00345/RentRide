import React, { useState, useEffect } from "react";
import { X, Car, IndianRupee, Hash, MapPin, Loader2, Tag, ImagePlus, CheckCircle2 } from "lucide-react";
import axios from "axios";

const EditCarModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  // 1. Initialize state with full schema structure
  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    plate_no: "",
    category: "",
    city: "",
    pricePerDay: "",
    images: [],
    description: {
      ABS: false,
      Cruise_Control: false,
      Air_conditioner: false,
      Automatic_window: false,
      fuel: "",
      transmission: "",
      seats: "",
      Air_Bags: "",
    }
  });

  const [uploading, setUploading] = useState(false);

  // 2. Sync state when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        description: { ...initialData.description } || {}
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  // --- CLOUDINARY UPLOAD LOGIC ---
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      return alert("Maximum 5 images allowed");
    }

    setUploading(true);
    const newImageUrls = [...formData.images];

    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "your_preset_name"); // REPLACE THIS

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // REPLACE THIS
          data
        );
        newImageUrls.push(res.data.secure_url);
      }
      setFormData({ ...formData, images: newImageUrls });
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Edit Vehicle Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>

        {/* Form Content */}
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 space-y-6 overflow-y-auto">
          
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Car Name</label>
              <input required className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-green-500" value={formData.carName} onChange={(e) => setFormData({...formData, carName: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Plate No</label>
              <input required className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl" value={formData.plate_no} onChange={(e) => setFormData({...formData, plate_no: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Price / Day</label>
              <input required type="number" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl" value={formData.pricePerDay} onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})} />
            </div>
          </div>

          {/* Section 2: Features (Description Object) */}
          <div className="bg-slate-50 p-4 rounded-2xl">
            <h3 className="text-sm font-bold mb-3 text-slate-700">Vehicle Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['ABS', 'Air_conditioner', 'Cruise_Control', 'Automatic_window'].map((feature) => (
                <label key={feature} className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded-lg border">
                  <input 
                    type="checkbox" 
                    checked={formData.description[feature]} 
                    onChange={(e) => setFormData({
                      ...formData, 
                      description: { ...formData.description, [feature]: e.target.checked }
                    })} 
                  />
                  <span className="text-[10px] font-medium uppercase">{feature.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
               <select className="p-2 border rounded-lg text-sm" value={formData.description.transmission} onChange={(e) => setFormData({...formData, description: {...formData.description, transmission: e.target.value}})}>
                  <option value="">Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
               </select>
               <input placeholder="Fuel Type" className="p-2 border rounded-lg text-sm" value={formData.description.fuel} onChange={(e) => setFormData({...formData, description: {...formData.description, fuel: e.target.value}})} />
            </div>
          </div>

          {/* Section 3: Image Upload */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Gallery (Max 5)</label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative group w-20 h-20">
                  <img src={img} className="w-full h-full object-cover rounded-xl border" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
                </div>
              ))}
              {formData.images.length < 5 && (
                <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition">
                  <ImagePlus className="text-gray-400" size={20} />
                  <input type="file" multiple hidden accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-gray-500">Cancel</button>
            <button type="submit" disabled={isLoading || uploading} className="flex-[2] py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
              {(isLoading || uploading) ? <Loader2 className="animate-spin" /> : "Save Updates"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCarModal;