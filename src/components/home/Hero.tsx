export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80"
        alt="Medical professionals"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />

      {/* Bottom-left text */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
          Better Care<br />Trust Always
        </h1>
      </div>
    </div>
  );
}
