import React, { useEffect, useRef, useState } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledNoteContainer = styled.main`
  max-width: 900px;

  @media (min-width: 1180px) {
    max-width: 1320px;
  }
`;

const StyledReadableColumn = styled.div`
  max-width: 860px;
`;

const StyledNoteHeader = styled.header`
  max-width: 860px;
  margin-bottom: 50px;

  .medium-heading {
    margin-bottom: 18px;
  }

  .subtitle {
    color: var(--light-slate);
    font-size: var(--fz-xl);
    line-height: 1.5;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 10px;
    margin-top: 15px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .tag {
    margin-right: 10px;
    color: var(--green);
  }

  .language {
    display: inline-block;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 2px 6px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1;
    text-transform: uppercase;
  }
`;

const StyledNoteContent = styled.div`
  grid-column: 1;
  margin-bottom: 0;
  color: var(--light-slate);
  scroll-behavior: smooth;

  > *:first-child {
    margin-top: 0;
  }

  h1,
  h2 {
    margin: 2.4em 0 0.85em;
    padding-bottom: 0.35em;
    border-bottom: 1px solid var(--lightest-navy);
    color: var(--lightest-slate);
    line-height: 1.25;
  }

  h1 {
    font-size: clamp(28px, 4vw, 34px);
  }

  h2 {
    font-size: clamp(24px, 3vw, 30px);
  }

  h3 {
    margin: 2em 0 0.75em;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    line-height: 1.35;
  }

  h4,
  h5,
  h6 {
    margin: 1.6em 0 0.75em;
    color: var(--lightest-slate);
    line-height: 1.4;
  }

  h1[id],
  h2[id],
  h3[id] {
    scroll-margin-top: 110px;
  }

  .heading-anchor {
    margin-left: 8px;
    color: var(--green);
    opacity: 0;
    font-family: var(--font-mono);
    font-size: 0.75em;
    transition: var(--transition);
  }

  h1:hover .heading-anchor,
  h2:hover .heading-anchor,
  h3:hover .heading-anchor,
  .heading-anchor:focus {
    opacity: 1;
  }

  p,
  li {
    color: var(--light-slate);
    font-size: 18px;
    line-height: 1.75;
  }

  p {
    margin: 1.1em 0;
  }

  ul,
  ol {
    padding-left: 1.4em;
    margin: 1.1em 0 1.4em;
  }

  li + li {
    margin-top: 0.55em;
  }

  li > ul,
  li > ol {
    margin: 0.55em 0 0.75em;
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  blockquote {
    margin: 2rem 0;
    border-left: 3px solid var(--green);
    padding: 0.5rem 0 0.5rem 1.25rem;
    background-color: rgba(17, 34, 64, 0.35);

    p {
      margin: 0;
      color: var(--lightest-slate);
    }
  }

  table {
    display: block;
    width: 100%;
    max-width: 900px;
    margin: 2rem 0;
    overflow-x: auto;
    border-collapse: collapse;
    font-size: var(--fz-sm);
  }

  th,
  td {
    border: 1px solid var(--lightest-navy);
    padding: 12px 14px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background-color: var(--light-navy);
    color: var(--lightest-slate);
    font-family: var(--font-mono);
  }

  td {
    color: var(--light-slate);
  }

  .mermaid {
    position: relative;
    width: 100%;
    margin: 2rem 0;
    padding: 1rem;
    overflow-x: auto;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    text-align: center;
    cursor: zoom-in;
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 0 0 1px var(--green);
      outline: none;
    }

    &:after {
      content: 'Click to expand';
      position: absolute;
      right: 10px;
      bottom: 8px;
      border-radius: var(--border-radius);
      padding: 4px 7px;
      background-color: rgba(10, 25, 47, 0.86);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      opacity: 0;
      transition: var(--transition);
      pointer-events: none;
    }

    &:hover:after,
    &:focus:after {
      opacity: 1;
    }
  }

  .mermaid svg {
    max-width: 100%;
    height: auto;
  }
`;

const StyledMermaidOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 24px 24px;
  background-color: rgba(10, 25, 47, 0.96);

  .mermaid-fullscreen__content {
    width: min(1200px, 100%);
    max-height: calc(100vh - 110px);
    overflow: auto;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 24px;
    background-color: var(--light-navy);
    text-align: center;
  }

  .mermaid-fullscreen__content svg {
    max-width: 100%;
    height: auto;
  }

  .mermaid-fullscreen__close {
    position: fixed;
    top: 24px;
    right: 24px;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 10px 14px;
    background-color: var(--navy);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: rgba(100, 255, 218, 0.08);
      outline: none;
    }
  }
`;

const StyledReadingLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 860px) minmax(220px, 260px);
  gap: 72px;
  align-items: start;
  margin-bottom: 96px;

  @media (max-width: 1179px) {
    display: block;
    margin-bottom: 72px;
  }
`;

const StyledTableOfContents = styled.aside`
  grid-column: 2;
  grid-row: 1;
  position: sticky;
  top: 110px;
  max-height: calc(100vh - 140px);
  overflow: auto;
  padding-left: 24px;
  border-left: 1px solid var(--lightest-navy);

  @media (max-width: 1179px) {
    position: static;
    max-height: none;
    margin: -20px 0 42px;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 16px;
    background-color: rgba(17, 34, 64, 0.45);
  }

  h2 {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  ol {
    ${({ theme }) => theme.mixins.resetList};
  }

  li + li {
    margin-top: 8px;
  }

  .toc-row {
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 8px;
    align-items: start;
  }

  .toc-toggle {
    border: 0;
    padding: 3px 0 0;
    background: transparent;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    line-height: 1.55;
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--green);
      outline: none;
    }
  }

  .toc-toggle.placeholder {
    cursor: default;
    opacity: 0.35;
  }

  a {
    display: block;
    border-left: 2px solid transparent;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    padding: 4px 8px 4px 12px;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1.55;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    &:hover,
    &:focus,
    &.active {
      border-left-color: var(--green);
      background-color: rgba(100, 255, 218, 0.06);
      color: var(--green);
      outline: none;
    }
  }

  .toc-children {
    margin: 8px 0 0 26px;

    li + li {
      margin-top: 6px;
    }

    a {
      font-size: var(--fz-xxs);
    }
  }

  .back-top {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--lightest-navy);
  }

  .toc-mobile-toggle {
    display: none;
    width: 100%;
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    letter-spacing: 0.08em;
    text-align: left;
    text-transform: uppercase;
  }

  @media (max-width: 1179px) {
    h2 {
      display: none;
    }

    .toc-mobile-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .toc-tree {
      display: none;
      margin-top: 14px;
    }

    &.open .toc-tree {
      display: block;
    }
  }
`;

const StyledReadingNote = styled.aside`
  max-width: 860px;
  margin: -25px 0 42px;
  border: 1px solid rgba(100, 255, 218, 0.16);
  border-radius: var(--border-radius);
  padding: 14px 16px;
  background-color: rgba(17, 34, 64, 0.45);
  color: var(--light-slate);
  font-size: var(--fz-sm);
  line-height: 1.6;
`;

const StyledRelatedNotes = styled.section`
  margin: -40px 0 100px;
  padding-top: 30px;
  border-top: 1px solid var(--lightest-navy);

  h2 {
    margin: 0 0 16px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
  }

  ul {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }

  a {
    display: block;
    height: 100%;
    border-radius: var(--border-radius);
    padding: 14px 16px;
    background-color: var(--light-navy);
    color: var(--lightest-slate);

    &:hover,
    &:focus {
      color: var(--green);
      transform: translateY(-2px);
    }
  }
`;

