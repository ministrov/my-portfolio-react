import { createContext } from "react";

export const AccordionContext = createContext({
  activeIndex: null,
  setActiveIndex: () => {}
});

export const AccordionItemContext = createContext({
  index: null,
});