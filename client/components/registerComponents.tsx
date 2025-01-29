// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// const RegisterLeftComponent: React.FC = () => {
//   return (
//     <>
//       <div className="flex-1 bg-gray-200 p-6">
//         <h2 className="text-3xl font-bold">Join Tradewies!</h2>
//         <p className="mt-4 text-lg">
//           Become a part of our community and unlock the potential of AI-powered
//           trade solutions. Register now to start your journey with us!
//         </p>
//       </div>
//     </>
//   );
// };

// const RegisterRouting: React.FC = () => {
//   const router = useRouter();
//   return (
//     <>
//       <div className="mt-4 flex flex-col space-y-4">
//         <Button
//           variant="link"
//           onClick={() => router.push("/login")}
//           className="bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
//         >
//           Already have an account? Login
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
// export { RegisterLeftComponent, RegisterRouting };


import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const RegisterLeftComponent: React.FC = () => {
  return (
    <div className="flex-1 bg-primary text-primary-foreground p-6">
      <h2 className="text-3xl font-bold">Welcome to AI Document Hub!</h2>
      <p className="mt-4 text-lg">
        Join us to unlock the full potential of AI-powered document management.
        Register now to simplify and optimize your workflows with cutting-edge
        tools.
      </p>
    </div>
  );
};

const RegisterRouting: React.FC = () => {
  const router = useRouter();
  return (
    <div className="mt-4 flex flex-col space-y-4">
      <Button
        variant="link"
        onClick={() => router.push("/login")}
        className="text-primary hover:underline"
      >
        Already have an account? Login here.
      </Button>
      <Button
        variant="link"
        onClick={() => router.push("/")}
        className="text-primary hover:underline"
      >
        Need more information? Go to Home.
      </Button>
    </div>
  );
};

export {RegisterLeftComponent, RegisterRouting};