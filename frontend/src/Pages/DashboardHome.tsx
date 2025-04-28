import { FC, useEffect, useState } from "react";
import UserBalance from "../components/UserBalance";
import DashboardHeader from "./DashboardHeader";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

interface DashboardHomeProps {}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

const DashboardHome: FC<DashboardHomeProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get("/user");
      const user = res.data.user;
      setUser(user);
    };

    getUser();
  }, []);

  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const res = await axiosInstance.post("/user/logout");

    if (res.status === 200) {
      toast({
        description: "Logged out successfully",
      });
      logout();
    } else {
      toast({
        description: "Error logging out",
      });
    }
  };

  return (
    <div>
      <DashboardHeader user={user} handlefn={handleLogout} />
      <Separator className="bg-slate-100/30 my-4" />
      <UserBalance />

      {/* Updated Soon To Be Section */}
      <motion.div
        className="soon-to-be mt-12 p-6 bg-[#1d2730] rounded-lg w-full md:w-2/3 mx-auto border border-[#2b3c4b] shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">⚠️ Under Construction ⚠️</h2>
        <p className="text-center text-gray-300 mb-4">
          Here's what's coming soon to your Dashboard!!!:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>Real-time transaction notifications</li>
          <li>Improved user activity insights</li>
          <li>Advanced budgeting tools</li>
          <li>Personalized financial advice</li>
          <li>Personalized Usernames instead of encrypted ID's</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
