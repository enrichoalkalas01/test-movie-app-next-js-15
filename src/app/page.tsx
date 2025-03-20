// Components
import Movies from "@/components/movies/movies";
import Search from "@/components/search/search";
import FeaturedMovies from "@/components/featured-movies/featured-movies";
import NewsLetter from "@/components/news-letter/news-letter";

// Supports
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <>
            <section
                className={cn(
                    "w-full min-h-screen max-w-5xl mx-auto lg:px-4 lg:py-4",
                )}
            >
                <div className="w-full lg:pt-8 pb-0">
                    <FeaturedMovies />
                </div>
                <div className="w-full px-4 mb-4 pt-12 flex justify-center items-center gap-4">
                    <Search />
                </div>
                <div className="w-full">
                    <Movies />
                </div>
                <div className="w-full px-4 md:px-0">
                    <NewsLetter />
                </div>
            </section>
        </>
    );
}
