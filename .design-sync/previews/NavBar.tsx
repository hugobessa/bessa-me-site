import { NavBar } from 'bessa-me-site';

// The <nav> is position:fixed (top-3 left-3 right-3), so it pins to the card
// viewport rather than to this wrapper. `children` is the page content beneath
// it, which needs its own top spacing because the fixed bar is out of flow.
// The section links (#work, #education, #content, #contact) are baked into the
// component — the only prop is children.
//
// The hamburger / full-screen mobile menu is useState-driven, so only the
// closed state renders statically; see NOTES.md.

const Section = ({ id, title, body }: { id: string; title: string; body: string }) => (
  <section id={id} className="mx-auto max-w-3xl px-6 py-10">
    <h2 className="text-3xl font-semibold mb-3">{title}</h2>
    <p className="text-gray-600 max-w-prose">{body}</p>
  </section>
);

export const WithPageContent = () => (
  <NavBar>
    <div className="pt-24 pb-10 bg-gray-50 min-h-[26rem]">
      <Section
        id="work"
        title="Work"
        body="Engineering manager and full stack developer. This block stands in for the page content the navigation scrolls through — the bar itself is fixed, so content needs its own top padding."
      />
      <Section
        id="content"
        title="Content"
        body="Writing, talks and open source, filtered by tag on the live site."
      />
    </div>
  </NavBar>
);

export const BarOverContent = () => (
  <NavBar>
    <div className="pt-24 bg-white min-h-[20rem]">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-semibold mb-2">Hugo Bessa</h1>
        <p className="text-gray-600">My live CV and repository of doings.</p>
      </div>
    </div>
  </NavBar>
);
