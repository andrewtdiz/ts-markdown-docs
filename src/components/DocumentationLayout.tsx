import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { DynamicSidebar } from './DynamicSidebar';
import { PageActions } from './PageActions';
import { MarkdownRenderer } from './MarkdownRenderer';
import { OnThisPageSidebar } from './OnThisPageSidebar';
import { sidebar } from '../sidebar';
import { loadMarkdownContent } from '../lib/content-loader';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';

export function DocumentationLayout() {
    const location = useLocation();
    const currentPath = location.pathname;
    const currentPathSection = sidebar.find(section => section.links.find(link => link.href === currentPath));
    const currentPathLinkIndex = currentPathSection?.links.findIndex(link => link.href === currentPath) ?? -1;
    const nextPath = currentPathSection?.links[currentPathLinkIndex + 1];
    const nextPathHref = nextPath?.href || '/';
    const divRef = useRef<HTMLDivElement>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTo({ top: 0 });
        }
    }, [currentPath]);

    // Close mobile sidebar when navigating
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [currentPath]);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const renderContent = () => {
        if (currentPath === '/') {
            return (
                <div className="text-center py-8 text-muted-foreground">
                    Welcome to TS Markdown Documentation
                </div>
            );
        }

        try {
            // Load content synchronously
            const { frontmatter, rawContent } = loadMarkdownContent(currentPath);

            // Update document title
            if (frontmatter?.title) {
                document.title = `${frontmatter.title} - TS Markdown Documentation`;
            }

            return (
                <div>
                    {/* Page Header with Title and Description */}
                    {frontmatter && (
                        <div className="mb-6 pb-6 border-b border-border">
                            {/* Page Actions */}
                            {frontmatter && rawContent && (
                                <PageActions
                                    title={frontmatter.title}
                                    description={frontmatter.description}
                                    content={rawContent}
                                    frontmatter={frontmatter}
                                />
                            )}

                            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
                                {frontmatter.title}
                            </h1>
                            {frontmatter.description && (
                                <p className="text-xl font-normal leading-7">
                                    {frontmatter.description}
                                </p>
                            )}
                        </div>
                    )}


                    {/* Render markdown with ReactMarkdown */}
                    <MarkdownRenderer content={rawContent} />
                </div>
            );
        } catch (err) {
            return (
                <div className="text-center py-8">
                    <div className="text-red-500 mb-4">
                        Error: {err instanceof Error ? err.message : 'Failed to load content'}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="h-screen w-screen bg-background flex flex-col">
            {/* Header */}
            <Header onMobileMenuToggle={toggleMobileSidebar} />

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
                <div className="flex w-full max-w-7xl mx-auto">
                    {/* Desktop Dynamic Sidebar Navigation */}
                    <DynamicSidebar sections={sidebar} />
                    <div className="w-12 md:block hidden"></div>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto" style={{ scrollbarColor: 'rgba(107, 114, 128, 0.3) transparent' }} ref={divRef}>
                        <div className="mx-auto md:mx-0! w-[90%]">
                            {renderContent()}
                        </div>
                        <div className="mx-auto md:mx-0! w-[90%] mt-20 mb-16">
                            {nextPathHref !== '/' && <Link to={nextPathHref}>
                                <Card className="p-4! bg-transparent hover:bg-muted/25">
                                    <CardContent className="p-0! flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-sm text-muted-foreground">Next</p>
                                            <p>{nextPath?.children}</p>
                                        </div>
                                        <ArrowRight className="h-6 w-6" />
                                    </CardContent>
                                </Card>
                            </Link>}
                        </div>
                        <Separator className='mb-16' />
                    </main>

                    <div className="w-2 md:block hidden"></div>

                    {currentPath !== '/' && (() => {
                        try {
                            const { rawContent } = loadMarkdownContent(currentPath);
                            return <OnThisPageSidebar content={rawContent} />;
                        } catch {
                            return null;
                        }
                    })()}
                </div>
            </div>

            {/* Mobile Dynamic Sidebar */}
            <DynamicSidebar
                sections={sidebar}
                isMobile={true}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />
        </div>
    );
}
