import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CoffeeShopHomepage() {
    return (
        <div className="min-h-screen bg-white">
        {/* Header Navigation */}
        <header className="container mx-auto py-4 flex justify-between items-center">
            <div className="flex items-center">
            <div className="border border-gray-300 p-1 mr-2">
                <span className="font-semibold text-xs">Sweater</span>
                <span className="text-xs block">weather</span>
            </div>
            </div>
            <nav className="hidden md:block">
            <div className="text-gray-400 text-sm">0.2 Homepage</div>
            </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto mt-8">
            <Card className="border-0 shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-2">Talking about coffee, what's your opinion?</h1>
                <p className="text-gray-600 text-sm mb-4">Is it a useful lubricant or a dangerous stimulant?</p>
                <Button variant="outline" className="w-24 rounded-none">Shop now</Button>
                
                <div className="flex space-x-4 mt-8">
                    <span className="text-xs text-gray-800">Coffee</span>
                    <span className="text-xs text-gray-400">Tea</span>
                    <span className="text-xs text-gray-400">Plants</span>
                    <span className="text-xs text-gray-400">Blogs</span>
                    <span className="text-xs text-gray-400">Newsletter</span>
                </div>
                </div>
                <div className="md:w-1/2 bg-black relative h-64 md:h-auto">
                <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
                    <img src="/api/placeholder/400/400" alt="Coffee cup and lid" className="h-64 w-64 object-contain" />
                </div>
                </div>
            </div>
            </Card>
        </section>

        {/* Signature Blend Section */}
        <section className="container mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6">Signature blend.</h2>
            <p className="text-gray-600 max-w-2xl mb-8 text-sm">
            Placeholder text for the signature blend section. Discover our perfect coffee blends that satisfy all taste preferences. Each 
            blend is carefully selected, roasted and packaged to ensure the best quality.
            </p>
            
            <div className="relative">
            <div className="flex overflow-x-auto space-x-4 pb-8">
                {[
                { name: "themoon", icon: "☁️" },
                { name: "thesun", icon: "☀️" },
                { name: "therain", icon: "☂️" }
                ].map((product, index) => (
                <Card key={index} className="min-w-[280px] border-0 bg-black text-white overflow-hidden">
                    <div className="p-4 flex flex-col items-center">
                    <img src="/api/placeholder/200/200" alt={product.name} className="mb-6 w-40 h-40 object-contain" />
                    <div className="flex items-center space-x-2">
                        <span className="text-white">{product.name}</span>
                        <span>{product.icon}</span>
                    </div>
                    <div className="mt-2 flex">
                        {"★★★★☆".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                        ))}
                    </div>
                    </div>
                </Card>
                ))}
            </div>
            
            <div className="absolute right-0 bottom-0 flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-black">
                &lt;
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-black">
                &gt;
                </Button>
            </div>
            </div>
        </section>

        {/* House Blend Section */}
        <section className="container mx-auto mt-16">
            <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-8">
                <h2 className="text-2xl font-bold mb-6">The House Blend.</h2>
                <p className="text-gray-600 mb-4 text-sm">
                Discover our best sellers and our selection for every taste. All blends feature 
                the highest quality beans, roasted to perfection to bring out their unique flavor profiles.
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                Our coffee experts carefully select beans from sustainable farms around the world. 
                Each batch is roasted in small quantities to ensure freshness and optimal flavor.
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                Whether you prefer a bold espresso or a smooth, mellow brew, our house blends offer 
                something for everyone.
                </p>
                <Button variant="outline" className="w-24 rounded-none mt-4">Shop now</Button>
            </div>
            
            <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                <Card className="border shadow-md w-80">
                <div className="flex flex-col items-center p-8">
                    <img src="/api/placeholder/200/300" alt="themoon coffee bag" className="h-64 object-contain mb-4" />
                    <div className="text-center">
                    <h3 className="text-xl mb-1">themoon</h3>
                    <div className="flex flex-col space-y-2 items-center">
                        <div className="flex justify-between w-full">
                        <span>Flavor</span>
                        <span>Caramel</span>
                        </div>
                        <div className="flex justify-between w-full">
                        <span>Intensity</span>
                        <div>{"★★★★☆".split("").map((star, i) => (
                            <span key={i}>{star}</span>
                        ))}</div>
                        </div>
                    </div>
                    </div>
                </div>
                </Card>
            </div>
            </div>
        </section>

        {/* Medium Roast Section */}
        <section className="container mx-auto mt-16">
            <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <div className="bg-black p-6 inline-block">
                <img src="/api/placeholder/250/350" alt="therain coffee bag" className="h-64 object-contain" />
                <div className="text-white mt-4">
                    <div className="mb-2">
                    <span>Flavor</span>
                    <span className="block text-gray-400">Caramel | Intensity</span>
                    </div>
                    <div>
                    {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                    ))}
                    </div>
                    <div className="mt-2">
                    <span>therain</span>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
                <h2 className="text-2xl font-bold mb-6">Medium Roast.</h2>
                <p className="text-gray-600 mb-4 text-sm">
                Medium roast coffees are characterized by their even balance of acidity and body. 
                These coffees have a moderate level of intensity but offer complex flavor profiles 
                that appeal to a wide range of coffee drinkers.
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                Our medium roasts bring out the natural sweetness of the beans while preserving 
                the unique characteristics that make each origin special.
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                Perfect for any time of day, medium roast coffee offers a satisfying experience 
                without overwhelming the palate.
                </p>
                <Button variant="outline" className="w-24 rounded-none mt-4">Shop now</Button>
            </div>
            </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto mt-16 mb-16">
            <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Newsletter</h2>
            <p className="text-gray-600 mb-6 text-sm">
                Subscribe to our newsletter to receive updates on new products and special offers.
            </p>
            <div className="flex flex-col space-y-4 max-w-md mx-auto">
                <Input placeholder="Email" className="rounded-none" />
                <Input placeholder="Name" className="rounded-none" />
                <Button className="bg-black text-white hover:bg-gray-800 rounded-none">Send</Button>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto py-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
                © Copyright Sweater Weather • 2023
            </div>
            
            <div className="flex space-x-4">
                <span className="text-xs text-gray-800">Coffee</span>
                <span className="text-xs text-gray-400">Tea</span>
                <span className="text-xs text-gray-400">Plants</span>
                <span className="text-xs text-gray-400">Blogs</span>
                <span className="text-xs text-gray-400">Newsletter</span>
            </div>
            
            <div className="flex space-x-4">
                <span>📍</span>
                <span>📷</span>
                <span>📱</span>
            </div>
            </div>
        </footer>
        </div>
    );
}