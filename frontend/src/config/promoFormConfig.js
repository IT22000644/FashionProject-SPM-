// src/config/promoFormConfig.js

export const promoFormControls = [
  {
    name: "code",
    label: "Code",
    placeholder: "Enter promo code",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter description",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "tier",
    label: "Tier",
    componentType: "select",
    options: [
      { value: "", label: "Select Tier" },
      { value: "Grey", label: "Grey" },
      { value: "Bronze", label: "Bronze" },
      { value: "Silver", label: "Silver" },
      { value: "Gold", label: "Gold" },
      { value: "Platinum", label: "Platinum" },
      { value: "Diamond", label: "Diamond" },
    ],
    required: true,
  },
  {
    name: "discountPercentage",
    label: "Discount Percentage (optional)",
    placeholder: "e.g., 10 for 10%",
    componentType: "input",
    type: "number",
    step: "0.01",
  },
  {
    name: "discountAmount",
    label: "Discount Amount (optional)",
    placeholder: "e.g., 200 for 200 LKR",
    componentType: "input",
    type: "number",
    step: "0.01",
  },
  {
    name: "startDate",
    label: "Start Date",
    componentType: "input",
    type: "date",
    required: true,
  },
  {
    name: "expiresAt",
    label: "End Date",
    componentType: "input",
    type: "date",
    required: true,
  },
];

export const updatePromoFormControls = [
  {
    name: "code",
    label: "Code",
    placeholder: "Enter promo code",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter description",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "tier",
    label: "Tier",
    componentType: "select",
    options: [
      { value: "", label: "Select Tier" },
      { value: "Grey", label: "Grey" },
      { value: "Bronze", label: "Bronze" },
      { value: "Silver", label: "Silver" },
      { value: "Gold", label: "Gold" },
      { value: "Platinum", label: "Platinum" },
      { value: "Diamond", label: "Diamond" },
    ],
    required: true,
  },
  {
    name: "discountPercentage",
    label: "Discount Percentage (optional)",
    placeholder: "e.g., 10 for 10%",
    componentType: "input",
    type: "number",
    step: "0.01",
  },
  {
    name: "discountAmount",
    label: "Discount Amount (optional)",
    placeholder: "e.g., 200 for 200 LKR",
    componentType: "input",
    type: "number",
    step: "0.01",
  },
  {
    name: "expiresAt",
    label: "Expiry Date",
    componentType: "input",
    type: "date",
  },
];
