// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { UserSidebarProps } from "../types/interfaces";

// const Sidebar: React.FC<UserSidebarProps> = ({
//   onLogout,
//   onProfile,
//   onChatBox,
//   onHome,
//   onSettings,
//   onHelp,
// }) => {
//   return (
//     <Card className="w-64 p-4 bg-gray-100">
//       <h2 className="text-xl font-bold mb-4">Navigation</h2>
//       <Separator className="my-4" />
//       <nav className="space-y-2">
//         <Button
//           variant="ghost"
//           className="w-full justify-start transform transition-transform duration-200 hover:scale-105 active:scale-95"
//           onClick={onChatBox}
//         >
//           ChatBox
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start transform transition-transform duration-200 hover:scale-105 active:scale-95"
//           onClick={onHome}
//         >
//           Home
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start transform transition-transform duration-200 hover:scale-105 active:scale-95"
//           onClick={onProfile}
//         >
//           Profile
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start transform transition-transform duration-200 hover:scale-105 active:scale-95"
//           onClick={onSettings}
//         >
//           Settings
//         </Button>
//         <Button
//           variant="ghost"
//           className="w-full justify-start transform transition-transform duration-200 hover:scale-105 active:scale-95"
//           onClick={onHelp}
//         >
//           Help
//         </Button>
//         <Separator className="my-4" />
//         <Button
//           variant="destructive"
//           className="w-full justify-start transform transition-transform duration-200 hover:scale-105 active:scale-95"
//           onClick={onLogout}
//         >
//           Logout
//         </Button>
//       </nav>
//     </Card>
//   );
// };

// export default Sidebar;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserSidebarProps } from "../types/interfaces";

const Sidebar: React.FC<UserSidebarProps> = ({
  onLogout,
  onProfile,
  onChatBox,
  onManageDocuments,
  onSettings,
  onHelp,
}) => {
  return (
    <Card className="w-64 p-4 bg-secondary text-secondary-foreground shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <Separator className="my-4" />
      <nav className="space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary-dark transition-all"
          onClick={onChatBox}
        >
          ChatBox
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary-dark transition-all"
          onClick={onManageDocuments}
        >
          Manage Documents
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary-dark transition-all"
          onClick={onProfile}
        >
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary-dark transition-all"
          onClick={onSettings}
        >
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-secondary-dark transition-all"
          onClick={onHelp}
        >
          Help
        </Button>
        <Separator className="my-4" />
        <Button
          variant="destructive"
          className="w-full justify-start hover:bg-red-600 transition-all"
          onClick={onLogout}
        >
          Logout
        </Button>
      </nav>
    </Card>
  );
};

export default Sidebar;
