import React, { useMemo, useState } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconBookmark } from '@components/icons';

const StyledMainContainer = styled.main`
  & > header {
    max-width: 760px;
    margin: 0 auto 58px;
    text-align: center;

    .big-heading {
      font-size: clamp(42px, 7vw, 72px);
    }

    .subtitle {
      max-width: 680px;
      margin: 18px auto 0;
      color: var(--light-slate);
      font-family: var(--font-sans);
      font-size: var(--fz-lg);
      line-height: 1.55;
    }
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  position: relative;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const StyledControls = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 35px;
  border: 1px solid var(--lightest-navy);
  border-radius: var(--border-radius);
  padding: 16px;
  background-color: rgba(17, 34, 64, 0.52);

  .search {
    width: 100%;
    height: 42px;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 0 15px;
    background-color: var(--navy);
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    transition: var(--transition);

    &:focus {
      outline: 1px solid var(--green);
    }
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    justify-content: flex-start;
  }

  button {
    border: 1px solid rgba(100, 255, 218, 0.14);
    border-radius: 999px;
    min-height: 32px;
    padding: 7px 13px;
    background-color: transparent;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);

    &.active,
    &:hover,
    &:focus {
      border-color: var(--green);
      background-color: rgba(100, 255, 218, 0.08);
      color: var(--green);
      outline: none;
    }
  }

  .result-count {
    margin-top: -4px;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;

const StyledNote = styled.li`
  transition: var(--transition);
  cursor: default;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .note__inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .note__inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    min-height: 330px;
    padding: 2rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    background-color: var(--light-navy);

    header,
    a {
      width: 100%;
    }
  }

  .note__icon {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    color: var(--green);
    margin-bottom: 28px;

    svg {
      width: 40px;
      height: 40px;
      flex: 0 0 auto;
    }
  }

  .note__badges {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 6px;
    min-width: 0;
    padding-top: 2px;
  }

  .note__category {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.4;
    text-transform: uppercase;
  }

  .note__language {
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 2px 6px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1;
    text-transform: uppercase;
  }

  .note__title {
    margin: 0 0 10px;
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

  .note__desc {
    color: var(--light-slate);
    font-size: 17px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .note__date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }

  ul.note__tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    padding: 0;
    margin: 15px 0 0;
    list-style: none;

    li {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const NotesPage = ({ location, data }) => {
  const notes = data.allMarkdownRemark.edges;
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const values = notes.map(({ node }) => node.frontmatter.category).filter(Boolean);
    return ['All', ...Array.from(new Set(values)).sort((a, b) => a.localeCompare(b))];
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return notes.filter(({ node }) => {
      const { title, description, tags, category } = node.frontmatter;
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
      const searchable = [title, description, category, ...(tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      const orderA = a.node.frontmatter.order ?? 999;
      const orderB = b.node.frontmatter.order ?? 999;
      if (orderA !== orderB) {return orderA - orderB;}
      return a.node.frontmatter.title.localeCompare(b.node.frontmatter.title);
    });
  }, [notes, query, selectedCategory]);

  return (
    <Layout location={location}>
      <Helmet title="Engineering Notes" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Engineering Notes</h1>
          <p className="subtitle">
            A living collection of architecture and engineering notes from my MBA, work practice,
            and technical studies. Most notes are published in the language they were originally
            written, with selected English translations planned over time.
          </p>
        </header>

        <StyledControls>
          <input
            className="search"
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search notes..."
            aria-label="Search notes"
          />

          <div className="filters" aria-label="Filter notes by category">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            ))}
          </div>

          <div className="result-count">
            Showing {filteredNotes.length} of {notes.length} notes
          </div>
        </StyledControls>

        <StyledGrid>
          {filteredNotes.length > 0 &&
            filteredNotes.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, description, slug, date, updatedAt, tags, category, language } = frontmatter;
              const displayDate = updatedAt || date;
              const formattedDate = new Date(displayDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <StyledNote key={i}>
                  <div className="note__inner">
                    <header>
                      <div className="note__icon">
                        <IconBookmark />
                        <span className="note__badges">
                          {category && <span className="note__category">{category}</span>}
                          {language && <span className="note__language">{language}</span>}
                        </span>
                      </div>
                      <h2 className="note__title">
                        <Link to={slug}>{title}</Link>
                      </h2>
                      <p className="note__desc">{description}</p>
                      {tags?.length > 0 && (
                        <ul className="note__tags">
                          {tags.map((tag, i) => (
                            <li key={i}>#{tag}</li>
                          ))}
                        </ul>
                      )}
                    </header>

                    <footer>
                      <span className="note__date">{updatedAt ? 'Updated ' : ''}{formattedDate}</span>
                    </footer>
                  </div>
                </StyledNote>
              );
            })}
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  );
};

NotesPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default NotesPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/notes/" }, frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            category
            language
            status
            updatedAt
            order
            tags
            published
          }
        }
      }
    }
  }
`;
