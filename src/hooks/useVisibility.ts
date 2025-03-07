import { useState } from "react";

const useVisibility = (initialVisibility: boolean = false) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return { isVisible, toggleVisibility, setIsVisible };
};

export default useVisibility;
