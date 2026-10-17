import Jet3D from "./Jet3D";

export default function Home() {
  const clouds = Array.from({ length: 6 }, (_, i) => ({
    top: ((i * 13) % 55) + 5,
    size: 140 + ((i * 47) % 160),
    duration: 6 + (i % 4) * 2,
    delay: -(i * 1.7),
  }));

  const streaks = Array.from({ length: 14 }, (_, i) => ({
    top: (i * 29) % 90,
    width: 80 + ((i * 23) % 120),
    duration: 0.8 + (i % 3) * 0.3,
    delay: -(i * 0.37),
  }));

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-white bg-gradient-to-b from-[#020617] via-[#1e293b] to-[#9a3412]"
    >
      <style>{`
        @keyframes fly-in {
          from { transform: translateX(120vw) scale(0.5); }
          to { transform: translateX(0) scale(1); }
        }
        @keyframes pass {
          from { transform: translateX(-50vw); }
          to { transform: translateX(150vw); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #f97316; }
          50% { text-shadow: 0 0 45px #f97316, 0 0 80px #ea580c; }
        }
      `}</style>

      {/* الغيوم */}
      {clouds.map((c, i) => (
        <div
          key={`c${i}`}
          className="absolute left-0 rounded-full bg-white/20 blur-2xl"
          style={{
            top: `${c.top}%`,
            width: c.size,
            height: c.size / 3,
            animation: `pass ${c.duration}s linear ${c.delay}s infinite`,
          }}
        />
      ))}

      {/* خطوط السرعة */}
      {streaks.map((s, i) => (
        <div
          key={`s${i}`}
          className="absolute left-0 h-[2px] bg-gradient-to-r from-transparent to-white/60"
          style={{
            top: `${s.top}%`,
            width: s.width,
            animation: `pass ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* الطيارة 3D */}
      <div
        className="relative z-10 w-full"
        style={{ animation: "fly-in 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }}
      >
        <Jet3D />
      </div>

      {/* الاسم */}
      <h1
        className="relative z-10 text-7xl font-bold"
        style={{ opacity: 0, animation: "fade-up 1s ease-out 1.8s forwards, glow 3s ease-in-out 2.8s infinite" }}
      >
        صقر
      </h1>

      <p
        className="relative z-10 text-xl text-orange-100 mt-4"
        style={{ opacity: 0, animation: "fade-up 1s ease-out 2.4s forwards" }}
      >
        نظام الصيانة الذكية للطائرات
      </p>

      <button
        className="relative z-10 mt-10 px-10 py-4 rounded-full bg-orange-600 text-lg font-bold shadow-[0_0_30px_#ea580c] transition hover:scale-110 hover:bg-orange-500"
        style={{ opacity: 0, animation: "fade-up 1s ease-out 3s forwards" }}
      >
        ابدأ الآن
      </button>

      {/* الجبال */}
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-24">
        <path d="M0 200 L0 120 L120 60 L220 130 L340 40 L470 140 L600 70 L720 150 L850 50 L1000 130 L1000 200 Z" fill="#0f172a" />
      </svg>

      {/* حقوق صاحب الموديل */}
      <a
        href="https://sketchfab.com/3d-models/none-f71e9fea01e24fea9b1b380161d21d38"
        target="_blank"
        dir="ltr"
        className="absolute bottom-2 left-4 z-10 text-xs text-white/50 hover:text-white/80"
      >
        Boeing F/A-18E/F &quot;Super Hornet&quot; by andertan (CC BY)
      </a>
    </main>
  );
}