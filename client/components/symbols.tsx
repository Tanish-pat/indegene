import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebookF, FaYahoo } from "react-icons/fa"; // Importing social media icons

const GFYSymbols: React.FC = () => {
  return (
    <>
      <div className="flex justify-around mt-4">
        <Button variant="outline" className="flex items-center">
          <FaGoogle className="mr-2" /> Google
        </Button>
        <Button variant="outline" className="flex items-center">
          <FaFacebookF className="mr-2" /> Facebook
        </Button>
        <Button variant="outline" className="flex items-center">
          <FaYahoo className="mr-2" /> Yahoo
        </Button>
      </div>
    </>
  );
};
export default GFYSymbols;