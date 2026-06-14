export type FieldType = "text" | "number" | "select" | "radio";

export type CategoryField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
};

export const CATEGORY_FIELDS: Record<string, CategoryField[]> = {
  "real-estate": [
    {
      name: "area",
      label: "متراژ (متر مربع)",
      type: "number",
      placeholder: "مثلاً ۱۲۰",
      required: true,
    },
    {
      name: "floor",
      label: "طبقه",
      type: "number",
      placeholder: "مثلاً ۳",
    },
    {
      name: "rooms",
      label: "تعداد اتاق",
      type: "select",
      options: [
        { label: "بدون اتاق", value: "0" },
        { label: "یک اتاق", value: "1" },
        { label: "دو اتاق", value: "2" },
        { label: "سه اتاق", value: "3" },
        { label: "چهار اتاق و بیشتر", value: "4+" },
      ],
      required: true,
    },
    {
      name: "propertyType",
      label: "نوع ملک",
      type: "radio",
      options: [
        { label: "آپارتمان", value: "apartment" },
        { label: "خانه / ویلا", value: "villa" },
        { label: "زمین", value: "land" },
      ],
      required: true,
    },
    {
      name: "dealType",
      label: "نوع معامله",
      type: "radio",
      options: [
        { label: "فروش", value: "sale" },
        { label: "رهن و اجاره", value: "rent" },
        { label: "رهن کامل", value: "mortgage" },
      ],
      required: true,
    },
  ],

  mobile: [
    {
      name: "brand",
      label: "برند",
      type: "select",
      options: [
        { label: "اپل", value: "apple" },
        { label: "سامسونگ", value: "samsung" },
        { label: "شیائومی", value: "xiaomi" },
        { label: "سایر", value: "other" },
      ],
      required: true,
    },
    {
      name: "storage",
      label: "حافظه داخلی",
      type: "select",
      options: [
        { label: "۶۴ گیگ", value: "64" },
        { label: "۱۲۸ گیگ", value: "128" },
        { label: "۲۵۶ گیگ", value: "256" },
        { label: "۵۱۲ گیگ", value: "512" },
      ],
    },
    {
      name: "condition",
      label: "وضعیت دستگاه",
      type: "radio",
      options: [
        { label: "نو", value: "new" },
        { label: "در حد نو", value: "like-new" },
        { label: "کارکرده", value: "used" },
      ],
      required: true,
    },
  ],

  vehicle: [
    {
      name: "brand",
      label: "برند",
      type: "text",
      placeholder: "مثلاً پژو، کیا، هوندا",
      required: true,
    },
    {
      name: "year",
      label: "سال تولید",
      type: "number",
      placeholder: "مثلاً ۱۴۰۲",
      required: true,
    },
    {
      name: "mileage",
      label: "کارکرد (کیلومتر)",
      type: "number",
      placeholder: "مثلاً ۳۵۰۰۰",
    },
    {
      name: "color",
      label: "رنگ",
      type: "text",
      placeholder: "مثلاً سفید",
    },
    {
      name: "gearbox",
      label: "گیربکس",
      type: "radio",
      options: [
        { label: "دستی", value: "manual" },
        { label: "اتوماتیک", value: "automatic" },
      ],
    },
  ],
};