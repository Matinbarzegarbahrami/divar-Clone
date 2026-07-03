'use client';

import { useEffect, useState } from 'react';
import {
    ArrowDown,
    BookMarked,
    CircleQuestionMark,
    Home,
    MessageCircle,
    PlusCircle,
    User,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import SearchBox from './SearchBox';
import Buttons from '../Buttons';
import CitySelector from '../modal/HeaderModal';
import Link from 'next/link';
import { useRegisterModal } from '@/app/src/store/registerModal';
import Modal from '../registermodal/Modal';

type UserType = {
    phone?:string;
    id?:string;
}

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openNav, setOpenNav] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<UserType>({})
    const pathname = usePathname();
    const isSearchPage = pathname.startsWith('/s');
    const { isOpen, changeIsOpen } = useRegisterModal();
    useEffect(()=>{
        const user = async() => {
            try{
                const data = await fetch('/api/profile')
                if(!data){
                    return
                }
                const res = await data.json()
                setUser(res.user)
            } catch (err){
                return console.error("asdasd")
            }
        } 
        user()
    },[])
    return (
        <header className="h-16 border-b border-zinc-800 bg-background px-4">
            <nav className="hidden md:flex mx-auto h-full items-center gap-4">
                <div className="flex shrink-0 items-center">
                    <Link href={"/"} className="px-4 text-3xl font-semibold text-primary">دیوار</Link>
                    <div className="h-4 border-l border-zinc-700" />
                    <CitySelector
                        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-white/85 hover:bg-zinc-800 transition-colors"
                        iconSize={18}
                        showArrow={true}
                    />
                </div>

                <div className="flex flex-1 items-center gap-2">
                    {isSearchPage && (
                        <>
                            <Buttons text="دسته بندی" icon={<ArrowDown size={18} />} />
                            <div className="w-full max-w-3xl">
                                <SearchBox
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <div className='relative z-9999'>
                        <Buttons
                            text="دیوار من"
                            icon={<User size={18} />}
                            onClick={() => setOpenNav(prev => !prev)}
                        />
                        {openNav ?
                            <>
                                <div className='absolute top-full'>
                                    <ul className="w-40 rounded-md border border-zinc-800 bg-zinc-800 text-sm text-white/85 shadow-[0_0px_8px_rgba(255,255,255,0.1)] p-2 z-50">
                                        {user ?

                                            <>
                                                <li >{user.phone}</li>
                                                <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"><Link href={'my-divar'}>داشبورد</Link></li>
                                                <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"><Link href={''}>نشان ها</Link></li>
                                                <li className="px-4 py-2  hover:bg-zinc-800 cursor-pointer"><Link href={''}>تنظیمات</Link></li>
                                            </>
                                            :
                                            <>
                                                <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"><button onClick={() => changeIsOpen(!isOpen)}>ورود</button></li>
                                                <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"><Link href={''}>نشان ها</Link></li>
                                                <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer"><Link href={''}>تنظیمات</Link></li>
                                            </>
                                        }</ul>
                                </div>
                            </> : null}
                    </div>
                    <Buttons text="چت" icon={<MessageCircle size={18} />} />
                    <Buttons text="پشتیبانی" icon={<CircleQuestionMark size={18} />} />
                    <Link href={'new'} className="mr-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                        ثبت آگهی
                    </Link>
                </div>
            </nav>

            <nav className="flex md:hidden flex-col h-full justify-center items-center">
                <div className="flex w-full rounded-sm bg-zinc-700 text-white/87 px-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-800">
                    <div className="flex-1">
                        <SearchBox
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                    <div className="h-8 my-auto w-0.5 bg-zinc-400/5 mx-3"></div>
                    <CitySelector
                        className="flex shrink-0 items-center gap-1 rounded-md px-3 py-2 text-sm text-white/85"
                        iconSize={16}
                        showArrow={false}
                    />
                </div>

                {/* Bottom navigation */}
                <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center bg-zinc-700 h-12 justify-around border-t border-zinc-800 z-50">
                    <Buttons text="آگهی ها" icon={<Home size={18} />} isMobile={true} />
                    <Buttons text="نشان ها" icon={<BookMarked size={18} />} isMobile={true} />
                    <Link href={'new'}><PlusCircle size={18} /> ثبت آگهی</Link>
                    <Buttons text="چت" icon={<MessageCircle size={18} />} isMobile={true} />
                    <div className="relative z-9999">
                        <Buttons
                            text="دیوار من"
                            icon={<User size={18} />}
                            isMobile={true}
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                        />
                        {mobileMenuOpen && (
                            <div className="absolute bottom-full mb-2 left-[-20px]">
                                <ul className="w-40 rounded-md border border-zinc-800 bg-zinc-700 p-3 text-sm text-white/85 shadow-[0_0px_8px_rgba(255,255,255,0.1)]">
                                    {!user ? (
                                        <>
                                            <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer">
                                                <button onClick={() => changeIsOpen(!isOpen)}>داشبورد</button>
                                            </li>
                                            <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer">
                                                <Link href={''}>نشان ها</Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
                                                <Link href={''}>تنظیمات</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                                <li >{user.phone}</li>
                                                <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer"><Link href={'my-divar'}>داشبورد</Link></li>
                                            <li className="px-4 py-2 border-b border-zinc-700 hover:bg-zinc-800 cursor-pointer">
                                                <Link href={''}>نشان ها</Link>
                                            </li>
                                            <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
                                                <Link href={''}>تنظیمات</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            {isOpen ? <Modal isOpen={isOpen} onClose={changeIsOpen} /> : null}
        </header >
    );
};

export default Header;