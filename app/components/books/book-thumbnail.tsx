type Props = {
  src: string;
};
function BookThumbnail({ src }: Props) {
  return (
    <img
      src={src}
      alt=""
      style={{
        position: "relative",
        minWidth: "60px",
        maxWidth: "100px",
        height: "100px",
        maxHeight: "200px",
      }}
      className="object-contain"
    />
  );
}

export default BookThumbnail;
