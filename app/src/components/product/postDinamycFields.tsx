import { State } from "../../types/postTypes";

export default function PostDynamicFields({ post }: { post: State }) {
  switch (post.category) {
    case "mobile":
      return (
        <>
          <p className=" border-b-zinc-400/20 border-b">حافظه رم: {post.ram ?? "نامشخص"} گیگ</p>
          <p className=" border-b-zinc-400/20 border-b">فضای ذخیره‌سازی: {post.storage ?? "نامشخص"} گیگ</p>
          <p className=" border-b-zinc-400/20 border-b">سلامت باتری: {post.batteryHealth ?? "نامشخص"}%</p>
          <p className=" border-b-zinc-400/20 border-b">رنگ: {post.color ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">گارانتی: {post.warranty ? "دارد" : "ندارد"}</p>
        </>
      );

    case "vehicle":
      return (
        <>
          <p className=" border-b-zinc-400/20 border-b">برند: {post.brand ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">مدل: {post.model ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">سال ساخت: {post.vehicleYear ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">کارکرد: {post.mileage ?? "نامشخص"} کیلومتر</p>
          <p className=" border-b-zinc-400/20 border-b">جعبه دنده: {post.gearbox === "manual" ? "دستی" : "اتومات"}</p>
          <p className=" border-b-zinc-400/20 border-b">نوع سوخت: {post.fuelType ?? "نامشخص"}</p>
        </>
      );

    case "real-estate":
      return (
        <>
          <p className=" border-b-zinc-400/20 border-b">متراژ: {post.area ?? "نامشخص"} متر</p>
          <p className=" border-b-zinc-400/20 border-b">طبقه: {post.floor ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">تعداد کل طبقات: {post.totalFloors ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">سال ساخت: {post.yearBuilt ?? "نامشخص"}</p>
          <p className=" border-b-zinc-400/20 border-b">آسانسور: {post.hasElevator ? "دارد" : "ندارد"}</p>
          <p className=" border-b-zinc-400/20 border-b">پارکینگ: {post.hasParking ? "دارد" : "ندارد"}</p>
          <p className=" border-b-zinc-400/20 border-b">انباری: {post.hasWarehouse ? "دارد" : "ندارد"}</p>
        </>
      );

    default:
      return null;
  }
}