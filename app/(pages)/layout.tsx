import "./globals.css";
import Header from "@/app/src/components/Header/Header";

export const metadata = {
    title:"دیوار | کلون دیوار",
    description:"آگهی های رایگان دیوار کلون",
    icons: {
    icon: "/images/divar.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html
      lang="fa"
      dir="rtl"
      className={`h-full antialiased`}
      data-yd-content-ready="true"
    >
      
      <body className="min-h-full flex flex-col">
        <Header/>
        <div>{children}</div>
        
        </body>
    </html>
  );
}
