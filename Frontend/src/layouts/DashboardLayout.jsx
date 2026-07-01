import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import BottomNav from "../components/layout/BottomNav";

export default function DashboardLayout() {
  return (
    <div className="h-screen overflow-hidden bg-background md:pl-60">
      <Sidebar />
      <div className="h-full overflow-y-auto pb-24 md:pb-0">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
