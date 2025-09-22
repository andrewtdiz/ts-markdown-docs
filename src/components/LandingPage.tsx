import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, FileText, Component, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';

export function LandingPage() {
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
                <div className="px-4 py-16">
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
                                    <Link to="/overview" className="bg-white dark:bg-black">
                                        Learn More
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Right side - Code blocks */}
                        <div className="lg:col-span-3 lg:pl-2">
                            <div className="grid grid-cols-5 gap-4">
                                {/* TS Markdown Source */}
                                <div className="col-span-3 bg-gray-100/25 dark:bg-gray-900 rounded-lg p-4 shadow-2xl border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">HelloWorld.tsmd</span>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    <pre className="text-xs overflow-x-auto leading-relaxed text-purple-600" tabIndex={0}><code>
                                        <span className="line"><span className="dark:text-red-400 text-red-700">import</span>
                                            <span className="dark:text-purple-400 text-purple-600"> {`{`}</span><span className="dark:text-amber-400 text-amber-600 font-bold"> List </span><span className="dark:text-purple-400 text-purple-600">{`}`}</span>
                                            <span className="dark:text-red-400 text-red-700"> from</span><span className="dark:text-pink-300 text-pink-600"> './List'</span>
                                            <span className="dark:text-purple-400 text-purple-600">;</span></span>
                                        <br />
                                        <br />
                                        <span className="line"><span className="dark:text-emerald-500 text-emerald-700">export</span><span className="dark:text-emerald-500 text-emerald-700"> function</span>
                                            <span className="dark:text-amber-400 text-amber-600 font-bold"> HelloWorld</span><span className="dark:text-purple-400 text-purple-600">(</span><span className="dark:text-purple-400 text-purple-600">{`{`}</span><span className="dark:text-foreground text-foreground">features</span><span className="dark:text-purple-400 text-purple-600">{`}`}</span><span className="dark:text-red-400 text-red-700">:</span><span className="dark:text-purple-400 text-purple-600"> Props</span></span><span className="dark:text-purple-400 text-purple-600">)</span>
                                        <span className="dark:text-yellow-400 text-yellow-700"> {`{`}</span>
                                        <br />
                                        <span className="line"><span className="dark:text-red-400 text-red-700">  const</span><span className="dark:text-purple-400 text-purple-600"> greeting</span><span className="dark:text-red-400 text-red-700"> =</span><span className="dark:text-pink-300 text-pink-600"> "Hello from TS Markdown!"</span><span className="dark:text-purple-400 text-purple-600">;</span></span>
                                        <br />
                                        <br />
                                        <span className="line"><span className="dark:text-red-400 text-red-700">  return</span><span className="dark:text-purple-400 text-purple-600"> (</span></span>
                                        <br />
                                        <span className="line text-foreground font-bold">    # </span><span className="dark:text-blue-400 text-blue-700">{`{{`}</span><span className="dark:text-purple-400 text-purple-600"> greeting</span><span className="dark:text-blue-400 text-blue-700"> {`}} `}</span>
                                        <br />
                                        <br />
                                        <span className="line"><span className='text-foreground'>    Render markdown with</span><span className="dark:text-red-400 text-red-700">:</span></span>
                                        <br />
                                        <span className="line"><span className="dark:text-amber-400/75 text-amber-600/75">    &lt;@</span><span className="dark:text-amber-400 text-amber-600 font-bold">List</span>
                                        <span className="italic dark:text-purple-400 text-purple-600"> items</span><span className="dark:text-red-400 text-red-700">=</span><span className="dark:text-blue-400 text-blue-700">{`{`}</span><span className="dark:text-foreground text-foreground">features</span><span className="dark:text-blue-400 text-blue-700">{`}`}</span>
                                        <span className="dark:text-amber-400/75 font-light! text-amber-600/75"> /&gt;</span></span>
                                        <br />
                                        <span className="line"><span className="dark:text-purple-400 text-purple-600">  )</span></span>
                                        <br />
                                        <span className="line"><span className="dark:text-yellow-400 text-yellow-700">{`}`}</span></span>
                                        <br /></code>
                                    </pre>
                                </div>

                                {/* Compiled Output */}
                                <div className="col-span-2 bg-white dark:bg-gray-800/90 rounded-lg p-4 shadow-2xl border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">HelloWorld.md</span>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-900 dark:text-gray-100 overflow-x-auto leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                                        <h1>Hello from TS Markdown!</h1>
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
                            What if writing markdown felt more like <p className="text-lg! inline font-medium text-blue-500 dark:text-blue-300">Typescript</p>, <br />
                        </p>
                        <p className="mt-2 text-lg font-light text-foreground/90 max-w-2xl mx-auto">
                            And less like <code className="text-red-400 dark:text-red-300">f"""</code>, <code className="text-red-400 dark:text-red-300">$&#123;&#125;</code>, and <code className="text-red-400 dark:text-red-300">"\n\n"</code>?
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

                {/* Footer */}
                <div className="container mx-auto px-4 py-8 border-t">
                    <div className="text-center text-muted-foreground">
                        <p className="text-sm">Built with TS Markdown • Powered by Bun • Enhanced with React</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
