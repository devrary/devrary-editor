import Image from "next/image";
import ImageBroken from "@/public/image/image-broken.svg";

function BrokenImage(): JSX.Element {
  return (
    <Image
      src={ImageBroken}
      alt="Broken Image"
      style={{
        height: 200,
        opacity: 0.2,
        width: 200,
      }}
      draggable="false"
    />
  );
}

export default BrokenImage;
