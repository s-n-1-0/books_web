import Image from "next/image";
type Props = {
  src: string;
};
function BookThumbnail({ src }: Props) {
  return (
    <div
      style={{
        position: "relative",
        minWidth: "30px",
        maxWidth: "50px",
        height: "50px",
        maxHeight: "100px",
      }}
    >
      <Image src={src} alt="" layout="fill" objectFit="contain" />
    </div>
  );
}

export default BookThumbnail;
