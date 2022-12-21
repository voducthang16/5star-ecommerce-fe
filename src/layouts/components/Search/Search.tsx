import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { searchProductAsync } from '~/features/product/productSlice';
function Search(props: any) {
    const dispatch = useAppDispatch();
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const onSubmit = (e: any) => {
        e.preventDefault();
        const inputElement = inputRef.current as any;
        const keyword: any = inputElement.value;
        if (keyword.trim() !== '') {
            dispatch(searchProductAsync(keyword));
            navigate(`/search?keyword=${keyword}`);
        }
    };

    return (
        <form className="relative flex-1" onSubmit={onSubmit}>
            <input type="submit" hidden />

            <input
                ref={inputRef}
                className="input-search input-form !text-black"
                type="text"
                placeholder={props.placeholder}
                // onChange={(e) => setSearch(e.target.value)}
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
