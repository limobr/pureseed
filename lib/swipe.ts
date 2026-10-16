/**
 * Phones get a swipeable row (the next card peeks in so it reads as swipeable); from md up the same
 * list becomes the normal grid. Keep the strings whole so Tailwind can find them.
 */
export const swipeList =
  "[contain:paint] md:[contain:none] -mx-4 flex snap-x snap-proximity scroll-px-4 sm:scroll-px-6 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden";

export const swipeItem = "w-[46vw] max-w-[15rem] shrink-0 snap-start md:w-auto md:max-w-none";
