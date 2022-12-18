import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function Search(props: any) {
    const [search, setSearch] = useState('');
    const onSubmit = (e: any) => {
        e.preventDefault();
        props.handleSearch(search);
    };
    return (
        <form className="relative flex-1" onSubmit={onSubmit}>
            <input
                className="input-search input-form !text-black"
                type="text"
                placeholder={props.placeholder}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-slate-100 hover:transition-all hover:rounded-full hover:cursor-pointer"
            >
                <AiOutlineSearch className="text-2xl !text-black" />
            </button>
        </form>
    );
}

export default Search;
