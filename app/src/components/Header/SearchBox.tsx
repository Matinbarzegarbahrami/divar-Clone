'use client';
import { useState, useEffect } from "react";

function SearchBox({searchTerm, setSearchTerm}: {searchTerm: string, setSearchTerm: (term: string) => void  }) {
    const [text, setText] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(text);
        
            return () => clearTimeout(delayDebounceFn)
        }, 500)
    }, [text])
  return (
    <>
      <input 
        type="text" 
        placeholder='جستجو در دیوار' 
        className='w-full h-10 rounded-sm bg-zinc-700 text-white/87 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-800' 
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  )
}

export default SearchBox
