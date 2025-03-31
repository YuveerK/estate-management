import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "../../../constants/env.const";

const CreateMaintenanceModal = ({
  isOpen,
  onClose,
  existingRequest = null,
  onSuccess = () => {},
}) => {
  const [residents, setResidents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    unitId: "",
    userId: "",
    category: "",
    priority: "",
    images: [],
    existingImages: [],
  });
  const [loading, setLoading] = useState(false);
  console.log(residents);
  useEffect(() => {
    if (isOpen) {
      fetchResidents();

      if (existingRequest) {
        setFormData({
          title: existingRequest.title,
          description: existingRequest.description,
          unitId: existingRequest.unitId,
          userId: existingRequest.userId,
          category: existingRequest.category,
          priority: existingRequest.priority,
          images: [],
          existingImages: existingRequest.images
            ? JSON.parse(existingRequest.images)
            : [],
        });
      } else {
        setFormData({
          title: "",
          description: "",
          unitId: "",
          userId: "",
          category: "",
          priority: "",
          images: [],
          existingImages: [],
        });
      }
    }
  }, [isOpen, existingRequest]);

  const fetchResidents = async () => {
    try {
      const res = await axios.get(`${URL}/get-all-residents`);
      setResidents(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch residents");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(value);
    if (name === "images") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDeleteImage = (filename) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== filename),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      const {
        title,
        description,
        unitId,
        userId,
        category,
        priority,
        existingImages,
        images,
      } = formData;

      console.log(userId);

      data.append("title", title);
      data.append("description", description);
      data.append("unitId", unitId);
      data.append("userId", parseInt(userId, 10)); // ✅ convert to int
      data.append("category", category);
      data.append("priority", priority);
      data.append("existingImages", JSON.stringify(existingImages));

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      if (existingRequest) {
        await axios.put(
          `${URL}/update-maintenance/${existingRequest.requestId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Request updated!");
      } else {
        await axios.post(`${URL}/create-maintenance`, data);
        toast.success("Request created!");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-[700px] max-w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-1">
          {existingRequest ? "Update Request" : "Create Maintenance Request"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {existingRequest
            ? "Edit the maintenance request details."
            : "Fill out the form below to log a new maintenance issue."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 text-sm"
        >
          <div className="flex flex-col">
            <label className="font-medium">Request Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Unit ID</label>
            <input
              type="text"
              name="unitId"
              value={formData.unitId}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Resident</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            >
              <option value="">Select...</option>
              {residents
                .filter((r) => r.userId) // Only show residents that are linked to users
                .map((r, index) => (
                  <option key={index} value={r.userId}>
                    {`${r.name} ${r.surname} (${r.email})`}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            >
              <option value="">Select...</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Structural">Structural</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="border border-gray-300 px-3 py-2 rounded-md"
            >
              <option value="">Select...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex flex-col col-span-2">
            <label className="font-medium">Upload Images (Optional)</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md mt-2"
            />
          </div>

          {formData.existingImages.length > 0 && (
            <div className="col-span-2">
              <label className="font-medium block mb-2">Existing Images</label>
              <div className="flex flex-wrap gap-4">
                {formData.existingImages.map((img, i) => (
                  <div key={i} className="relative w-[100px] h-[100px]">
                    <img
                      src={`${URL}/maintenance-request-images/${img}`}
                      alt=""
                      className="rounded-md object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading
                ? existingRequest
                  ? "Updating..."
                  : "Creating..."
                : existingRequest
                ? "Update Request"
                : "Create Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceModal;
