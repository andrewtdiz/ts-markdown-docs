import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, FileText, Component, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { useTheme } from './ThemeProvider';

export function LandingPage() {
    const { theme } = useTheme();
    const features = [
        {
            icon: Zap,
            title: "Dynamic Content",
            description: "Create dynamic, interactive content with template interpolation and conditional rendering."
        },
        {
            icon: FileText,
            title: "Markdown Made Better",
            description: "Enhances markdown generation with better syntax and seamless integration."
        },
        {
            icon: Component,
            title: "Component-based",
            description: "Import TS Markdown files as type-safe components."
        },
        {
            icon: Rocket,
            title: "Accelerated Development",
            description: "Built with Bun for blazingly fast iterative development and deployment."
        }
    ];
    const currentTheme = theme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)") ? 'dark' : 'light') : theme === 'dark' ? 'dark' : 'light';

    const quickLinks = [
        { href: '/overview', title: 'What is TS Markdown?', description: 'Learn about the enhanced TS Markdown experience' },
        { href: '/quick-start', title: 'Quick Start', description: 'Get up and running in minutes' },
        { href: '/first-tsm', title: 'Create Your First File', description: 'Build your first TS Markdown document' },
        { href: '/installation', title: 'Installation', description: 'Install and configure TS Markdown' }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Header */}
            <Header />

            <div className="flex flex-col items-center max-w-7xl">
                <div className="w-full pl-8 py-16">
                    <div className="grid lg:grid-cols-5 gap-6 items-center">
                        {/* Left side - Title and buttons */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h1 className="text-5xl font-bold tracking-tight mb-6">
                                    TS Markdown
                                </h1>
                                <p className="text-xl text-foreground/90 mb-8 font-light leading-relaxed">
                                    A type-safe, component based markdown engine. <br />
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild size="lg" className="text-lg px-8">
                                    <Link to="/quick-start" className="flex items-center justify-center">
                                        Get Started
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                                    <Link to="/overview" className="">
                                        Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right side - Code blocks */}
                        <div className="lg:col-span-3 lg:pl-2">
                            <div className="grid grid-cols-5 gap-4">
                                {/* TS Markdown Source */}
                                <div className="col-span-3 bg-gray-100/25 dark:bg-[#1e1e1e] rounded-lg p-4 shadow-2xl border border-gray-200 dark:border-neutral-900">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">HelloWorld.tsmd</span>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    {currentTheme === 'dark' ? (
                                        <pre className="text-xs overflow-x-auto leading-relaxed text-[#d4d4d4]" tabIndex={0}><code>
                                            <span className="line"><span className="text-[#569CD6]">import</span>
                                                <span className="text-[#d4d4d4]"> {`{`}</span><span className="text-[#DCDCAA]"> List </span><span className="text-[#d4d4d4]">{`}`}</span>
                                                <span className="text-[#569CD6]"> from</span><span className="text-[#CE9178]"> './List'</span>
                                                <span className="text-[#d4d4d4]">;</span></span>
                                            <br />
                                            <br />
                                            <span className="line"><span className="text-[#569CD6]">export</span><span className="text-[#569CD6]"> function</span>
                                                <span className="text-[#DCDCAA]"> HelloWorld</span><span className="text-[#d4d4d4]">(</span><span className="text-[#d4d4d4]">{`{`}</span><span className="text-[#9CDCFE]">features</span><span className="text-[#d4d4d4]">{`}`}</span><span className="text-[#569CD6]">:</span><span className="text-[#4EC9B0]"> Props</span></span><span className="text-[#d4d4d4]">)</span>
                                            <span className="text-[#d4d4d4]"> {`{`}</span>
                                            <br />
                                            <span className="line"><span className="text-[#569CD6]">  const</span><span className="text-[#9CDCFE]"> greeting</span><span className="text-[#569CD6]"> =</span><span className="text-[#CE9178]"> "Hello from TS Markdown!"</span><span className="text-[#d4d4d4]">;</span></span>
                                            <br />
                                            <br />
                                            <span className="line"><span className="text-[#569CD6]">  return</span><span className="text-[#d4d4d4]"> (</span></span>
                                            <br />
                                            <span className="line text-[#d4d4d4]">    # </span><span className="text-[#569CD6]">{`{{`}</span><span className="text-[#9CDCFE]"> greeting</span><span className="text-[#569CD6]"> {`}} `}</span>
                                            <br />
                                            <br />
                                            <span className="line"><span className="text-[#d4d4d4]">    Render markdown with</span><span className="text-[#569CD6]">:</span></span>
                                            <br />
                                            <span className="line"><span className="text-[#808080]">    &lt;@</span><span className="text-[#DCDCAA]">List</span>
                                                <span className="text-[#9CDCFE]"> items</span><span className="text-[#569CD6]">=</span><span className="text-[#569CD6]">{`{`}</span><span className="text-[#9CDCFE]">features</span><span className="text-[#569CD6]">{`}`}</span>
                                                <span className="text-[#808080]"> /&gt;</span></span>
                                            <br />
                                            <span className="line"><span className="text-[#d4d4d4]">  )</span></span>
                                            <br />
                                            <span className="line"><span className="text-[#d4d4d4]">{`}`}</span></span>
                                            <br /></code>
                                        </pre>
                                    ) : (
                                        <pre className="text-xs overflow-x-auto leading-relaxed text-[#333333]" tabIndex={0}><code>
                                            <span className="line"><span className="text-[#0000ff]">import</span>
                                                <span className="text-[#333333]"> {`{`}</span><span className="text-[#267f99]"> List </span><span className="text-[#333333]">{`}`}</span>
                                                <span className="text-[#0000ff]"> from</span><span className="text-[#a31515]"> './List'</span>
                                                <span className="text-[#333333]">;</span></span>
                                            <br />
                                            <br />
                                            <span className="line"><span className="text-[#0000ff]">export</span><span className="text-[#0000ff]"> function</span>
                                                <span className="text-[#267f99]"> HelloWorld</span><span className="text-[#333333]">(</span><span className="text-[#333333]">{`{`}</span><span className="text-[#001080]">features</span><span className="text-[#333333]">{`}`}</span><span className="text-[#0000ff]">:</span><span className="text-[#0451a5]"> Props</span></span><span className="text-[#333333]">)</span>
                                            <span className="text-[#333333]"> {`{`}</span>
                                            <br />
                                            <span className="line"><span className="text-[#0000ff]">  const</span><span className="text-[#001080]"> greeting</span><span className="text-[#0000ff]"> =</span><span className="text-[#a31515]"> "Hello from TS Markdown!"</span><span className="text-[#333333]">;</span></span>
                                            <br />
                                            <br />
                                            <span className="line"><span className="text-[#0000ff]">  return</span><span className="text-[#333333]"> (</span></span>
                                            <br />
                                            <span className="line text-[#333333]">    # </span><span className="text-[#333333]">{`{{`}</span><span className="text-[#001080]"> greeting</span><span className="text-[#333333]"> {`}} `}</span>
                                            <br />
                                            <br />
                                            <span className="line"><span className="text-[#333333]">    Render markdown with</span><span className="text-[#0000ff]">:</span></span>
                                            <br />
                                            <span className="line"><span className="text-[#800000]">    &lt;@</span><span className="text-[#267f99]">List</span>
                                                <span className="text-[#001080]"> items</span><span className="text-[#0000ff]">=</span><span className="text-[#333333]">{`{`}</span><span className="text-[#001080]">features</span><span className="text-[#333333]">{`}`}</span>
                                                <span className="text-[#800000]"> /&gt;</span></span>
                                            <br />
                                            <span className="line"><span className="text-[#333333]">  )</span></span>
                                            <br />
                                            <span className="line"><span className="text-[#333333]">{`}`}</span></span>
                                            <br /></code>
                                        </pre>
                                    )}
                                </div>

                                {/* Compiled Output */}
                                <div className="col-span-2 bg-white dark:bg-neutral-800/90 rounded-lg p-4 shadow-2xl border border-gray-200 dark:border-neutral-700 animate-float">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">HelloWorld.md</span>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-900 dark:text-gray-100 overflow-x-auto leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                                        <p># Hello from TS Markdown!</p>
                                        <br />
                                        <p>Render markdown with:</p>
                                        <ul>
                                            <li>- Type-safety</li>
                                            <li>- Reusable components</li>
                                            <li>- Fast development</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why use TS Markdown?</h2>
                        <p className="text-lg font-light text-foreground/90 max-w-2xl mx-auto">
                            Imagine if writing markdown felt more like <p className="text-lg! inline font-medium text-blue-500 dark:text-blue-300">Typescript</p>, <br />
                        </p>
                        <p className="mt-2 text-lg font-light text-foreground/90 max-w-2xl mx-auto">
                            And less like <code className="text-red-400 dark:text-red-300">f"""</code>, <code className="text-red-400 dark:text-red-300">`$&#123;&#125;`</code>, and <code className="text-red-400 dark:text-red-300">"\n\n"</code>?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                                            <IconComponent className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Get Started</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Jump into TS Markdown with these essential guides and tutorials.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {quickLinks.map((link, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow group">
                                <CardHeader>
                                    <CardTitle className="group-hover:text-primary transition-colors">
                                        {link.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {link.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link to={link.href}>
                                            Read More
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>


            </div>

            {/* Footer */}
            <div className="w-full px-4 py-6 border-t border-border/50">
                <div className="text-center text-muted-foreground">
                    <p className="text-sm">Made with ❤️ by Andrew</p>
                </div>
            </div>
        </div>
    );
}
