import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center className="flex justify-center items-center flex-col">
      <span className="canvas-loader"></span>
      <p className="mt-10 text-sm text-[#F1F1F1] font-extrabold">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
