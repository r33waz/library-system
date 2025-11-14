import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSecThird = () => {

  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="border  md:p-10 p-4 bg-gradient-to-tl from-gray-50 to-secondary-secondary place-content-center">
        <div className="flex flex-col gap-4 w-full ">
          <div className="flex gap-2 items-center ">
            <span className="border-2 rounded border-secondary-primary w-10 h-0"></span>
            <span className="text-secondary-primary text-base font-semibold">
              ebook
            </span>
          </div>
          <h1 className="md:text-4xl text-base font-semibold">
            Access, Read & Engage with <br></br> Digital Content (eBook){" "}
          </h1>
          <p className="text-sm font-light text-justify whitespace-normal">
            library platform. Explore a diverse collection across all
            genres—from bestsellers to hidden gems—anytime, anywhere. Read at
            your own pace with no late fees, no stress—just uninterrupted access
            to great stories and knowledge.
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            aria-label="Login"
            onClick={() => {
              navigate("/auth/login");
            }}
            className="bg-secondary-secondary hover:bg-secondary-primary text-white w-40 h-16 md:mt-16 mt-8 rounded-none text-lg font-semibold"
          >
            Login
          </Button>
        </div>
      </div>
      <img
      loading="lazy"
        src="/public/images/mainpageImg.png"
        alt=""
        className="w-full h-[500px]"
      />
    </div>
  );
};

export default HeroSecThird;
