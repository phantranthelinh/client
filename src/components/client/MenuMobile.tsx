/* eslint-disable @typescript-eslint/no-explicit-any */
import { navList } from "@/data";
import { Category } from "@/models/category";
import { Link } from "@tanstack/react-router";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}: {
  showCatMenu: boolean;
  setShowCatMenu: any;
  setMobileMenu: any;
  categories: Category[];
}) => {
  return (
    <ul className="top-[50px] left-0 absolute flex flex-col md:hidden bg-white border-t w-full h-[calc(100vh-50px)] font-bold text-black">
      {navList.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {item?.subMenu ? (
              <li
                className="relative flex flex-col px-5 py-4 border-b cursor-pointer"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>

                {showCatMenu && (
                  <ul className="bg-black/0.05 -mx-5 mt-4 mb-4">
                    {categories?.map((category) => {
                      return (
                        <Link
                          key={category._id}
                          href={`/category/${category.slug}`}
                          onClick={() => {
                            setShowCatMenu(false);
                            setMobileMenu(false);
                          }}
                        >
                          <li className="flex justify-between px-8 py-4 border-t">
                            {category.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="px-5 py-4 border-b">
                <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MenuMobile;
