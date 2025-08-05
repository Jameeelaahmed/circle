export default function ImageCard({ imgSrc }) {
  return (
    <div>
      <img src={imgSrc} className="rounded-md max-w-[20rem]"/>
    </div>
  );
}
