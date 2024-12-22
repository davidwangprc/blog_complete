"use client";

import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styles from './markdownContent.module.css';
import Image from 'next/image';

const MarkdownContent = ({ content }) => {
  return (
    <ReactMarkdown
      className={styles.markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({node, src, alt, ...props}) => (
          <div className={styles.imageContainer}>
            <img
              src={src}
              alt={alt || ''}
              className={styles.markdownImage}
              loading="lazy"
              {...props}
            />
          </div>
        ),
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table: ({children}) => (
          <div className={styles.tableContainer}>
            <table>{children}</table>
          </div>
        ),
        thead: ({children}) => <thead className={styles.tableHead}>{children}</thead>,
        tbody: ({children}) => <tbody className={styles.tableBody}>{children}</tbody>,
        tr: ({children}) => <tr className={styles.tableRow}>{children}</tr>,
        th: ({children}) => <th className={styles.tableHeader}>{children}</th>,
        td: ({children}) => <td className={styles.tableCell}>{children}</td>
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContent; 