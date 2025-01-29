// "use client";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { RegistrationForm } from "../types/interfaces";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import GFYSymbols from "../../components/symbols";
// import {
//   RegisterRouting,
//   RegisterLeftComponent,
// } from "../../components/registerComponents";



// const Register: React.FC = () => {
//   const { register, handleSubmit, reset } = useForm<RegistrationForm>();
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [isMounted, setIsMounted] = useState(false); // Track component mount state

//   useEffect(() => {
//     setIsMounted(true); // Set to true after the component mounts
//   }, []);

//   const onSubmit = async (data: RegistrationForm) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/user/register",
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
//       //   style={{ backgroundImage: "url('/path/to/your/pattern.png')" }}
//     >
//       <Card className="w-full max-w-4xl flex">
//         {/* Left Side Content */}
//         <RegisterLeftComponent />

//         {/* Right Side Registration Form */}
//         <div className="flex-1 p-6">
//           <Card>
//             <CardHeader className="text-center">
//               <h2 className="text-2xl font-bold">Register</h2>
//               <Separator className="my-4" />
//             </CardHeader>
//             <CardContent>
//               {errorMessage && (
//                 <div className="mb-4 text-red-600">{errorMessage}</div>
//               )}
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <Input
//                   {...register("fullName")}
//                   placeholder="Full Name"
//                   className="w-full"
//                   required
//                 />
//                 <Input
//                   {...register("username")}
//                   placeholder="Username"
//                   className="w-full"
//                   required
//                 />
//                 <Input
//                   type="email"
//                   {...register("email")}
//                   placeholder="Email"
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
//                 <Input
//                   type="password"
//                   {...register("confirmPassword")}
//                   placeholder="Confirm Password"
//                   className="w-full"
//                   required
//                 />
//                 <select
//                   {...register("gender")}
//                   className="w-full border border-gray-300 rounded p-2"
//                   required
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//                 <select
//                   {...register("role")}
//                   className="w-full border border-gray-300 rounded p-2"
//                   required
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                   <option value="clerk">Clerk</option>
//                 </select>
//                 <Button
//                   type="submit"
//                   className="w-full bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
//                 >
//                   Register
//                 </Button>
//               </form>
//               <GFYSymbols />
//               <RegisterRouting />
//             </CardContent>
//           </Card>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Register;

"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RegistrationForm } from "../types/interfaces";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GFYSymbols from "../../components/symbols";
import {
  RegisterRouting,
  RegisterLeftComponent,
} from "../../components/registerComponents";

const Register: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<RegistrationForm>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: RegistrationForm) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
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
      console.error("Registration error:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-4xl flex shadow-lg rounded-lg overflow-hidden">
        <RegisterLeftComponent />
        <div className="flex-1 p-6 bg-card text-card-foreground">
          <Card>
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold">
                Register for AI Document Hub
              </h2>
              <Separator className="my-4" />
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <div className="mb-4 text-red-600">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  {...register("fullName")}
                  placeholder="Full Name"
                  className="w-full"
                  required
                />
                <Input
                  {...register("username")}
                  placeholder="Username"
                  className="w-full"
                  required
                />
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
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
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  className="w-full"
                  required
                />
                <select
                  {...register("gender")}
                  className="w-full border border-input rounded p-2"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select
                  {...register("role")}
                  className="w-full border border-input rounded p-2"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="clerk">Clerk</option>
                </select>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-dark transition-transform hover:scale-105 px-4 py-2 rounded"
                >
                  Register
                </Button>
              </form>
              <GFYSymbols />
              <RegisterRouting />
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Register;
