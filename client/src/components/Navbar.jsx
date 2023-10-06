import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import { users } from '../utils/data';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../redux/userSlice';

function MenuList({ user, onClick }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace('/');
  };
  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div className="flex mr-20">
          <Menu.Button className="inline-flex gap-2 w-full max-w-xs rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20">
            <div className="leading-10 flex flex-col items-start">
              <p className="text-sm font-semibold">
                {user?.firstName ?? user?.name}
              </p>
              <span className="text-sm text-blue-600 ">
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            <img
              src={user?.profileUrl}
              alt="user profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <BiChevronDown
              className="h-8 w-8 text-slate-600"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none ">
            <div className="p-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? 'user-profile' : 'company-profile'
                    }`}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? 'text-white' : 'text-gray-600'
                      } mr-2 h-5 w-5  `}
                      aria-hidden="true"
                    />
                    {user?.accountType ? 'User Profile' : 'Company Profile'}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? 'text-white' : 'text-gray-600'
                      } mr-2 h-5 w-5  `}
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system',
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-schema: dark)');

  useEffect(() => {
    function onWindowMatch() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && darkQuery.matches)
      ) {
        element.classList.add('dark');
      } else {
        element.classList.remove('dark');
      }
    }

    onWindowMatch();

    darkQuery.addEventListener('change', (e) => {
      if (!('theme' in localStorage)) {
        if (e.matches) {
          element.classList.add('dark');
        } else {
          element.classList.remove('dark');
        }
      }
    });
  }, []);

  const options = [
    {
      icon: 'sunny-outline',
      text: 'light',
    },
    {
      icon: 'moon-outline',
      text: 'dark',
    },
    {
      icon: 'desktop-outline',
      text: 'system',
    },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  };

  return (
    <>
      <div className="relative bg-[#f7fdfd] z-50 dark:text-gray-100 dark:bg-slate-900 duration-100">
        <nav className="container mx-auto flex items-center justify-between p-5">
          <div>
            <Link to="/" className="text-blue-600 font-bold text-xl">
              Estagio<span className="text-[#1677cccb]">360</span>
            </Link>
          </div>

          <ul className="hidden lg:flex gap-10 text-base ml-60">
            <li>
              <Link to="/">Find Job</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link
                to={
                  user?.accountType === 'seeker'
                    ? '/applications'
                    : '/upload-job'
                }
              >
                {user?.accountType === 'seeker' ? 'Applications' : 'Upload Job'}
              </Link>
            </li>
            <li>
              <Link to="/about-us">About</Link>
            </li>
            <li>
              <div className="fixed top-8 right-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded flex space-x-2">
                {options?.map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => handleThemeChange(opt.text)}
                    className={`w-8 h-8 leading-9 text-x1 rounded-full ${
                      theme === opt.text && 'text-sky-600'
                    } ${
                      theme === 'light' && opt.text === 'dark'
                        ? 'text-gray-900 bg-white border border-gray-200'
                        : theme === 'dark' && opt.text === 'light'
                        ? 'text-white bg-gray-700 border border-gray-900'
                        : ''
                    }`}
                  >
                    <ion-icon name={opt.icon}></ion-icon>
                  </button>
                ))}
              </div>
            </li>
          </ul>

          <div className="hidden lg:inline-block ml-auto ml-30">
            {!user?.token ? (
              <Link to="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
                />
              </Link>
            ) : (
              <div>
                <MenuList user={user} />
              </div>
            )}
          </div>

          <button
            className="block lg:hidden text-slate-900 rounded"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <AiOutlineClose size={26} className="text-gray-100" />
            ) : (
              <HiMenuAlt3 size={26} />
            )}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? 'absolute flex bg-[#111] text-gray-100 rounded ' : 'hidden'
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5 `}
        >
          <Link to="/" onClick={() => setIsOpen(false)}>
            Find Job
          </Link>
          <Link to="/companies" onClick={() => setIsOpen(false)}>
            Companies
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to={
              user?.accountType === 'seeker' ? 'applly-gistory' : 'upload-job'
            }
          >
            {user?.accountType === 'seeker' ? 'Applications' : 'Upload Job'}
          </Link>
          <Link to="/about-us" onClick={() => setIsOpen(false)}>
            About
          </Link>

          <div className="w-30 h-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded">
            {options?.map((opt) => (
              <button
                key={opt.text}
                onClick={() => handleThemeChange(opt.text)}
                className={`w-8 h-8 leading-9 text-x1 rounded-full m-1 ${
                  theme === opt.text && 'text-sky-600'
                } ${
                  theme === 'light' && opt.text === 'dark'
                    ? 'text-gray-900 bg-white border border-gray-200'
                    : theme === 'dark' && opt.text === 'light'
                    ? 'text-white bg-gray-700 border border-gray-900'
                    : ''
                }`}
              >
                <ion-icon name={opt.icon}></ion-icon>
              </button>
            ))}
          </div>

          <div className="w-full py-10">
            {!user?.token ? (
              <a href="/user-auth">
                <CustomButton
                  title="Sign In"
                  containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                />
              </a>
            ) : (
              <div>
                <MenuList user={user} onClick={() => setIsOpen(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
