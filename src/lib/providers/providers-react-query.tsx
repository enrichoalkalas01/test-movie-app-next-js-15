"use client";

import * as React from "react";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ProvidersTanstackQuery({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
            {children}
        </QueryClientProvider>
    );
}
