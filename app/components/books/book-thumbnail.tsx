import Image from "next/image";
type Props = {
  src: string;
};
function BookThumbnail({ src }: Props) {
  return (
    <div
      style={{
        position: "relative",
        minWidth: "60px",
        maxWidth: "100px",
        height: "100px",
        maxHeight: "200px",
      }}
    >
      <Image src={src} alt="" layout="fill" objectFit="contain" />
    </div>
  );
}

export default BookThumbnail;
