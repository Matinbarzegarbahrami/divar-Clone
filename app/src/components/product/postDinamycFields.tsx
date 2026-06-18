import { State } from "../../types/postTypes";

export default function PostDynamicFields({ post }: { post: State }) {
  switch (post.category) {
    case "mobile":
      return (
        <>
          <p className=" border-b-zinc-400/10 border-b pb-2">حافظه رم: {post.ram ?? "نامشخص"} گیگ</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">فضای ذخیره‌سازی: {post.storage ?? "نامشخص"} گیگ</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">سلامت باتری: {post.batteryHealth ?? "نامشخص"}%</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">رنگ: {post.color ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">گارانتی: {post.warranty ? "دارد" : "ندارد"}</p>
        </>
      );

    case "vehicle":
      return (
        <>
          <p className=" border-b-zinc-400/10 border-b pb-2">برند: {post.brand ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">مدل: {post.model ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">سال ساخت: {post.vehicleYear ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">کارکرد: {post.mileage ?? "نامشخص"} کیلومتر</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">جعبه دنده: {post.gearbox === "manual" ? "دستی" : "اتومات"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">نوع سوخت: {post.fuelType ?? "نامشخص"}</p>
        </>
      );

    case "real-estate":
      return (
        <>
          <p className=" border-b-zinc-400/10 border-b pb-2">متراژ: {post.area ?? "نامشخص"} متر</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">طبقه: {post.floor ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">تعداد کل طبقات: {post.totalFloors ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">سال ساخت: {post.yearBuilt ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">آسانسور: {post.hasElevator ? "دارد" : "ندارد"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">پارکینگ: {post.hasParking ? "دارد" : "ندارد"}</p>
          <p className=" border-b-zinc-400/10 border-b pb-2">انباری: {post.hasWarehouse ? "دارد" : "ندارد"}</p>
        </>
      );

    default:
      return null;
  }
}