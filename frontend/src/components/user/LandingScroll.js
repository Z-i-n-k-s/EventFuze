import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your 6 background images
import bg1 from "../../assest/home/IDC.jpg";       // IDC Club
import bg2 from "../../assest/home/cultural.png";  // Cultural Club
import bg3 from "../../assest/home/debate.jpg";    // Debate Club
import bg4 from "../../assest/home/debate.jpg";    // Debate Club (duplicate)
import bg5 from "../../assest/home/islamic.jpg";   // Robotics Club
import bg6 from "../../assest/home/robotic.jpg";   // Islamic Society

import "./LandingScroll.css";

gsap.registerPlugin(ScrollTrigger);

const LandingScroll = () => {
  useEffect(() => {
    const leftSections = gsap.utils.toArray(".left-side-col > div");
    const rightContainer = document.querySelector(".right-side-col");
    const sectionCount = leftSections.length;

    function setupScrollAnimations() {
      const sectionHeight = window.innerHeight;
      const scrollLength = sectionHeight * sectionCount;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([leftSections, rightContainer]);

      gsap.set(rightContainer, {
        y: -sectionHeight * (sectionCount - 1),
      });

      gsap.to(leftSections, {
        yPercent: -100 * (sectionCount - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
          pin: ".sticky-container",
          invalidateOnRefresh: true,
        },
      });

      gsap.to(rightContainer, {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Text fade-in animation
      gsap.utils.toArray(".content-parent").forEach((content) => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }

    setupScrollAnimations();
    window.addEventListener("resize", setupScrollAnimations);

    return () => {
      window.removeEventListener("resize", setupScrollAnimations);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="scroll-section scroll-container">
      <div className="sticky-container">
        {/* Left Side */}
        <div className="left-side-col">
          {/* Section 1 Left - IDC Club */}
          <div className="section-1-l behind-text">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${bg1})`,
              }}
            ></div>
            <div className="dark-overlay"></div>
            <div className="content-parent">
              <h2>Innovation & Development Club</h2>
              <a href="#">
                <h1>
                  Fostering creativity, innovation, and technological advancement through collaborative projects and workshops
                </h1>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="bg-text">IDC</div>
          </div>

          {/* Section 2 Left - Cultural Club */}
          <div className="section-2-l behind-text">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${bg2})`,
              }}
            ></div>
            <div className="dark-overlay"></div>
            <div className="content-parent">
              <h2>Cultural Society</h2>
              <a href="#">
                <h1>
                  Celebrating diversity through music, dance, art, and cultural festivals that bring our community together
                </h1>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="bg-text">Culture</div>
          </div>

          {/* Section 3 Left - Debate Club */}
          <div className="section-3-l behind-text">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${bg3})`,
              }}
            ></div>
            <div className="dark-overlay"></div>
            <div className="content-parent">
              <h2>Debate & Oratory Club</h2>
              <a href="#">
                <h1>
                  Developing critical thinking, public speaking, and argumentation skills through competitive debates and discussions
                </h1>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="bg-text">Debate</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-side-col">
          {/* Section 3 Right - Robotics Club */}
          <div className="section-3-r behind-text">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${bg5})`,
              }}
            ></div>
            <div className="dark-overlay"></div>
            <div className="content-parent">
              <h2>Robotics & Engineering Club</h2>
              <a href="#">
                <h1>
                  Building the future through robotics, automation, and cutting-edge engineering projects and competitions
                </h1>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="bg-text">Robotics</div>
          </div>

          {/* Section 2 Right - Islamic Society */}
          <div className="section-2-r behind-text">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${bg6})`,
              }}
            ></div>
            <div className="dark-overlay"></div>
            <div className="content-parent">
              <h2>Islamic Society</h2>
              <a href="#">
                <h1>
                  Promoting Islamic values, community service, and spiritual growth through educational programs and events
                </h1>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="bg-text">Islamic</div>
          </div>

          {/* Section 1 Right - Academic Excellence */}
          <div className="section-1-r behind-text">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${bg4})`,
              }}
            ></div>
            <div className="dark-overlay"></div>
            <div className="content-parent">
              <h2>Academic Excellence Hub</h2>
              <a href="#">
                <h1>
                  Supporting academic growth through study groups, tutoring sessions, and scholarly research initiatives
                </h1>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="bg-text">Academic</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScroll;