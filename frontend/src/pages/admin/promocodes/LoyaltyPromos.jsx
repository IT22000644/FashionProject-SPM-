import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPromoCode } from "@/redux/loyaltySlice/promoSlice";
import { promoFormControls } from "@/config/promoFormConfig";
import { useToast } from "@/hooks/use-toast";
 
const PromoCodes = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    tier: "",
    startDate: "",
    expiresAt: "",
    discountPercentage: "",
    discountAmount: "",
  });
  const [error, setError] = useState("");
  const [discountError, setDiscountError] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
 
    // Reset discount error on change
    setDiscountError("");
 
    // Handle disabling of fields
    if (name === "discountPercentage" && value) {
      setFormData((prev) => ({
        ...prev,
        discountPercentage: value,
        discountAmount: "",
      }));
    } else if (name === "discountAmount" && value) {
      setFormData((prev) => ({
        ...prev,
        discountAmount: value,
        discountPercentage: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Check that at least one discount field is filled
    if (!formData.discountPercentage && !formData.discountAmount) {
      setDiscountError(
        "Please provide either a discount percentage or amount."
      );
      return;
    }
 
    const expiresAt = formData.expiresAt ? new Date(formData.expiresAt) : null;
    const discountPercentageValue = formData.discountPercentage
      ? parseFloat(formData.discountPercentage)
      : null;
    const discountAmountValue = formData.discountAmount
      ? parseFloat(formData.discountAmount)
      : null;
 
    const promoData = {
      ...formData,
      expiresAt,
      discountPercentage: discountPercentageValue,
      discountAmount: discountAmountValue,
    };
 
    try {
      await dispatch(createPromoCode(promoData)).unwrap();
      toast({
        title: "Success!",
        description: "Promo code created successfully!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error creating promo code:", error);
      toast({
        title: "Error",
        description: "Error creating promo code. Please try again.",
        variant: "error",
      });
    }
  };
 
  const handleViewPromoCodes = () => {
    navigate("/admin/view-promos");
  };
 
  const handleClick = (name) => {
    if (name === "discountAmount" && formData.discountPercentage) {
      setDiscountError(
        "You cannot input a discount amount since percentage is already provided."
      );
    } else if (name === "discountPercentage" && formData.discountAmount) {
      setDiscountError(
        "You cannot input a discount percentage since amount is already provided."
      );
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 border-2 border-black">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Create Promo Codes</h1>
          <button
            type="button"
            onClick={handleViewPromoCodes}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View All Promo Codes
          </button>
        </div>
 
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          {promoFormControls.map((control) => (
            <div className="mb-4" key={control.name}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {control.label}
              </label>
              {control.componentType === "input" && (
                <input
                  type={control.type}
                  name={control.name}
                  value={formData[control.name]}
                  onChange={handleChange}
                  onClick={() => handleClick(control.name)} // Trigger error on click
                  placeholder={control.placeholder}
                  step={control.step}
                  className="w-full px-3 py-2 border rounded"
                  required={control.required}
                  readOnly={
                    // Make the field read-only if the other field is filled
                    (control.name === "discountAmount" &&
                      formData.discountPercentage) ||
                    (control.name === "discountPercentage" &&
                      formData.discountAmount)
                  }
                />
              )}
              {control.componentType === "select" && (
                <select
                  name={control.name}
                  value={formData[control.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required={control.required}
                >
                  {control.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
 
          {/* Display error message when user tries to input in read-only fields */}
          {discountError && (
            <p className="text-red-500 text-sm mb-4">{discountError}</p>
          )}
 
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
          >
            Create Promo Code
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default PromoCodes;