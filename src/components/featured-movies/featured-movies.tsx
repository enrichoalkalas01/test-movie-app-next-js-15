"use client"

// Components
import FeaturedContent from "./featured-content"
import FeaturedSlider from "./featured-slider"

export default function FeaturedMovie() {
    return(
        <>
            <div className="w-full md:flex md:flx-row px-4 pt-4 md:py-10 gap-6">
                <div className="w-full md:w-1/2">
                    <FeaturedContent />
                </div>
                <div className="w-full md:w-1/2">
                    <FeaturedSlider />
                </div>
            </div>
        </>
    )
}