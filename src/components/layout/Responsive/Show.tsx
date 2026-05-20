"use client";

import React from 'react';

interface ShowProps {
  children: React.ReactNode;
  on: 'mobile' | 'tablet' | 'desktop' | 'touch' | 'mouse';
}

export const Show = ({ children, on }: ShowProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const classes = {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block xl:hidden',
    desktop: 'hidden xl:block',
    touch: 'block lg:hidden',
    mouse: 'hidden lg:block',
  };

  return <div className={classes[on]}>{children}</div>;
};
