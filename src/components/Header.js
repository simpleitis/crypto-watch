import React from 'react';

function Header() {
  return (
    <div className="col-span-12 drop-shadow-md">
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-1 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-5 max-w-screen-xl">
            <a href="https://flowbite.com" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-2 h-6 sm:h-9"
                alt="Logo"
              />
              <span className="self-center text-2xl font-extrabold  whitespace-nowrap ">
                Crypto Watch
              </span>
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
