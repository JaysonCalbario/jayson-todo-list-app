
import "./globals.css";
// import TestChannelListener from "../components/TestChannelListener"; 
import TodoList from "@/components/TodoList";
import ToastProvider from '@/components/ToastProvider';



export default function RootLayout({
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {/* <TestChannelListener />  */}
        <ToastProvider>
      <TodoList />
      </ToastProvider>

      </body>
    </html>
  );
}
