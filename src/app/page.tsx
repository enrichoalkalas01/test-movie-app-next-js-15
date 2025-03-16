"use client";

// Library
// import React, { useState } from "react";

// Components
import Movies from "@/components/movies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Supports

// Interfaces

export default function Home() {
    // const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <section
            className={cn(
                "w-full min-h-screen max-w-5xl mx-auto px-4 py-4"
                // "bg-[#0c0a09]"
            )}
        >
            <div className="w-full px-4 mb-4 flex gap-4">
                <Input className="rounded" />
                <Button
                    className="cursor-pointer rounded text-sm uppercase"
                    variant="secondary"
                >
                    Search
                </Button>
            </div>
            <div className="w-full">
                <Movies />
            </div>
        </section>
    );
}
