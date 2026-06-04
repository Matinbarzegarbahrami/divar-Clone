import { USERDASHBOARD } from "@/statics/userdashboard";
import { LucideIcon } from "lucide-react";

type DashItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dashboardItems = USERDASHBOARD
  return (
    <>
      <div>
        {dashboardItems.map((item) => {
          return (
            <div key={item.url}>
              {item.icon}
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>

      <div>{children}</div>
    </>
  );
}