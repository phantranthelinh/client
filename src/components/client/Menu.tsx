/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { navList } from "@/data";
import { Category } from "@/models/category";
import { Link } from "@tanstack/react-router";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const Menu = ({
  showCatMenu,
  setShowCatMenu,
  categories,
}: {
  showCatMenu: boolean;
  setShowCatMenu: any;
  categories: Category[];
}) => {
  return (
    <ul className="md:flex items-center gap-8 hidden font-medium text-black">
      {navList.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="relative flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item?.name}
                <BsChevronDown size={14} />

                {showCatMenu && categories && (
                  <ul className="top-6 left-0 absolute bg-white shadow-lg px-1 py-1 min-w-[250px] text-black">
                    {categories.map((category) => {
                      return (
                        <Link
                          key={category._id}
                          href={`/category/${category.slug}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="flex justify-between items-center hover:bg-black/[0.03] px-3 rounded-md h-12">
                            {category?.name}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
