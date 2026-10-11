import React, { useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledNotesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .notes-intro {
    max-width: 640px;
    margin: 0 0 50px;
    text-align: center;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.6;
  }

  .notes-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 18px;
    position: relative;
    width: 100%;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .notes-cta {
    ${({ theme }) => theme.mixins.button};
    margin: 50px auto 0;
  }
`;

const StyledNote = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .note-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .note-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    min-height: 240px;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: hidden;
  }

  .note-top {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    margin-bottom: 25px;

    .bookmark {
      color: var(--green);
      svg {
        width: 36px;
        height: 36px;
      }
    }

    .note-language {
      border: 1px solid var(--green);
      border-radius: var(--border-radius);
      padding: 2px 6px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1;
      text-transform: uppercase;
    }
  }

  .note-category {
    margin: 0 0 8px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-transform: uppercase;
  }

  .note-title {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .note-description {
    color: var(--light-slate);
    font-size: 17px;
    line-height: 1.6;
  }

  .note-more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 22px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Notes = () => {
  const data = useStaticQuery(graphql`
    query {
      notes: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/notes/" }
          frontmatter: { published: { eq: true } }
        }
        sort: { fields: [frontmatter___order], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              slug
              category
              language
            }
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealIntro = useRef(null);
  const revealNotes = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealIntro.current, srConfig(100));
    revealNotes.current.forEach((ref, i) => sr.reveal(ref, srConfig((i + 2) * 100)));
  }, []);

  const notes = data.notes.edges.filter(({ node }) => node).slice(0, 3);

  return (
    <StyledNotesSection id="notes">
      <h2 className="numbered-heading" ref={revealTitle}>
        Engineering Notes
      </h2>

      <p className="notes-intro" ref={revealIntro}>
        I write about software architecture, distributed systems, cloud, and AI engineering as I
        study and apply these topics. These engineering notes are a living log of what I am learning
        and how I reason about building reliable systems.
      </p>

      <ul className="notes-grid">
        {notes.map(({ node }, i) => {
          const { frontmatter } = node;
          const { title, description, slug, category, language } = frontmatter;

          return (
            <StyledNote key={i} ref={el => (revealNotes.current[i] = el)}>
              <div className="note-inner">
                <header>
                  <div className="note-top">
                    <span className="bookmark">
                      <Icon name="Bookmark" />
                    </span>
                    {language && <span className="note-language">{language}</span>}
                  </div>

                  {category && <p className="note-category">{category}</p>}

                  <h3 className="note-title">
                    <Link to={slug}>{title}</Link>
                  </h3>

                  <p className="note-description">{description}</p>
                </header>

                <span className="note-more">
                  Read note <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </StyledNote>
          );
        })}
      </ul>

      <Link className="notes-cta" to="/notes">
        Read all notes
      </Link>
    </StyledNotesSection>
  );
};

export default Notes;
