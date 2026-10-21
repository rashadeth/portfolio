import { films, designs } from "@/lib/portfolio-work";
import Link from "next/link";
import { getProject } from "@/lib/projects";
import ArrowRightUp from "@mingcute/react/core-regular/arrow-right-up";

export function FilmGallery() { return (<div className="film-grid">
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
        </div>); }

export function DesignGallery() { return (<div className="design-grid">
          {designs.map((project) => {
            const liveUrl = getProject(project.slug)?.liveUrl;
            return (
            <article className="design-card" key={project.slug}>
              <div className="design-media">
              <video controls playsInline preload="none" poster={`/images/ads/${project.slug}.jpg`} aria-label={`${project.title} design showcase`}>
                <source src={`/videos/${project.video}`} type="video/mp4" />
              </video>
              </div>
              <div className="film-caption design-caption">
                <h3><Link href={`/case-study/${project.slug}`}>{project.title}</Link></h3>
                <div className="design-actions">
                  <Link className="case-study-link" href={`/case-study/${project.slug}`} aria-label={`View ${project.title} case study`}>Case study</Link>
                  {liveUrl && <a className="case-study-link" href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live product (opens in a new tab)`}>View product <ArrowRightUp size={16} aria-hidden="true" /></a>}
                </div>
              </div>
            </article>
          ); })}
        </div>); }
