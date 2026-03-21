"use client"

import FeaturedContent from "./featured-content"
import FeaturedSlider from "./featured-slider"

export default function FeaturedMovie() {
    return (
        <div className="w-full flex flex-col md:flex-row gap-8 px-0 py-4">
            <div className="w-full md:w-2/5 flex items-center">
                <FeaturedContent />
            </div>
            <div className="w-full md:w-3/5">
                <FeaturedSlider />
            </div>
        </div>
    )
}
