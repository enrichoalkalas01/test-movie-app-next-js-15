import Movies from "@/components/movies/movies";
import Search from "@/components/search/search";
import FeaturedMovies from "@/components/featured-movies/featured-movies";
import NewsLetter from "@/components/news-letter/news-letter";

export default function Home() {
    return (
        <div className="w-full py-4">
            <div className="w-full pt-4 pb-0">
                <FeaturedMovies />
            </div>
            <div className="w-full mb-4 pt-12 flex justify-center items-center gap-4">
                <Search />
            </div>
            <div className="w-full">
                <Movies />
            </div>
            <div className="w-full">
                <NewsLetter />
            </div>
        </div>
    );
}
