"use client";

import dynamic from "next/dynamic";

const StoryCarousel = dynamic(() => import("@/components/StoryCarousel"), {
  ssr: false,
  loading: () => <div className="story-carousel-skeleton" aria-hidden="true" />,
});

export default function StoryCarouselLoader({ images }) {
  return <StoryCarousel images={images} />;
}
