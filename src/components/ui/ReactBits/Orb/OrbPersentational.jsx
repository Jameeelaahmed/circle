function OrbPersentational({ ctnDom, imageUrl }) {
    return (
        <div ref={ctnDom} className="w-full h-full relative">
            {imageUrl && (
                <div
                    className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                    style={{
                        clipPath: 'circle(35% at 50% 50%)',
                        zIndex: 1
                    }}
                >
                    <img
                        src={imageUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        style={{
                            opacity: 0.4,
                            mixBlendMode: 'multiply'
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default OrbPersentational
