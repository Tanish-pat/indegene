// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";

// const Home: React.FC = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <div className="bg-background min-h-screen">
//       {/* Header Section */}
//       <div className="bg-primary text-primary-foreground text-center py-16 rounded-b-xl shadow-lg">
//         <h1 className="text-5xl font-extrabold">AI Document Hub</h1>
//         <p className="mt-4 text-xl font-medium">
//           Centralized storage, powerful search, and AI-driven answers at your fingertips.
//         </p>
//         <div className="mt-6 flex justify-center gap-6">
//           <Link href="/register">
//             <Button className="bg-secondary text-secondary-foreground px-6 py-3">
//               Register
//             </Button>
//           </Link>
//           <Link href="/login">
//             <Button variant="outline" className="border-secondary text-secondary px-6 py-3">
//               Login
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-12">
//         <h2 className="text-center text-3xl font-bold">Why Choose AI Document Hub?</h2>
//         <Separator className="mx-auto w-24 my-6" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
//           {[
//             {
//               title: "Centralized Storage",
//               description: "Keep all your documents in one secure place.",
//               badge: "Storage",
//             },
//             {
//               title: "AI-Powered Search",
//               description: "Find what you need with intelligent search.",
//               badge: "AI Search",
//             },
//             {
//               title: "Scalable Solutions",
//               description: "Designed to grow with your data.",
//               badge: "Scalability",
//             },
//             {
//               title: "Timely Indexing",
//               description: "New uploads indexed instantly for real-time use.",
//               badge: "Efficiency",
//             },
//           ].map((feature, index) => (
//             <Card
//               key={index}
//               className="bg-card text-card-foreground transition-transform hover:scale-105 shadow-md"
//             >
//               <CardHeader className="flex justify-between items-center">
//                 <span className="text-xl font-bold">{feature.title}</span>
//                 <Badge>{feature.badge}</Badge>
//               </CardHeader>
//               <CardContent>
//                 <p>{feature.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="py-12 bg-muted">
//         <h2 className="text-center text-3xl font-bold">How It Works</h2>
//         <Separator className="mx-auto w-24 my-6" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
//           {[
//             {
//               step: "1",
//               title: "Create an Account",
//               description: "Sign up to gain access to centralized storage and insights.",
//             },
//             {
//               step: "2",
//               title: "Upload Documents",
//               description: "Easily upload and organize your files.",
//             },
//             {
//               step: "3",
//               title: "Search with AI",
//               description: "Leverage AI to find specific answers or documents quickly.",
//             },
//             {
//               step: "4",
//               title: "Scale Seamlessly",
//               description: "Expand your data management as your needs grow.",
//             },
//           ].map((item, index) => (
//             <Card
//               key={index}
//               className="bg-card text-card-foreground transition-transform hover:scale-105 shadow-md"
//             >
//               <CardHeader className="flex justify-center items-center bg-primary text-primary-foreground text-2xl font-bold h-16">
//                 {item.step}
//               </CardHeader>
//               <CardContent>
//                 <h3 className="text-xl font-semibold">{item.title}</h3>
//                 <p>{item.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div className="py-12">
//         <h2 className="text-center text-3xl font-bold">What Our Users Say</h2>
//         <Separator className="mx-auto w-24 my-6" />
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
//           {[
//             {
//               text: "The AI-powered search is a game-changer for our workflow!",
//               author: "Emily, Project Manager",
//             },
//             {
//               text: "Our document management has never been this efficient.",
//               author: "James, Operations Lead",
//             },
//           ].map((testimonial, index) => (
//             <Card
//               key={index}
//               className="bg-card text-card-foreground transition-transform hover:scale-105 shadow-md"
//             >
//               <CardContent>
//                 <p className="italic text-gray-800 mb-4">{`"${testimonial.text}"`}</p>
//                 <p className="text-right font-semibold">{testimonial.author}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-primary text-primary-foreground text-center py-8">
//         <p>&copy; 2025 AI Document Hub. All rights reserved.</p>
//         <div className="mt-4 flex justify-center gap-6">
//           <Link href="/privacy-policy">
//             <span className="hover:underline">Privacy Policy</span>
//           </Link>
//           <Link href="/support">
//             <span className="hover:underline">Support</span>
//           </Link>
//           <Link href="/contact-us">
//             <span className="hover:underline">Contact Us</span>
//           </Link>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Home: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <div className="bg-primary text-primary-foreground text-center py-16 rounded-b-xl shadow-lg">
        <h1 className="text-5xl font-extrabold">AI Document Hub</h1>
        <p className="mt-4 text-xl font-medium">
          Centralized storage, powerful search, and AI-driven answers at your
          fingertips.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <Link href="/register">
            <Button className="bg-secondary text-secondary-foreground px-6 py-3">
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-secondary text-secondary px-6 py-3"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <h2 className="text-center text-3xl font-bold">
          Why Choose AI Document Hub?
        </h2>
        <Separator className="mx-auto w-24 my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            {
              title: "Centralized Storage",
              description: "Keep all your documents in one secure place.",
              badge: "Storage",
            },
            {
              title: "AI-Powered Search",
              description: "Find what you need with intelligent search.",
              badge: "AI Search",
            },
            {
              title: "Scalable Solutions",
              description: "Designed to grow with your data.",
              badge: "Scalability",
            },
            {
              title: "Timely Indexing",
              description: "New uploads indexed instantly for real-time use.",
              badge: "Efficiency",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground transition-transform hover:scale-105 shadow-md"
            >
              <CardHeader className="flex justify-between items-center">
                <span className="text-xl font-bold">{feature.title}</span>
                <Badge>{feature.badge}</Badge>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 bg-muted">
        <h2 className="text-center text-3xl font-bold">How It Works</h2>
        <Separator className="mx-auto w-24 my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            {
              step: "1",
              title: "Create an Account",
              description:
                "Sign up to gain access to centralized storage and insights.",
            },
            {
              step: "2",
              title: "Upload Documents",
              description: "Easily upload and organize your files.",
            },
            {
              step: "3",
              title: "Search with AI",
              description:
                "Leverage AI to find specific answers or documents quickly.",
            },
            {
              step: "4",
              title: "Scale Seamlessly",
              description: "Expand your data management as your needs grow.",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground transition-transform hover:scale-105 shadow-md"
            >
              <CardHeader className="flex justify-center items-center bg-primary text-primary-foreground text-2xl font-bold h-16">
                {item.step}
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12">
        <h2 className="text-center text-3xl font-bold">What Our Users Say</h2>
        <Separator className="mx-auto w-24 my-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {[
            {
              text: "The AI-powered search is a game-changer for our workflow!",
              author: "Emily, Project Manager",
            },
            {
              text: "Our document management has never been this efficient.",
              author: "James, Operations Lead",
            },
          ].map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground transition-transform hover:scale-105 shadow-md"
            >
              <CardContent>
                <p className="italic text-gray-800 mb-4">{`"${testimonial.text}"`}</p>
                <p className="text-right font-semibold">{testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground text-center py-8">
        <p>&copy; 2025 AI Document Hub. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/privacy-policy">
            <span className="hover:underline">Privacy Policy</span>
          </Link>
          <Link href="/support">
            <span className="hover:underline">Support</span>
          </Link>
          <Link href="/contact-us">
            <span className="hover:underline">Contact Us</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
