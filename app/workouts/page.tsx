import { PaywallLock } from "../components/PaywallLock";
import { COPY } from "@/lib/copy";

export default function Workouts() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:py-14 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)]">Paid</p>
        <h1 className="serif mt-1 text-3xl md:text-4xl">{COPY.workouts.title}</h1>
        <span className="gold-rule mt-3" aria-hidden />
        <p className="mt-3 max-w-xl text-sm text-stone-muted">{COPY.workouts.sub}</p>
      </header>

      <PaywallLock
        feature="workouts"
        title={COPY.workouts.lockedTitle}
        sub={COPY.workouts.lockedSub}
      >
        <div className="card rounded-sm p-6">
          <p className="text-sm text-stone-muted">
            Workout programs will load here once content is seeded.
          </p>
        </div>
      </PaywallLock>

      <section className="card rounded-sm p-6 fade-in">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-muted">
          Preview · free tier
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            { name: "Pike pushup", targets: "Shoulders" },
            { name: "Archer pullup", targets: "Lats · back" },
            { name: "Pseudo planche pushup", targets: "Chest · front delts" },
            { name: "Hollow-body hold", targets: "Core" },
          ].map((e) => (
            <li
              key={e.name}
              className="border border-[var(--color-line)] rounded-sm p-4"
            >
              <p className="serif text-xl">{e.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-muted">
                {e.targets}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
