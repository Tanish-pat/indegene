// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const LoginLeftComponent: React.FC = () => {
//   return (
//     <>
//       <div className="flex-1 bg-gray-200 p-6">
//         <h2 className="text-3xl font-bold">Welcome to Tradewies!</h2>
//         <p className="mt-4 text-lg">
//           Join us to revolutionize your trade processes with AI-powered insights
//           and comprehensive solutions. Sign in to access your dashboard and
//           start leveraging the tools we offer.
//         </p>
//       </div>
//     </>
//   );
// };

// const LoginRouting: React.FC = () => {
//   const router = useRouter();
//   return (
//     <>
//       <div className="mt-4 flex flex-col space-y-4">
//         <Button
//           variant="link"
//           onClick={() => router.push("/register")}
//           className="bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
//         >
//           Don't have an account? Register
//         </Button>
//         <Button
//           variant="link"
//           onClick={() => router.push("/")}
//           className="bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
//         >
//           Need to explore more? Go back to Home
//         </Button>
//       </div>
//     </>
//   );
// };
// export {LoginLeftComponent, LoginRouting};


import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginLeftComponent: React.FC = () => {
  return (
    <div className="flex-1 bg-primary text-primary-foreground p-6">
      <h2 className="text-3xl font-bold">Welcome Back!</h2>
      <p className="mt-4 text-lg">
        Access your centralized document hub powered by AI insights. Log in to
        streamline your workflow and maximize efficiency.
      </p>
    </div>
  );
};

const LoginRouting: React.FC = () => {
  const router = useRouter();
  return (
    <div className="mt-4 flex flex-col space-y-4">
      <Button
        variant="link"
        onClick={() => router.push("/register")}
        className="text-primary hover:underline"
      >
        Don't have an account? Register here.
      </Button>
      <Button
        variant="link"
        onClick={() => router.push("/")}
        className="text-primary hover:underline"
      >
        Need more details? Return to Home.
      </Button>
    </div>
  );
};

export { LoginLeftComponent, LoginRouting };