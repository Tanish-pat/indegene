import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const registerRouting: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-4 flex flex-col space-y-4">
        <Button
          variant="link"
          onClick={() => router.push("/login")}
          className="bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
        >
          Already have an account? Login
        </Button>
        <Button
          variant="link"
          onClick={() => router.push("/")}
          className="bg-black text-white hover:bg-gray-800 transition duration-200 transform hover:scale-105 px-4 py-2 rounded"
        >
          Need to explore more? Go back to Home
        </Button>
      </div>
    </>
  );
};
export default registerRouting;