import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from '../lib/utils';
import * as LucideIcons from 'lucide-react';
import { X } from 'lucide-react';
import logo from '../../assets/Icon.png';

interface ContentMetadata {
    title: string;
    description: string;
    route: string;
}

interface SidebarLink {
    href: string;
    children: string;
    icon?: string;
}

interface SidebarSection {
    title: string;
    links: SidebarLink[];
}

interface DynamicSidebarProps {
    sections: SidebarSection[];
    isMobile?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
}

export function DynamicSidebar({ sections, isMobile = false, isOpen = false, onClose }: DynamicSidebarProps) {
    const [contentMetadata, setContentMetadata] = useState<Record<string, ContentMetadata>>({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch('/api/content-metadata');
                if (response.ok) {
                    const metadata = await response.json();
                    setContentMetadata(metadata);
                }
            } catch (error) {
                console.error('Failed to fetch content metadata:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    const getDisplayTitle = (link: SidebarLink): string => {
        const metadata = contentMetadata[link.href];
        return metadata?.title || link.children;
    };

    const handleLinkClick = (href: string) => {
        navigate(href);
        if (isMobile && onClose) {
            onClose();
        }
    };

    const sidebarContent = (
        <nav className="space-y-6">
            {loading ? (
                <div className="text-muted-foreground text-sm">Loading navigation...</div>
            ) : (
                sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="px-2 text-xs mb-3 uppercase font-normal text-muted-foreground/85 mb-1 leading-tight">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.links.map((link) => {
                                const IconComponent = link.icon ? LucideIcons[link.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }> : null;
                                const displayTitle = getDisplayTitle(link);
                                const isActive = location.pathname === link.href;

                                return (
                                    <li key={link.href}>
                                        <Button
                                            variant={'ghost'}
                                            className={cn(
                                                "w-full justify-start duration-0 font-normal text-foreground/80 hover:text-foreground rounded-lg text-left h-auto py-1.5 px-3 font-normal",
                                                isActive && "text-foreground bg-muted  hover:bg-muted/80!",
                                                !isActive && "hover:bg-transparent"
                                            )}
                                            onClick={() => handleLinkClick(link.href)}
                                            title={contentMetadata[link.href]?.description}
                                        >
                                            <div className="flex items-center gap-2">
                                                {IconComponent && <IconComponent className="h-3.5! w-3.5! text-foreground/50!" />}
                                                <span className="truncate">{displayTitle}</span>
                                            </div>
                                        </Button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))
            )}
        </nav>
    );

    if (isMobile) {
        return (
            <>
                {/* Mobile overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={onClose}
                    />
                )}

                {/* Mobile sidebar */}
                <aside className={cn(
                    "fixed top-0 left-0 h-full w-80 bg-background border-r z-50 transform transition-transform duration-300 ease-in-out md:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="flex items-center justify-between p-4 border-b">
                        <Button
                            variant="ghost"
                            className="text-xl font-bold items-center flex gap-2 p-0 h-auto hover:bg-transparent"
                            onClick={() => navigate('/')}
                        >
                            <img src={logo} className="w-7 h-7" />
                            <p className="text-xl font-bold mt-2">TS Markdown</p>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="p-4 overflow-y-auto h-full">
                        {sidebarContent}
                    </div>
                </aside>
            </>
        );
    }

    // Desktop sidebar
    return (
        <aside className="w-64 flex-shrink-0 py-8 overflow-y-auto hidden md:block">
            {sidebarContent}
        </aside>
    );
}
