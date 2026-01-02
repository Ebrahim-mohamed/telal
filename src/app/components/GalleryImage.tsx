export function GalleryImage({ imageName }: { imageName: Buffer }) {
  return (
    <img
      src={`data:image/png;base64,${imageName}`}
      className="w-[32%] h-[50rem] rounded-[2.5rem]"
    />
  );
}
