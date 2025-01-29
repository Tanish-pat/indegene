// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "./userSidebar";
// import { User } from "../types/interfaces";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// const Dashboard: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       router.push("/login");
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     router.push("/");
//   };

//   const handleChatBox = () => {
//     router.push("/chatBox");
//   };

//   const handleHome = () => {
//     router.push("/");
//   };

//   const handleProfile = () => {
//     router.push("/profile");
//   };

//   const handleSettings = () => {
//     router.push("/settings");
//   };

//   const handleHelp = () => {
//     router.push("/help");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar
//         onLogout={handleLogout}
//         onProfile={handleProfile}
//         onChatBox={handleChatBox}
//         onHome={handleHome}
//         onSettings={handleSettings}
//         onHelp={handleHelp}
//       />
//       {/* Dashboard Content */}
//       <main className="flex-1 p-6">
//         {user ? (
//           <Card className="p-6 bg-white shadow-md">
//             <h1 className="text-3xl font-bold mb-4">
//               Welcome to Your Dashboard, {user.username}!
//             </h1>
//             <img
//               src={user.profilePhoto}
//               alt="Profile"
//               className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4"
//             />
//             <Separator className="my-4" />
//             <p className="text-lg">
//               Explore the options in the sidebar to manage your profile,
//               settings, and more.
//             </p>
//           </Card>
//         ) : (
//           <p className="text-lg">Loading user details...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./userSidebar";
import { User } from "../types/interfaces";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleChatBox = () => router.push("/chatBox");
  const handleProfile = () => router.push("/profile");
  const handleSettings = () => router.push("/settings");
  const handleHelp = () => router.push("/help");
  const handleManageDocuments = () => router.push("/manageDocuments");

  return (
    <div className="flex min-h-screen bg-background text-card-foreground">
      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        onProfile={handleProfile}
        onChatBox={handleChatBox}
        onManageDocuments={handleManageDocuments}
        onSettings={handleSettings}
        onHelp={handleHelp}
      />
      {/* Dashboard Content */}
      <main className="flex-1 p-6">
        {user ? (
          <Card className="p-6 bg-card shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">
              Welcome to Your Dashboard, {user.username}!
            </h1>
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-primary mb-6"
            />
            <Separator className="my-4" />
            <p className="text-lg">
              Use the navigation panel on the left to manage your profile,
              explore features, and access AI-powered tools.
            </p>
          </Card>
        ) : (
          <p className="text-lg">Loading user details...</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
