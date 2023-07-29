import { useEffect, useState } from "react";

export function Footer() {
  const [experimentalModePath, setExperimentalModePath] = useState("");
  useEffect(() => {
    const url = new URL(location.href);
    url.searchParams.set("experimental", "");
    setExperimentalModePath(url.href);
  }, []);
  return (
    <footer>
      <hr />
      <div className="text-center">
        <p className="mb-2">
          <a className="underline" href="https://hello.sn-10.net">
            sn-10.net
          </a>
        </p>
        <a
          className="underline text-sm text-secondary"
          href={experimentalModePath}
        >
          試験的機能の有効化
        </a>
      </div>
    </footer>
  );
}
