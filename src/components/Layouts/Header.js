import { Link } from "react-router-dom"
import { Search } from "../index";
import Logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { DropdownLoggedIn,DropdownLoggedOut } from "../index";
import { useCart } from "../../context";

export const Header = () => {

    const { cartList } = useCart();

    const[darkMod, setDarkMod] = useState(JSON.parse(localStorage.getItem("darkMod")) || false);
    const [dropdown, setDropDown] = useState(false);

    const token = JSON.parse(sessionStorage.getItem("token"));
    
    useEffect(()=>{

        if(darkMod){
            // remove class
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
            // add class
        }

        localStorage.setItem("darkMod",JSON.stringify(darkMod));

    },[darkMod])

    const [showSearch, setShowSearch] = useState(false);

    return (
      <header>      
          <nav className="bg-white dark:bg-gray-900">
              <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
                  <Link to="/" className="flex items-center">
                      <img src={ Logo } className="mr-3 h-10" alt="CodeBook Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ebook Store</span>
                  </Link>
                  <div className="flex items-center relative">
                      <span onClick={ ()=>setDarkMod(!darkMod)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
                      <span onClick={()=> setShowSearch(!showSearch) } className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"></span>
                      <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
                      <span className="text-2xl bi bi-cart-fill relative">
                          <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span>
                      </span>                    
                      </Link>
                      <span onClick={() => setDropDown(!dropdown)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
                      { dropdown && (token ? <DropdownLoggedIn setDropDown={setDropDown}/> : <DropdownLoggedOut setDropDown={setDropDown} />)}
                  </div>
              </div>
          </nav>
          { showSearch && <Search />}
      </header>
    )
  }