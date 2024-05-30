import React from 'react';

export type Link = {
  label: string;
  url: string;
  links?: Link[];
  icon?: React.ReactNode;
};

export default Link;
