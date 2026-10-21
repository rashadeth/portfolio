import { films, designs } from "@/lib/portfolio-work";

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
        </div>); }
