import StoryCarousel from "@/components/StoryCarousel";

export const metadata = {
  title: "About | Thien Portfolio",
  description: "My personal story — from a quiet countryside in Khánh Hòa to a Computer Science student at HCMUT.",
};

const storyChapters = [
  {
    id: "childhood",
    tag: "Born & Raised",
    eyebrow: "Chapter 01",
    title: "A Countryside Kid with Big Curiosity",
    paragraphs: [
      "I was born and raised in a quiet countryside area in Khánh Hòa. Since I was a kid, I've always had a special interest in mathematics. My very first teacher was my dad—a high school math teacher—who patiently guided me through numbers and logic from the earliest days.",
      "Besides math, I also loved drawing. At one point, I even won third prize in a provincial children's art competition in Khánh Hòa. I'd say I was quite a mischievous, friendly, and… kind of cute kid, right?",
    ],
    images: [
      { src: "/family.png", alt: "Me with my family" },
      // Thêm ảnh tại đây: { src: "/about-primary-2.png", alt: "..." },
    ],
    imageLeft: true,
  },
  {
    id: "middleschool",
    tag: "Middle School",
    eyebrow: "Chapter 02",
    title: "Math, Football & the Spark of Code",
    paragraphs: [
      "A little older, but still the same me — a 15-year-old boy with a growing passion for math and football. My middle school years were filled with great memories that really shaped who I am today.",
      "I earned second prize in a district-level math competition and another second prize in a science and engineering contest with a project about an infrared-based electrical switching system.",
      "Around that time, I was introduced to computers and programming by a relative — and that moment changed everything. That's when I knew I wanted to become a programmer.",
    ],
    images: [
      { src: "/about-middle.png", alt: "Me in middle school" },
      { src: "/mid-football.jpg", alt: "Me in club football at middle school" },
      // Thêm ảnh tại đây: { src: "/about-middle-2.png", alt: "..." },
    ],
    imageLeft: false,
  },
  {
    id: "highschool",
    tag: "High School",
    eyebrow: "Chapter 03",
    title: "Milestones, Medals & Making History",
    paragraphs: [
      "Looking pretty cool, right? With a strong passion for both math and programming, I achieved an encouragement prize in the provincial math competition.",
      "I also claimed first prize in a provincial science and engineering contest with an embedded system for detecting driver drowsiness — a big milestone, and the first-ever first prize for my high school (pretty proud of that, not gonna lie). I even got featured on television after that!",
      "Outside of academics, football has always been a huge part of my life — a passion inherited from my dad. Honestly, he has influenced me a lot, and I truly admire him. But it wasn't until university that I finally won my first football trophy.",
    ],
    images: [
      { src: "/about-highschool.png", alt: "Me in high school" },
      // Thêm ảnh tại đây: { src: "/about-highschool-2.png", alt: "..." },
    ],
    imageLeft: true,
  },
  {
    id: "university",
    tag: "University",
    eyebrow: "Chapter 04",
    title: "Still the Same Passion, Bigger Stage",
    paragraphs: [
      "And here I am today — a third-year Computer Science student at Ho Chi Minh City University of Technology, VNU-HCM. I still carry the same passion for math, programming, and football. The journey hasn't always been easy, but I've managed to maintain a GPA of 3.4/4 (not too bad, right?).",
      "Beyond my studies, I actively participate in volunteer work and help organize faculty events. Joining the Youth Union of the Faculty of Computer Science and Engineering (CSE) has been a true highlight of my university life. It's where I've had the chance to coordinate impactful events, build lasting friendships, and create unforgettable memories.",
    ],
    images: [
      { src: "/avatar.png", alt: "Me at university" },
      { src: "/XTN.jpg", alt: "Me at university" },
      { src: "/DOANHOI.jpg", alt: "Me at university" },
      { src: "/cup.jpg", alt: "Me at university" },
      { src: "/connection.jpg", alt: "Me at university" },
      // Thêm ảnh tại đây: { src: "/about-university-2.png", alt: "..." },
    ],
    imageLeft: false,
  },
];

export default function AboutPage() {
  return (
    <main className="container page-content">
      {/* Header */}
      <section className="section-header reveal reveal-zoom">
        <p className="eyebrow">About Me</p>
        <h1>My Story</h1>
        <p className="lead">
          From a quiet countryside in Khánh Hòa to a CS student in Hồ Chí Minh City —
          here&apos;s the journey that shaped who I am.
        </p>
      </section>

      {/* Story chapters */}
      <div className="story-timeline">
        {storyChapters.map((chapter, index) => (
          <section
            key={chapter.id}
            className={`story-chapter reveal ${chapter.imageLeft ? "reveal-left" : "reveal-right"} delay-${Math.min(index + 1, 3)}`}
          >
            <div className={`story-inner${chapter.imageLeft ? "" : " story-inner--reverse"}`}>
              {/* Carousel */}
              <div className="story-image-wrap">
                <StoryCarousel images={chapter.images} />
              </div>

              {/* Text */}
              <div className="story-text">
                <p className="eyebrow">{chapter.eyebrow}</p>
                <span className="story-tag">{chapter.tag}</span>
                <h2 className="story-title">{chapter.title}</h2>
                <div className="story-body">
                  {chapter.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Connector line (not after last) */}
            {index < storyChapters.length - 1 && (
              <div className="story-connector" aria-hidden="true" />
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
