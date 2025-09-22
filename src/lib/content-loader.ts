import about from "../content/about.ts";
import firstTsm from "../content/first-tsm.ts";
import installation from "../content/installation.ts";
import overview from "../content/overview.ts";
import quickStart from "../content/quick-start.ts";
import welcome from "../content/welcome.ts";
import markdownBlocks from "../content/markdown-blocks.ts";
import dynamicContent from "../content/dynamic-content.ts";
import conditionalRendering from "../content/conditional-rendering.ts";
import syntaxGuide from "../content/syntax-guide.ts";
import bestPractices from "../content/best-practices.ts";
import components from "../content/components.ts";
import * as yaml from 'js-yaml';

export interface ContentData {
    frontmatter: any;
    rawContent: string;
}

const contentMap: Record<string, string> = {
    '/welcome': welcome,
    '/about': about,
    '/first-tsm': firstTsm,
    '/installation': installation,
    '/overview': overview,
    '/quick-start': quickStart,
    '/markdown-blocks': markdownBlocks,
    '/dynamic-content': dynamicContent,
    '/conditional-rendering': conditionalRendering,
    '/syntax-guide': syntaxGuide,
    '/best-practices': bestPractices,
    '/components': components,
};

function parseFrontmatter(content: string): { content: string; frontmatter: any } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { content, frontmatter: {} };
    }

    const frontmatterText = match[1] ?? '';
    const contentWithoutFrontmatter = match[2] ?? '';

    try {
        const frontmatter = yaml.load(frontmatterText) || {};
        return { content: contentWithoutFrontmatter, frontmatter };
    } catch (error) {
        console.warn('Failed to parse frontmatter:', error);
        return { content, frontmatter: {} };
    }
}

export function loadMarkdownContent(path: string): ContentData {
    const contentPath = path === '/' ? '/welcome' : path;
    const rawContent = contentMap[contentPath];
    const { content, frontmatter } = parseFrontmatter(rawContent ?? '');

    if (!content) {
        throw new Error(`Content not found: ${path}`);
    }

    return {
        frontmatter,
        rawContent: content
    };
}

export function getAvailableContentPaths(): string[] {
    return ['/', ...Object.keys(contentMap)];
}
