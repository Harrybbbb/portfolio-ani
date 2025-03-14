// import "./App.css";
// import LocomotiveScroll from "locomotive-scroll";
// import CustomCursor from "./components/CustomCursor";
// import Logo from "./assets/logo.png";
// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     const locomotiveScroll = new LocomotiveScroll();
//     return () => locomotiveScroll.destroy();
//   }, []);

//   return (
//     <>
//       <div id="page1">
//         <div className="nav">
//           <div className="navbar">
//             <div className="logo">
//               <img src={Logo} alt="logo"></img>
//             </div>
//             <div className="open-work">
//               <p>
//                 <span className="blink"></span> UP FOR WORK
//               </p>
//             </div>
//             <div className="location">
//               <p>IND-INDORE</p>
//             </div>
//             <div className="gmail">
//               <button>
//                 <span className="text">Contact Me</span>
//                 <span>Email!</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="work">
//           <div className="work-container">
//             <p data-scroll data-scroll-speed="0.3">
//               WEB DEVELOPER,
//               <br />
//               CREATIVE DESIGNER
//             </p>
//           </div>
//         </div>

//         {/* Additional content starts here */}

//         <div className="about-me" data-scroll data-scroll-speed="0.1">
//           <h2>About Me</h2>
//           <p>
//             I am a passionate web developer and creative designer with a knack
//             for creating stunning websites and applications. With a strong
//             background in both front-end and back-end development, I bring a
//             unique blend of technical expertise and artistic vision to every
//             project.
//           </p>
//         </div>

//         {/* Additional content ends here */}
//       </div>
//       <div id="page2">
//         <div data-scroll data-scroll-speed="0.3" className="box"></div>
//       </div>
//       <CustomCursor />
//     </>
//   );
// }

// export default App;

// App.jsx
import "./App.css";
import Logo from "./assets/logo.png"; // Ensure this path is correct
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const scrollRef = useRef(null);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.5,
    });

    // Sync ScrollTrigger with Locomotive Scroll
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed",
    });

    // GSAP Animations
    gsap.fromTo(
      ".navbar",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".work-container p",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
    );

    gsap.fromTo(
      ".about-me",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-me",
          scroller: scrollRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      skillsRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          scroller: scrollRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      projectsRef.current.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: projectsRef.current,
          scroller: scrollRef.current,
          start: "top 80%",
        },
      }
    );

    // Update ScrollTrigger on scroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // Custom Cursor
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      locoScroll.destroy();
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="app-container" ref={scrollRef} data-scroll-container>
      <div id="page1" ref={page1Ref}>
        <div className="nav">
          <div className="navbar">
            <div className="logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="open-work">
              <p>
                <span className="blink"></span> UP FOR WORK
              </p>
            </div>
            <div className="location">
              <p>IND-INDORE</p>
            </div>
            <div className="gmail">
              <button>
                <span className="text">Contact Me</span>
                <span>Email!</span>
              </button>
            </div>
          </div>
        </div>

        <div className="work">
          <div className="work-container">
            <p>
              WEB DEVELOPER,
              <br />
              CREATIVE DESIGNER
            </p>
          </div>
        </div>

        <div className="about-me">
          <h2>About Me</h2>
          <p>
            I am a passionate web developer and creative designer with a knack
            for creating stunning websites and applications. With a strong
            background in both front-end and back-end development, I bring a
            unique blend of technical expertise and artistic vision to every
            project.
          </p>
        </div>
      </div>

      <div id="page2" ref={page2Ref}>
        <div className="skills-section" ref={skillsRef}>
          <h2>Skills</h2>
          <div className="skills-container">
            <div className="skill-card">React.js</div>
            <div className="skill-card">JavaScript</div>
            <div className="skill-card">CSS3</div>
            <div className="skill-card">Node.js</div>
            <div className="skill-card">GSAP</div>
            <div className="skill-card">UI/UX Design</div>
          </div>
        </div>

        <div className="projects-section" ref={projectsRef}>
          <h2>Projects</h2>
          <div className="projects-container">
            <div className="project-card">
              <h3>Project 1</h3>
              <p>E-commerce website with React and Node.js</p>
              <button className="project-btn">View Project</button>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>Portfolio website with GSAP animations</p>
              <button className="project-btn">View Project</button>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>Creative agency landing page</p>
              <button className="project-btn">View Project</button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        className="cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>
    </div>
  );
}

export default App;
