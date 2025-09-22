import about from "../content/about.ts";
import componentExamples from "../content/component-examples.ts";
import firstTsm from "../content/first-tsm.ts";
import frontmatterExamples from "../content/frontmatter-examples.ts";
import installation from "../content/installation.ts";
import overview from "../content/overview.ts";
import quickStart from "../content/quick-start.ts";
import testMarkdocRendering from "../content/test-markdoc-rendering.ts";
import welcome from "../content/welcome.ts";
import * as yaml from 'js-yaml';

export interface ContentData {
    frontmatter: any;
    rawContent: string;
}

const contentMap: Record<string, string> = {
    '/welcome': welcome,
    '/about': about,
    '/component-examples': componentExamples,
    '/first-tsm': firstTsm,
    '/frontmatter-examples': frontmatterExamples,
    '/installation': installation,
    '/overview': overview,
    '/quick-start': quickStart,
    '/test-markdoc-rendering': testMarkdocRendering
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
