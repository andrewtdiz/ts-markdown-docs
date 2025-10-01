import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Heading {
    id: string;
    text: string;
    level: number;
    element: HTMLElement;
}

interface OnThisPageSidebarProps {
    content: string;
    className?: string;
}

export function OnThisPageSidebar({ content, className }: OnThisPageSidebarProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeadingId, setActiveHeadingId] = useState<string>('');
    const observerRef = useRef<IntersectionObserver | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Extract headings from markdown content
    useEffect(() => {
        const extractHeadings = () => {
            const headingRegex = /^(#{2,6})\s+(.+)$/gm;
            const extractedHeadings: Heading[] = [];
            let match;

            while ((match = headingRegex.exec(content)) !== null) {
                const level = match[1]?.length || 0;
                const text = match[2]?.trim() || '';

                // Skip if text is empty
                if (!text) continue;

                const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');

                // Skip if id is empty after processing
                if (!id) continue;

                extractedHeadings.push({
                    id,
                    text,
                    level,
                    element: null as any, // Will be set when DOM elements are available
                });
            }

            setHeadings(extractedHeadings);
        };

        extractHeadings();
    }, [content]);

    useEffect(() => {
        if (headings.length === 0) return;

        const timeoutId = setTimeout(() => {
            const headingElements = headings.map(heading => {
                const element = document.getElementById(heading.id);
                return element ? { ...heading, element } : null;
            }).filter((heading): heading is Heading => heading !== null);

            if (headingElements.length === 0) return;

            // Create intersection observer with simpler logic
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    // Find the first visible heading
                    const visibleEntry = entries.find(entry => entry.isIntersecting);
                    if (visibleEntry) {
                        setActiveHeadingId(visibleEntry.target.id);
                    }
                },
                {
                    rootMargin: '-20% 0px -60% 0px',
                    threshold: 0.1,
                }
            );

            headingElements.forEach(heading => {
                if (heading.element) {
                    observerRef.current?.observe(heading.element);
                }
            });
        }, 200);

        return () => {
            clearTimeout(timeoutId);
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]);

    // Add scroll event listener for active heading detection
    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                // Find all heading elements in the DOM
                const headingElements = headings.map(heading => {
                    const element = document.getElementById(heading.id);
                    return element ? { ...heading, element } : null;
                }).filter((heading): heading is Heading => heading !== null);

                if (headingElements.length === 0) return;

                const scrollTop = window.scrollY;
                const offset = 150; // Offset from top of viewport

                // Find the heading that's currently active
                let activeHeading = headingElements[0];

                for (const heading of headingElements) {
                    const elementTop = heading.element.offsetTop;
                    if (elementTop <= scrollTop + offset) {
                        activeHeading = heading;
                    } else {
                        break;
                    }
                }

                setActiveHeadingId(activeHeading?.id || '');
            }, 50);
        };

        // Initial call to set active heading
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [headings]);

    // Handle smooth scroll to heading
    const scrollToHeading = (headingId: string) => {
        const element = document.getElementById(headingId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className={cn('hidden lg:block', className)}>
            <div className="sticky top-12 w-64">
                <div className="border-l border-border pl-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                        On this page
                    </h3>
                    <nav className="space-y-1">
                        {headings.map((heading) => (
                            <Button
                                key={heading.id}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    'w-full justify-start text-left text-sm font-normal h-auto py-1 px-2',
                                    'hover:bg-muted/50 transition-colors',
                                    activeHeadingId === heading.id
                                        ? 'bg-muted text-foreground font-medium'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                                style={{
                                    paddingLeft: `${(heading.level - 2) * 12 + 8}px`,
                                }}
                                onClick={() => scrollToHeading(heading.id)}
                            >
                                {heading.text}
                            </Button>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
