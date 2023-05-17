import { useState, useEffect } from "react";

function useMebelToken() {
  const [mebelToken, setMebelToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const userData = window.localStorage.getItem("mebel_user");
    if (userData !== null) {
      setMebelToken(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mebel_user", JSON.stringify(mebelToken));
  }, [mebelToken]);
  return { mebelToken, setMebelToken, isLoading };
}

export default useMebelToken;
