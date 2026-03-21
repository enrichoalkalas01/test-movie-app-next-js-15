import { Sparkles } from "lucide-react";

export default function FeaturedContent() {
    return (
        <div className="w-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Featured
                </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                Best Movie Highlights <br className="hidden md:block" />
                <span className="text-muted-foreground">for You</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Explore top picks straight from the OMDB database — complete with ratings, synopses, and critic reviews. Find your next watch today.
            </p>
        </div>
    )
}
