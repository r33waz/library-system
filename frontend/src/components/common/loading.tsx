import Lottie from "lottie-react";
import LottieLoading from "../../Animation - 1743655124229.json";

const Loading = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        className="animate-spin dark:text-white text-gray-3"
      >
        <rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1">
          <animate
            id="svgSpinnersBlocksShuffle30"
            fill="freeze"
            attributeName="x"
            begin="0;svgSpinnersBlocksShuffle3b.end"
            dur="0.2s"
            values="1;13"
          />
          <animate
            id="svgSpinnersBlocksShuffle31"
            fill="freeze"
            attributeName="y"
            begin="svgSpinnersBlocksShuffle38.end"
            dur="0.2s"
            values="1;13"
          />
          <animate
            id="svgSpinnersBlocksShuffle32"
            fill="freeze"
            attributeName="x"
            begin="svgSpinnersBlocksShuffle39.end"
            dur="0.2s"
            values="13;1"
          />
          <animate
            id="svgSpinnersBlocksShuffle33"
            fill="freeze"
            attributeName="y"
            begin="svgSpinnersBlocksShuffle3a.end"
            dur="0.2s"
            values="13;1"
          />
        </rect>
        <rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1">
          <animate
            id="svgSpinnersBlocksShuffle34"
            fill="freeze"
            attributeName="y"
            begin="svgSpinnersBlocksShuffle30.end"
            dur="0.2s"
            values="13;1"
          />
          <animate
            id="svgSpinnersBlocksShuffle35"
            fill="freeze"
            attributeName="x"
            begin="svgSpinnersBlocksShuffle31.end"
            dur="0.2s"
            values="1;13"
          />
          <animate
            id="svgSpinnersBlocksShuffle36"
            fill="freeze"
            attributeName="y"
            begin="svgSpinnersBlocksShuffle32.end"
            dur="0.2s"
            values="1;13"
          />
          <animate
            id="svgSpinnersBlocksShuffle37"
            fill="freeze"
            attributeName="x"
            begin="svgSpinnersBlocksShuffle33.end"
            dur="0.2s"
            values="13;1"
          />
        </rect>
        <rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1">
          <animate
            id="svgSpinnersBlocksShuffle38"
            fill="freeze"
            attributeName="x"
            begin="svgSpinnersBlocksShuffle34.end"
            dur="0.2s"
            values="13;1"
          />
          <animate
            id="svgSpinnersBlocksShuffle39"
            fill="freeze"
            attributeName="y"
            begin="svgSpinnersBlocksShuffle35.end"
            dur="0.2s"
            values="13;1"
          />
          <animate
            id="svgSpinnersBlocksShuffle3a"
            fill="freeze"
            attributeName="x"
            begin="svgSpinnersBlocksShuffle36.end"
            dur="0.2s"
            values="1;13"
          />
          <animate
            id="svgSpinnersBlocksShuffle3b"
            fill="freeze"
            attributeName="y"
            begin="svgSpinnersBlocksShuffle37.end"
            dur="0.2s"
            values="1;13"
          />
        </rect>
      </svg>
    </div>
  );
};

const PageLoading = () => {
  return (
    <div className="flex justify-center w-full  items-center h-[100dvh]">
      <div className="h-80 w-80">
        <Lottie animationData={LottieLoading} />
      </div>
    </div>
  );
};

const ButtonLoading = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <circle cx="18" cy="12" r="0" fill="currentColor">
        <animate
          attributeName="r"
          begin=".67"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle cx="12" cy="12" r="0" fill="currentColor">
        <animate
          attributeName="r"
          begin=".33"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
      <circle cx="6" cy="12" r="0" fill="currentColor">
        <animate
          attributeName="r"
          begin="0"
          calcMode="spline"
          dur="1.5s"
          keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
          repeatCount="indefinite"
          values="0;2;0;0"
        />
      </circle>
    </svg>
  );
};
export { ButtonLoading, Loading, PageLoading };

