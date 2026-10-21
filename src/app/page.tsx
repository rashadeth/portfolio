import PortfolioHero from "@/components/PortfolioHero";
import GlassNav from "@/components/GlassNav";
import PortfolioScrollReveal from "@/components/PortfolioScrollReveal";

const films = [
  {
    title: "Chowdeck × Zayith",
    category: "AI brand ad",
    description: "An AI ad bringing Zayith yoghurt and Chowdeck delivery together.",
    slug: "chowdeck-zayith",
  },
  {
    title: "Zayith",
    category: "AI product ad",
    description: "An AI product ad for Zayith yoghurt.",
    slug: "zayith",
  },
  {
    title: "Lexycon",
    category: "AI UGC ad",
    description: "A creator-style video introducing Lexycon through a personal, conversational story.",
    slug: "lexycon",
  },
  {
    title: "Blok — Bole Festival",
    category: "AI ad",
    description: "An AI-powered ad bringing Blok into the world of Bole Festival.",
    slug: "blok",
  },
  {
    title: "Eden Power",
    category: "AI brand film",
    description: "An AI-crafted commercial combining product visuals and storytelling for Eden Power.",
    slug: "eden-power",
  },
];

const designs = [
  { title: "Foodcourt", slug: "foodcourt", video: "foodcourt.MP4" },
  { title: "Spacebook", slug: "spacebook", video: "spacebook.mp4" },
  { title: "Steppa", slug: "steppa", video: "steppa.mp4" },
  { title: "AFROSZN", slug: "afroszn", video: "afroszn.mp4" },
];

export default function Home() {
  return (
    <main className="portfolio" id="top">
      <GlassNav />
      <PortfolioScrollReveal />
      <PortfolioHero />

      <span id="work" className="section-anchor" aria-hidden="true" />
      <section id="films-section" className="work-section" aria-labelledby="films-title">
        <div className="section-heading">
          <h2 id="films-title">AI films & ads</h2>
        </div>
        <div className="film-grid">
          {films.map((film) => (
            <article className={`film-card film-${film.slug}`} key={film.slug}>
              <div className="film-media">
                <video controls playsInline preload="none" poster={`/images/ads/${film.slug}-cover.jpg`} aria-label={`${film.title} — ${film.category}`}>
                  <source src={`/videos/ads/${film.slug}.mp4`} type="video/mp4" />
                  Your browser does not support video. <a href={`/videos/ads/${film.slug}.mp4`}>Download {film.title}</a>.
                </video>
              </div>
              <div className="film-caption">
                <div>
                  <h3>{film.title}</h3>
                  <p className="film-description">{film.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <span id="design" className="section-anchor" aria-hidden="true" />
      <section id="design-section" className="work-section" aria-labelledby="design-title">
        <div className="section-heading">
          <h2 id="design-title">Digital design</h2>
        </div>
        <div className="design-grid">
          {designs.map((project) => (
            <article className="design-card" key={project.slug}>
              <div className="design-media">
              <video controls playsInline preload="none" poster={`/images/ads/${project.slug}.jpg`} aria-label={`${project.title} design showcase`}>
                <source src={`/videos/${project.video}`} type="video/mp4" />
              </video>
              </div>
              <div className="film-caption"><h3>{project.title}</h3><a href={`/case-study/${project.slug}`} aria-label={`View ${project.title} case study`}>View project</a></div>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
