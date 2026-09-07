import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(["authUser"]);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-[#f4f2ee] text-[rgba(0,0,0,0.9)] font-linkedin flex flex-col">
      {!isAuthPage && <Navbar />}

      <main
        className={
          isAuthPage
            ? "flex-1 flex flex-col"
            : "max-w-[1128px] w-full mx-auto px-2 sm:px-4 py-2 sm:py-4 pb-20 sm:pb-4 flex-1"
        }
      >
        {children}
      </main>

      {!isAuthPage && authUser && <BottomNav />}
    </div>
  );
};

export default Layout;
