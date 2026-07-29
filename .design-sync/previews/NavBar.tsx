import { NavBar } from 'bessa-me-site';
import { cardClassName, pageClassName } from './_fixtures';

// NavBar takes no props: the wordmark, the section links and the theme toggle
// are all baked in. It is `sticky top-0` inside the card rather than fixed to
// the viewport, so it sits in flow at the top of the card and stays there while
// the card scrolls.
//
// On mount it measures its own height and publishes it as --nav-h, which is
// what every Section header uses to park itself underneath. That only happens
// when the bar is actually rendered — a page built without it keeps the 47px
// fallback declared in the stylesheet.
//
// The hamburger and its full-screen panel are useState-driven, so this card
// shows the closed state; below the `sm` breakpoint the links collapse into
// that button. One export only — with no props there is no second variant that
// would render any differently.

export const Bar = () => (
  <div className={pageClassName}>
    <div className={cardClassName}>
      <NavBar />
      <div className="px-6 py-8">
        <h1 className="font-titles font-black text-[40px] leading-[.94] tracking-[-.02em] uppercase text-ink">
          Page content
        </h1>
        <p className="mt-3 max-w-[50ch] text-base font-medium leading-[1.55] text-ink-body">
          The bar rules off against the content below it. Its links scroll to
          the sections whose ids they name — #work, #content and #contact on the
          live site.
        </p>
      </div>
    </div>
  </div>
);
