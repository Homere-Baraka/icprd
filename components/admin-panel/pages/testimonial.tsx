import React from 'react';
import { Search, Plus, Star, Quote } from 'lucide-react';

export default function Testimonial() {
    const testimonials = [
        {
            id: 1,
            rating: 5,
            content:
                '"This product completely transformed our workflow. Highly recommended!"',
            name: 'Sarah Connor',
            company: 'TechCorp',
            status: 'Published',
        },
        {
            id: 2,
            rating: 5,
            content:
                '"The attention to detail and design quality is unmatched."',
            name: 'Michael Chang',
            company: 'DesignStudio',
            status: 'Published',
        },
        {
            id: 3,
            rating: 4,
            content:
                '"Good service, but there\'s room for improvement in response times."',
            name: 'Emma Watson',
            company: 'Global AI',
            status: 'Pending',
        },
    ];

    const StarRating = ({ rating }: { rating: number }) => {
        return (
            <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        fill={index < rating ? 'currentColor' : 'none'}
                        size={20}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background p-10 font-sans text-text-main">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Testimonials</h1>
                    <p className="text-text-muted mt-1">
                        Manage client reviews and feedback.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                    <Plus size={20} />
                    Add Testimonial
                </button>
            </div>

            {/* Toolbar - Search Bar */}
            <div className="relative flex-1 max-w-sm mb-10">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Search authors or content..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="relative bg-card p-8 rounded-2xl border border-card-border shadow-sm flex flex-col justify-between hover:border-blue-100 transition-all group"
                    >
                        {testimonial.status === 'Pending' && (
                            <span className="absolute -top-3 -right-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                                Pending
                            </span>
                        )}

                        <div className="flex justify-between items-start mb-6">
                            <StarRating rating={testimonial.rating} />
                            <Quote
                                className="text-blue-100 rotate-180 group-hover:text-blue-200 transition-colors"
                                size={40}
                            />
                        </div>

                        <p className="text-text-muted text-lg leading-relaxed flex-grow mb-10 font-medium">
                            {testimonial.content}
                        </p>

                        <div className="border-t border-card-border pt-6">
                            <p className="font-semibold text-text-main">
                                {testimonial.name}
                            </p>
                            <p className="text-sm text-slate-500">
                                {testimonial.company}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
