// "use client";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { LoginForm } from "../types/interfaces";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// // import { LoginPageBackgroundLink } from "../paths/paths";

// import GFYSymbols from "../../components/symbols";
// import {
//   LoginRouting,
//   LoginLeftComponent,
// } from "../../components/loginComponents";

// const Login: React.FC = () => {
//   const { register, handleSubmit, reset } = useForm<LoginForm>();
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [isMounted, setIsMounted] = useState(false); // Track component mount state

//   useEffect(() => {
//     setIsMounted(true); // Set to true after the component mounts
//   }, []);

//   const onSubmit = async (data: LoginForm) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/login",
//         data,
//         { withCredentials: true }
//       );
//       localStorage.setItem("user", JSON.stringify(response.data));
//       setErrorMessage(null);
//       switch (response.data.role) {
//         case "user":
//           router.push("/userDashboard");
//           break;
//         case "admin":
//           router.push("/adminDashboard");
//           break;
//         case "clerk":
//           router.push("/clerkDashboard");
//           break;
//         default:
//           setErrorMessage("Unknown user role.");
//           break;
//       }
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//       reset(); // Clear the form on error
//       console.error("Login error:", error);
//     }
//   };
//   // Render the component only after mounting to avoid hydration errors
//   if (!isMounted) {
//     return null; // Prevent rendering until the component has mounted
//   }
//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-gray-100"
//       //   style={{
//       //     backgroundImage: LoginPageBackgroundLink,
//       //     backgroundSize: "cover",
//       //     backgroundRepeat: "no-repeat",
//       //     backgroundPosition: "center",
//       //   }}
//     >
//       <Card className="w-full max-w-4xl flex">
//         {/* Left Side Content */}
//         <LoginLeftComponent />

//         {/* Right Side Login Form */}
//         <div className="flex-1 p-6">
//           <Card>
//             <CardHeader className="text-center">
//               <h2 className="text-2xl font-bold">Login</h2>
//               <Separator className="my-4" />
//             </CardHeader>
//             <CardContent>
//               {errorMessage && (
//                 <div className="mb-4 text-red-600">{errorMessage}</div>
//               )}
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <Input
//                   {...register("username")}
//                   placeholder="Username"
//                   className="w-full"
//                   required
//                 />
//                 <Input
//                   type="password"
//                   {...register("password")}
//                   placeholder="Password"
//                   className="w-full"
//                   required
//                 />
//                 <Button
//                   type="submit"
//                   className="w-full bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
//                 >
//                   Login
//                 </Button>
//               </form>
//               <GFYSymbols />
//               <LoginRouting />
//             </CardContent>
//           </Card>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;

"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginForm } from "../types/interfaces";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GFYSymbols from "../../components/symbols";
import {
    LoginLeftComponent,
    LoginRouting,
} from "../../components/loginComponents";

const Login: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<LoginForm>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        data,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      setErrorMessage(null);

      switch (response.data.role) {
        case "user":
          router.push("/userDashboard");
          break;
        case "admin":
          router.push("/adminDashboard");
          break;
        case "clerk":
          router.push("/clerkDashboard");
          break;
        default:
          setErrorMessage("Unknown user role.");
          break;
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      reset();
      console.error("Login error:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden">
        <LoginLeftComponent />
        <div className="flex-1 p-6 bg-card text-card-foreground">
          <Card>
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold">Login to AI Document Hub</h2>
              <Separator className="my-4" />
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="mb-4 text-red-600">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  {...register("username")}
                  placeholder="Username"
                  className="w-full"
                  required
                />
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-dark transition-transform hover:scale-105 px-4 py-2 rounded"
                >
                  Login
                </Button>
              </form>
              <GFYSymbols />
              <LoginRouting />
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Login;
