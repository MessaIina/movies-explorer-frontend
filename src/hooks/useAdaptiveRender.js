import { useEffect, useState } from "react";

export function useAdaptiveRender() {
  const [isWideDesktop, setWideDesktop] = useState(window.innerWidth >= 1280);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1024);
  const [isWideTablet, setWideTablet] = useState(window.innerWidth >= 768);
  const [isTablet, setTablet] = useState(window.innerWidth >= 540);
  const [isMobile, setMobile] = useState(window.innerWidth < 540);

  const updateMedia = () => {
    setWideDesktop(window.innerWidth >= 1280);
    setDesktop(window.innerWidth > 1024);
    setWideTablet(window.innerWidth >= 768);
    setTablet(window.innerWidth >= 540);
    setMobile(window.innerWidth < 540);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return {
    isWideDesktop,
    isDesktop,
    isWideTablet,
    isTablet,
    isMobile,
  };
}