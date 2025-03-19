import { create } from "zustand";

import { IPropsSelect } from "@/lib/interfaces";

interface IUseSearchBar {
    query: string;
    setQuery: (value: string) => void;

    typeMovieAvailable: IPropsSelect[],
    setTypeMovieAvailable: (value: IPropsSelect[]) => void;

    yearsMovieAvailable: IPropsSelect[],
    setYearsMovieAvailable: (value: IPropsSelect[]) => void;

    typeSelected: string;
    setTypeSelected: (value: string) => void;

    yearsSelected: string;
    setYearsSelected: (value: string) => void;
}

export const useSearchBar = create<IUseSearchBar>((set) => {
    return {
        query: "avengers",
        setQuery: (value: string) => set({ query: value }),
        
        typeMovieAvailable: [],
        setTypeMovieAvailable: (value: IPropsSelect[]) => set({ typeMovieAvailable: value }),

        yearsMovieAvailable: [],
        setYearsMovieAvailable: (value: IPropsSelect[]) => set({ yearsMovieAvailable: value }),

        typeSelected: "",
        setTypeSelected: (value: string) => set({ typeSelected: value }),

        yearsSelected: "",
        setYearsSelected: (value: string) => set({ yearsSelected: value }),
    };
});
