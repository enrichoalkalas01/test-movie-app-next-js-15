"use client"

import React, { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsLetter() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address.", { position: "top-right" });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address.", { position: "top-right" });
            return;
        }

        setLoading(true);
        // Simulate async subscription
        setTimeout(() => {
            toast.success("You're subscribed! Thanks for joining.", { position: "top-right" });
            setEmail("");
            setName("");
            setLoading(false);
        }, 800);
    };

    return (
        <section className="w-full mt-12 mb-8">
            <div className="w-full bg-muted/50 border border-border rounded-2xl px-6 py-10 text-center max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                    Subscribe to get updates on new releases, top picks, and curated movie recommendations.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
                    <Input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-lg bg-background"
                    />
                    <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-lg bg-background"
                        required
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg cursor-pointer font-semibold"
                    >
                        {loading ? "Subscribing..." : "Subscribe"}
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
            </div>
        </section>
    );
}
