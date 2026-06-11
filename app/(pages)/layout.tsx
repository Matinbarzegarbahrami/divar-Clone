import "./globals.css";
import Header from "@/app/src/components/Header/Header";



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
    >
      
      <body className="min-h-full flex flex-col">
        <Header/>
        
        {children}
        </body>
    </html>
  );
}