const StyledNoteNavigation = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  max-width: 900px;
  margin: 0 0 70px;
  padding-top: 30px;
  border-top: 1px solid var(--lightest-navy);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  a,
  .placeholder {
    display: block;
    min-height: 92px;
    border-radius: var(--border-radius);
    padding: 16px;
    background-color: var(--light-navy);
  }

  a:hover,
  a:focus {
    transform: translateY(-2px);
  }

  .label {
    display: block;
    margin-bottom: 8px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
  }

  .title {
    color: var(--lightest-slate);
    font-size: var(--fz-md);
    line-height: 1.35;
  }

  .next {
    text-align: right;
  }

  .placeholder {
    opacity: 0.45;
  }
`;

const StyledBackLink = styled.div`
  margin: -35px 0 100px;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }
`;

const slugifyHeading = value =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const TableOfContents = ({ headings, activeHeading, expandedId, isOpen, onToggle, onNavigate, onToggleMobile }) => {
  if (!headings.length) {return null;}

  const rootHeadings = headings.filter(heading => heading.depth === 1);

  return (
    <StyledTableOfContents className={isOpen ? 'open' : ''} aria-label="Table of contents">
      <button
        type="button"
        className="toc-mobile-toggle"
        aria-expanded={isOpen}
        onClick={onToggleMobile}>
        <span>On this page</span>
        <span>{isOpen ? '⌃' : '⌄'}</span>
      </button>
      <h2>On this page</h2>
      <div className="toc-tree">
        <ol>
          {rootHeadings.map(heading => {
            const isExpanded = expandedId === heading.id;

            return (
              <li key={heading.id}>
                <div className="toc-row">
                  {heading.children.length > 0 ? (
                    <button
                      type="button"
                      className="toc-toggle"
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${heading.text}`}
                      aria-expanded={isExpanded}
                      onClick={() => onToggle(heading.id)}>
                      {isExpanded ? '⌄' : '›'}
                    </button>
                  ) : (
                    <span className="toc-toggle placeholder">›</span>
                  )}
                  <a
                    href={`#${heading.id}`}
                    title={heading.text}
                    className={activeHeading === heading.id ? 'active' : ''}
                    onClick={() => onNavigate(heading.id)}>
                    {heading.text}
                  </a>
                </div>

                {heading.children.length > 0 && isExpanded && (
                  <ol className="toc-children">
                    {heading.children.map(child => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          title={child.text}
                          className={activeHeading === child.id ? 'active' : ''}
                          onClick={() => onNavigate(heading.id)}>
                          {child.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
        <a href="#top" className="back-top">
          Back to top
        </a>
      </div>
    </StyledTableOfContents>
  );
};

const NoteTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, updatedAt, category, tags, language, related } = frontmatter;
  const relatedNotes = data.relatedNotes.edges.filter(({ node }) =>
    related?.some(item => node.frontmatter.slug === `/notes/${item}/` || node.frontmatter.slug === item),
  );
  const orderedNotes = data.allNotes.edges
    .map(({ node }) => node.frontmatter)
    .sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) {return orderA - orderB;}
      return a.title.localeCompare(b.title);
    });
  const currentIndex = orderedNotes.findIndex(note => note.slug === frontmatter.slug);
  const previousNote = currentIndex > 0 ? orderedNotes[currentIndex - 1] : null;
  const nextNote = currentIndex >= 0 && currentIndex < orderedNotes.length - 1 ? orderedNotes[currentIndex + 1] : null;
  const contentRef = useRef(null);
  const [expandedMermaid, setExpandedMermaid] = useState('');
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [expandedId, setExpandedId] = useState('');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const displayDate = updatedAt || date;
  const formattedDate = new Date(displayDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    if (!contentRef.current) {return undefined;}

    const usedIds = new Map();
    const headingNodes = Array.from(contentRef.current.querySelectorAll('h1, h2'));
    let currentRoot = null;
    const parsedHeadings = headingNodes.map(heading => {
      const text = heading.textContent.replace('#', '').trim();
      if (!text) {return null;}

      const baseId = heading.id || slugifyHeading(text);
      const count = usedIds.get(baseId) || 0;
      const id = count ? `${baseId}-${count + 1}` : baseId;

      usedIds.set(baseId, count + 1);
      heading.id = id;

      if (!heading.querySelector('.heading-anchor')) {
        const anchor = document.createElement('a');
        anchor.className = 'heading-anchor';
        anchor.href = `#${id}`;
        anchor.setAttribute('aria-label', `Link to ${text}`);
        anchor.textContent = '#';
        heading.appendChild(anchor);
      }

      const depth = Number(heading.tagName.replace('H', ''));
      const parsedHeading = {
        id,
        text,
        depth,
        parentId: depth === 1 ? null : currentRoot,
        children: [],
      };

      if (depth === 1) {currentRoot = id;}

      return parsedHeading;
    }).filter(Boolean);

    const rootHeadings = [];
    const headingById = new Map(parsedHeadings.map(heading => [heading.id, heading]));

    parsedHeadings.forEach(heading => {
      if (heading.depth === 1) {
        rootHeadings.push(heading);
        return;
      }

      const parent = headingById.get(heading.parentId);
      if (parent) {parent.children.push(heading);}
    });

    setHeadings(rootHeadings);
    setActiveHeading(rootHeadings[0]?.id || '');
    setExpandedId(rootHeadings[0]?.id || '');

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveHeading(visibleEntry.target.id);
        }
      },
      { rootMargin: '-18% 0px -70% 0px', threshold: 0 },
    );

    headingNodes.forEach(heading => observer.observe(heading));

    return () => observer.disconnect();
  }, [html]);

  useEffect(() => {
    if (!activeHeading) {return;}

    const activeRoot = headings.find(
      heading => heading.id === activeHeading || heading.children.some(child => child.id === activeHeading),
    );

    if (!activeRoot) {return;}

    setExpandedId(activeRoot.id);
  }, [activeHeading, headings]);

  useEffect(() => {
    const loadMermaid = () =>
      new Promise((resolve, reject) => {
        if (window.mermaid) {
          resolve(window.mermaid);
          return;
        }

        const existingScript = document.querySelector('script[data-mermaid]');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve(window.mermaid));
          existingScript.addEventListener('error', reject);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.async = true;
        script.dataset.mermaid = 'true';
        script.addEventListener('load', () => resolve(window.mermaid));
        script.addEventListener('error', reject);
        document.body.appendChild(script);
      });

    const renderMermaid = async () => {
      if (!contentRef.current) {return;}

      const blocks = contentRef.current.querySelectorAll('pre code.language-mermaid');
      if (!blocks.length) {return;}

      const mermaid = await loadMermaid();
      if (!mermaid) {return;}

      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'strict',
        themeVariables: {
          primaryColor: '#112240',
          primaryTextColor: '#ccd6f6',
          primaryBorderColor: '#64ffda',
          lineColor: '#8892b0',
          secondaryColor: '#0a192f',
          tertiaryColor: '#233554',
          background: '#0a192f',
          mainBkg: '#112240',
          nodeBorder: '#64ffda',
          clusterBkg: '#112240',
          clusterBorder: '#233554',
          edgeLabelBackground: '#112240',
        },
      });

      blocks.forEach((block, index) => {
        const container = document.createElement('div');
        container.className = 'mermaid';
        container.id = `mermaid-note-${index}`;
        container.tabIndex = 0;
        container.setAttribute('role', 'button');
        container.setAttribute('aria-label', 'Open diagram in fullscreen');
        container.textContent = block.textContent;
        block.parentElement.replaceWith(container);
      });

      await mermaid.run({ nodes: contentRef.current.querySelectorAll('.mermaid') });
    };

    renderMermaid().catch(error => {
      console.error('Failed to render Mermaid diagrams', error);
    });
  }, []);

  useEffect(() => {
    if (!contentRef.current) {return undefined;}

    const content = contentRef.current;
    const openDiagram = event => {
      const diagram = event.target.closest('.mermaid');
      if (!diagram || !content.contains(diagram)) {return;}
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {return;}

      event.preventDefault();
      setExpandedMermaid(diagram.innerHTML);
    };

    content.addEventListener('click', openDiagram);
    content.addEventListener('keydown', openDiagram);

    return () => {
      content.removeEventListener('click', openDiagram);
      content.removeEventListener('keydown', openDiagram);
    };
  }, []);

  useEffect(() => {
    if (!expandedMermaid) {return undefined;}

    const closeOnEscape = event => {
      if (event.key === 'Escape') {setExpandedMermaid('');}
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [expandedMermaid]);

  return (
    <Layout location={location}>
      <Helmet title={title} />

      {expandedMermaid && (
        <StyledMermaidOverlay
          role="dialog"
          aria-modal="true"
          aria-label="Expanded Mermaid diagram"
          onClick={event => {
            if (event.target === event.currentTarget) {setExpandedMermaid('');}
          }}>
          <button
            type="button"
            className="mermaid-fullscreen__close"
            onClick={() => setExpandedMermaid('')}>
            Close
          </button>
          <div
            className="mermaid-fullscreen__content"
            dangerouslySetInnerHTML={{ __html: expandedMermaid }}
          />
        </StyledMermaidOverlay>
      )}

      <StyledNoteContainer id="top">
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/notes">All notes</Link>
        </span>

        <StyledReadableColumn>
          <StyledNoteHeader>
            <h1 className="medium-heading">{title}</h1>
            <p className="subtitle">{frontmatter.description}</p>
            <div className="meta">
              <time>{updatedAt ? 'Updated ' : ''}{formattedDate}</time>
              {category && <span>{category}</span>}
              {language && <span className="language">{language}</span>}
            </div>
            {tags?.length > 0 && (
              <div className="meta">
                {tags.map((tag, i) => (
                  <span key={i} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </StyledNoteHeader>

          <StyledReadingNote>
            These are working notes, refined over time as I study and apply the concepts in real
            projects. They favor clarity, references, and practical recall over polished article prose.
          </StyledReadingNote>
        </StyledReadableColumn>

        <StyledReadingLayout>
          <TableOfContents
            headings={headings}
            activeHeading={activeHeading}
            expandedId={expandedId}
            isOpen={isTocOpen}
            onToggle={id => setExpandedId(current => (current === id ? '' : id))}
            onNavigate={id => {
              setExpandedId(id);
              setIsTocOpen(false);
            }}
            onToggleMobile={() => setIsTocOpen(current => !current)}
          />
          <StyledNoteContent ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
        </StyledReadingLayout>

        <StyledNoteNavigation aria-label="Notes navigation">
          {previousNote ? (
            <Link to={previousNote.slug}>
              <span className="label">Previous</span>
              <span className="title">{previousNote.title}</span>
            </Link>
          ) : (
            <span className="placeholder">
              <span className="label">Previous</span>
              <span className="title">Start of path</span>
            </span>
          )}

          {nextNote ? (
            <Link to={nextNote.slug} className="next">
              <span className="label">Next</span>
              <span className="title">{nextNote.title}</span>
            </Link>
          ) : (
            <span className="placeholder next">
              <span className="label">Next</span>
              <span className="title">End of path</span>
            </span>
          )}
        </StyledNoteNavigation>

        {related?.length > 0 && relatedNotes.length > 0 && (
          <StyledRelatedNotes>
            <h2>Related Notes</h2>
            <ul>
              {relatedNotes.map(({ node }) => (
                <li key={node.frontmatter.slug}>
                  <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
                </li>
              ))}
            </ul>
          </StyledRelatedNotes>
        )}

        <StyledBackLink>
          <Link to="/notes">&larr; Back to all notes</Link>
        </StyledBackLink>
      </StyledNoteContainer>
    </Layout>
  );
};

export default NoteTemplate;

NoteTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

TableOfContents.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      children: PropTypes.array,
    }),
  ).isRequired,
  activeHeading: PropTypes.string,
  expandedId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onToggleMobile: PropTypes.func.isRequired,
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        updatedAt
        slug
        category
        tags
        related
        language
        order
      }
    }
    allNotes: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/notes/" }, frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            order
          }
        }
      }
    }
    relatedNotes: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/notes/" }, frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;
