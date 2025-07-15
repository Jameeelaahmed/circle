function OrbPersentational({ ctnDom, imageUrl }) {
  return (
    <div ref={ctnDom} className="relative h-full w-full">
      {imageUrl && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
          style={{
            clipPath: "circle(35% at 50% 50%)",
            zIndex: 1,
          }}
        >
          <img
            src={imageUrl}
            alt="Avatar"
            className="h-full w-full object-cover"
            style={{
              opacity: 0.4,
              mixBlendMode: "multiply",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default OrbPersentational;
