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
            title: "Component-style Architecture",
            description: "Import TS Markdown files as components, with type-safe props and children."
        },
        {
            icon: Rocket,
            title: "Fast & Modern",
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
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold tracking-tight mb-6">
                            TS Markdown
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            A type-safe, component based markdown engine. <br />

                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="text-lg px-8">
                                <Link to="/quick-start">
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8">
                                <Link to="/overview">
                                    Learn More
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why TS Markdown?</h2>
                        <p className="text-lg font-light text-foreground/90 max-w-2xl mx-auto">
                            What if writing markdown felt more like TypeScript? <br />
                        </p>
                        <p className="mt-2 text-lg font-light text-foreground/90 max-w-2xl mx-auto">
                            And less like <code>f"""</code>, <code>$&#123;&#125;</code>, and <code>"\n\n"</code>?
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
