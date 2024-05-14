'use client'
import { FormEvent } from 'react';
import { usePetSearchContext } from '@/lib/hooks';

const Searchform = () => {
    const { searchQuery, handleSrachState } = usePetSearchContext();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Since you're handling state in context API, you don't need to update it here
        // Just prevent the default form submission behavior
    };

    return (
        <form className="w-full h-full" onSubmit={handleSubmit}>
            <input
                type="text"
                className="w-full h-full bg-white/20 outline-none text-lg  px-5"
                placeholder="search your pet ..."
                value={searchQuery}
                onChange={(e) => handleSrachState(e.target.value)}
            />
        </form>
    );
};

export default Searchform;
