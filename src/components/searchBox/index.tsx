import { useNavigate, useParams } from 'react-router-dom';
import './style.css'
import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react'

export default function SearchButton() {
  
    //          state: 검색어 버튼 요소 참소 상태           //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    //          state: 검색어 상태          //
    const [word, setWord] = useState<string>('');
    //          state: 검색어 path variable 상태          //
    const {searchWord} = useParams();

     //          function: 네비게이트 함수           //
    const navigator = useNavigate();

    //          event handler: 검색어 변경 이벤트 처리 함수          //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setWord(value);
    }
    //          event handler: 검색어 키 이벤트 처리 함수           //
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        if(!searchButtonRef.current) return;
        searchButtonRef.current.click();
    }
    //          event handler: 검색 버튼 클릭 이벤트 처리 함수          //
    const onSearchButtonClickHandler = () => {
        if (!word) return;
        // 검색어를 URL에 반영
        navigator(`/main/search/${word}`);
    }

    //          effect: 검색어 path variable 변경될 때마다 실행된 함수         //
    useEffect(() => {
        if (searchWord) {
            setWord(searchWord);
        }
    }, [searchWord])
    

    //          render: 검색 버튼 컴포넌트 랜더링 (클릭 true 상태)           //
    return (
        <div className='search-input-box'>
            <input className='search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} />
            <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
                <div className='icon search-light-icon'></div>
            </div>
        </div>
    )
}
