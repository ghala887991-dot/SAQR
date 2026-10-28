import Jet3D from "./Jet3D";

const parts = [
  { name: "المحرك", hours: 1240, percent: 62 },
  { name: "نظام الوقود", hours: 870, percent: 43 },
  { name: "العجلات", hours: 320, percent: 16 },
];

export default function Home() {
  return (
    <main dir="rtl" className="relative bg-night text-ink">
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal {
          animation: reveal linear both;
          animation-timeline: view();
          animation-range: entry 10% cover 35%;
        }
      `}</style>

      {/* الطيارة ثابتة ورا كل شي */}
      <Jet3D />

      {/* الشريط العلوي */}
      <header className="fixed top-0 inset-x-0 z-20 flex items-center justify-between px-10 py-6">
        <span className="text-xl font-bold">
          صقر <span className="text-accent">●</span>
        </span>
        <nav className="hidden md:flex gap-8 font-mono text-xs tracking-widest text-silver">
          <a href="#s1" className="hover:text-accent">الرئيسية</a>
          <a href="#s2" className="hover:text-accent">القطع</a>
          <a href="#s3" className="hover:text-accent">الصيانة</a>
          <a href="#s4" className="hover:text-accent">ابدأ</a>
        </nav>
      </header>

      <div className="relative z-10">
        {/* 01 */}
        <section id="s1" className="h-screen flex items-center justify-start px-10 md:px-24">
          <div className="max-w-md">
            <p className="font-mono text-xs tracking-widest text-accent mb-6">01 / نظام الصيانة الذكية</p>
            <h1 className="text-7xl md:text-8xl font-light mb-6">صقر</h1>
            <p className="text-lg text-silver mb-10">عين لا تنام على كل قطعة في طائرتك.</p>
            <button className="px-8 py-3 rounded-full bg-accent text-night font-bold transition hover:scale-105 hover:shadow-[0_0_30px_#00A878]">
              ابدأ الآن
            </button>
            <p className="font-mono text-xs text-silver/60 mt-16">مرّر للأسفل ↓</p>
          </div>
        </section>

        {/* 02 */}
        <section id="s2" className="h-screen flex items-end justify-center pb-24 px-10">
          <div className="reveal text-center max-w-xl">
            <p className="font-mono text-xs tracking-widest text-accent mb-6">02 / التفكيك</p>
            <h2 className="text-5xl md:text-6xl font-light mb-6">كل قطعة لها قصة</h2>
            <p className="text-silver">
              آلاف القطع في الطائرة الواحدة، وصقر يعرف عمر كل وحدة منها ومتى انصانت آخر مرة.
            </p>
          </div>
        </section>

        {/* 03 */}
        <section id="s3" className="h-screen flex items-center justify-end px-10 md:px-24">
          <div className="reveal max-w-sm w-full">
            <p className="font-mono text-xs tracking-widest text-accent mb-6">03 / الصيانة التنبؤية</p>
            <h2 className="text-5xl font-light mb-10">نعرف العطل قبل لا يصير</h2>
            <div className="space-y-4">
              {parts.map((p) => (
                <div key={p.name} className="bg-card border border-accent/20 rounded-xl p-4">
                  <div className="flex justify-between mb-3">
                    <span>{p.name}</span>
                    <span className="font-mono text-sm text-silver">{p.hours.toLocaleString("en")} ساعة متبقية</span>
                  </div>
                  <div className="h-1 bg-night rounded-full overflow-hidden">
                    <div
                      className={p.percent < 25 ? "h-full bg-orange-500" : "h-full bg-accent"}
                      style={{ width: `${p.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-silver/50 mt-4">* بيانات تجريبية</p>
          </div>
        </section>

        {/* 04 */}
        <section id="s4" className="h-screen flex items-end justify-center pb-32 px-10">
          <div className="reveal text-center">
            <p className="font-mono text-xs tracking-widest text-accent mb-6">04 / جاهز للإقلاع</p>
            <h2 className="text-5xl md:text-6xl font-light mb-10">صيانة أذكى. طيران أأمن.</h2>
            <button className="px-10 py-4 rounded-full bg-accent text-night font-bold transition hover:scale-105 hover:shadow-[0_0_30px_#00A878]">
              جرّب صقر
            </button>
          </div>
        </section>
      </div>

      {/* حقوق صاحب الموديل */}
      <a
        href="https://sketchfab.com/3d-models/none-f71e9fea01e24fea9b1b380161d21d38"
        target="_blank"
        dir="ltr"
        className="fixed bottom-3 left-4 z-20 text-xs text-silver/40 hover:text-silver"
      >
        Boeing F/A-18E/F &quot;Super Hornet&quot; by andertan (CC BY)
      </a>
    </main>
  );
}