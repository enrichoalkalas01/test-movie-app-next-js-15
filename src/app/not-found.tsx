import Link from "next/link";
import { Film, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
                <Film className="w-8 h-8 text-muted-foreground" />
            </div>

            <h1 className="text-6xl font-bold mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-3">Page Not Found</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-8">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className="flex gap-3">
                <Button asChild variant="default" className="gap-2 cursor-pointer">
                    <Link href="/">
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2 cursor-pointer">
                    <Link href="/#search">
                        <Search className="w-4 h-4" />
                        Browse Movies
                    </Link>
                </Button>
            </div>
        </div>
    );
}
