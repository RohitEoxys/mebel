import { useEffect } from "react";

function clickOutsideToFalseDrop(ref, callback, openDropdown) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!openDropdown && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
export default clickOutsideToFalseDrop;
