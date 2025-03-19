"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function NewsLetter() {
    return(
        <>
            <section className="container mx-auto mt-16 mb-16">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Want to know more ?</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Subscribe to our newsletter to receive updates on new products and special offers.
                    </p>
                    <div className="flex flex-col space-y-4 max-w-md mx-auto">
                        <Input placeholder="Email" className="rounded" />
                        <Input placeholder="Name" className="rounded" />
                        <Button className="bg-black text-white hover:bg-gray-800 rounded">Send</Button>
                    </div>
                </div>
            </section>
        </>
    )
}