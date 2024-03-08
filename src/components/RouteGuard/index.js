import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function RouteGuard(props) {
  const { children } = props;
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  function authCheck(url) {
    const publicPaths = ["/"];

    const path = url.split("?")[0];

    if (
      !localStorage.getItem("token_festiapp_signin") &&
      !publicPaths.includes(path)
    ) {
      setAuthorized(false);
      router.push({ pathname: "/" });
    } else {
      setAuthorized(true);
    }
  }

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  return authorized && children;
}
