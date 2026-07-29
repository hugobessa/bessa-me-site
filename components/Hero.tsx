import Image from "next/image";

export const Hero = ({
  meta,
  highlight,
}: {
  meta: string[];
  /**
   * The one meta item that isn't a fact about where he is — the size of what he
   * runs. Filled rather than muted so it reads first in the row.
   */
  highlight?: string;
}) => (
  <section
    id="hero"
    className="grid lg:grid-cols-[1fr_300px] border-b-2 border-ink scroll-mt-(--nav-h)"
  >
    <div className="flex flex-col gap-4 px-6 py-[34px] min-w-0 lg:border-r-2 border-ink">
      <div className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-ink">
        {"// cv & repository of doings"}
      </div>
      <h1 className="font-titles font-black text-[40px] sm:text-[54px] leading-[.94] tracking-[-.02em] uppercase text-ink">
        Hi, I&apos;m
        <br />
        Hugo <span className="bg-accent text-on-accent px-1.5">Bessa</span>
      </h1>
      <p className="max-w-[50ch] text-base font-medium leading-[1.55] text-ink-body">
        Engineering manager who builds teams and systems that hold up under real load. Composer and producer when the laptop&apos;s closed.
      </p>
      <div className="flex flex-wrap border-2 border-ink self-start">
        <a
          href="#leadership"
          className="font-mono text-xs font-extrabold uppercase tracking-[.12em] px-[18px] py-[14px] bg-accent text-on-accent border-r-2 border-ink"
        >
          how i lead
        </a>
        <a
          href="#contact"
          className="font-mono text-xs font-extrabold uppercase tracking-[.12em] px-[18px] py-[14px] bg-surface text-ink hover:bg-surface-2"
        >
          say hello
        </a>
      </div>
      {(meta.length > 0 || !!highlight) && (
        <div className="flex flex-wrap items-center gap-[18px] pt-[14px] border-t-2 border-dotted border-rule font-mono text-[11px] font-bold uppercase tracking-widest text-ink-muted">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
          {highlight && (
            <span className="bg-surface-2 text-ink px-2 py-1">{highlight}</span>
          )}
        </div>
      )}
    </div>
    <div className="flex items-end bg-stripes min-h-[280px] border-t-2 lg:border-t-0 border-ink">
      <Image
        src="/imgs/my-pic.png"
        width={400}
        height={386}
        alt="Hugo Bessa"
        className="w-full h-full max-h-[380px] object-contain object-bottom"
      />
    </div>
  </section>
);
