import { useCallback, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/app/hooks';
import { fetchProductAsync } from '~/features/product/productSlice';
import { Debounce } from '~/utils/Debouce';
function Search(props: any) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const onSubmit = (e: any) => {
        e.preventDefault();
        const inputElement = inputRef.current as any;
        const keyword: any = inputElement.value;
        if (keyword.trim() !== '') {
            dispatch(fetchProductAsync({ page: 0, name: keyword }));
            navigate(`/search?keyword=${keyword}`);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (location.pathname === '/search' || location.pathname === '/category') {
            dispatch(fetchProductAsync({ page: 0, name: value }));
            navigate(`/search?keyword=${value}`);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(Debounce(handleSearch, 1000), []);

    return (
        <form className="relative flex-1" onSubmit={onSubmit}>
            <input type="submit" hidden />

            <input
                ref={inputRef}
                className="input-search input-form !text-black"
                type="text"
                placeholder={props.placeholder}
                onChange={debounceSearch}
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
