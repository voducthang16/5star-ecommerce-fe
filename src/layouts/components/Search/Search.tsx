import { AiOutlineSearch } from 'react-icons/ai';

function Search() {
    return (
        <form className="relative flex-1">
            <input className="input-search input-form" type="text" placeholder="Type to search" />
            <div className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-slate-100 hover:transition-all hover:rounded-full hover:cursor-pointer">
                <AiOutlineSearch className="text-2xl" />
            </div>
        </form>
    );
}

export default Search;
