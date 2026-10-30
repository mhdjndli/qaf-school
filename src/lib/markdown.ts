import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface TocEntry {
  id: string;
  text: string;
}

export interface RenderedPost {
  /** Everything before the first H2 (intro and key takeaways). */
  intro: string;
  body: string;
  /** body split at the middle H2, so a call to action can sit between the halves. */
  bodyFirst: string;
  bodyRest: string;
  toc: TocEntry[];
  wordCount: number;
  readingMinutes: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;|&#\d+;/g, "")
    .replace(/[‘’'"“”]/g, "")
    .replace(/[^a-z0-9؀-ۿ]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function hasMarkdownPost(slug: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, `${slug}.md`));
}

/** Render a blog post's Markdown body (src/content/blog/<slug>.md) to HTML at build time. */
export function renderMarkdownPost(slug: string): RenderedPost | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf8");

  const toc: TocEntry[] = [];
  const usedIds = new Set<string>();
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading({ tokens, depth, text }) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(text) || `section-${usedIds.size + 1}`;
        while (usedIds.has(id)) id += "-2";
        usedIds.add(id);
        if (depth === 2) toc.push({ id, text: text.replace(/\*\*|__|\*|`/g, "") });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      paragraph({ tokens }) {
        const inner = this.parser.parseInline(tokens);
        const plain = inner.replace(/<[^>]+>/g, "");
        const arabic = (plain.match(/[\u0600-\u06ff\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/g) ?? []).length;
        const latin = (plain.match(/[A-Za-z]/g) ?? []).length;
        if (arabic > 0 && arabic > latin * 2) {
          return `<p class="qaf-arabic" lang="ar" dir="rtl">${inner}</p>\n`;
        }
        return `<p>${inner}</p>\n`;
      },
      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const t = title ? ` title="${escapeAttr(title)}"` : "";
        if (/^https?:\/\//.test(href) && !href.startsWith("https://qafschool.com")) {
          return `<a href="${escapeAttr(href)}"${t} target="_blank" rel="noopener">${inner}</a>`;
        }
        return `<a href="${escapeAttr(href.replace("https://qafschool.com", ""))}"${t}>${inner}</a>`;
      },
      table(token) {
        const header = token.header
          .map((cell) => `<th>${this.parser.parseInline(cell.tokens)}</th>`)
          .join("");
        const body = token.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${this.parser.parseInline(cell.tokens)}</td>`).join("")}</tr>`)
          .join("\n");
        return `<div class="qaf-table"><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></div>\n`;
      },
    },
  });

  const html = marked.parse(source, { async: false }) as string;
  const wordCount = source
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*|`_-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const split = html.indexOf("<h2");
  const intro = split === -1 ? "" : html.slice(0, split);
  const body = split === -1 ? html : html.slice(split);

  const h2s = [...body.matchAll(/<h2/g)].map((m) => m.index ?? 0);
  const mid = h2s.length >= 4 ? h2s[Math.floor(h2s.length / 2)] : -1;
  const bodyFirst = mid === -1 ? body : body.slice(0, mid);
  const bodyRest = mid === -1 ? "" : body.slice(mid);

  return { intro, body, bodyFirst, bodyRest, toc, wordCount, readingMinutes: Math.max(1, Math.round(wordCount / 230)) };
}
