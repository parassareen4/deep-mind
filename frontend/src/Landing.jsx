
function App() {
  return ( 
    <>
      <Navbar />
      <Banner />
      <LatestNews />
      <Technologies />
      <ExploreMore />
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <div className="navDiv">
      <Logo />
      <LeftMenu />
      <RightMenu />
    </div>
  );
}

function Logo() {
  return (
    <div className="logoDiv">
      <img
        src="https://w7.pngwing.com/pngs/523/198/png-transparent-google-logo-google-search-google-play-google-text-logo-number-thumbnail.png"
        alt="Logo"
      />
      <span>DeepMind</span>
    </div>
  );
}

function LeftMenu() {
  return (
    <div className="leftMenuDiv">
      <div className="menuItem">
        <a href="#banner">
          About <i className="bx bx-chevron-down"></i>
        </a>
      </div>
      <div className="menuItem">
        <a href="#research">
          Research <i className="bx bx-chevron-down"></i>
        </a>
      </div>
      <div className="menuItem">
        <a href="#technologies">
          Technology <i className="bx bx-chevron-down"></i>
        </a>
      </div>
      <div className="menuItem">
        <a href="#discover">
          Discover <i className="bx bx-chevron-down"></i>
        </a>
      </div>
    </div>
  );
}

function RightMenu() {
  return (
    <div className="rightMenuDiv">
      <div className="searchIcon">
        <i className="bx bx-search-alt-2"></i>
      </div>
      <div className="geminiIcon">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s"
          alt="Gemini Icon"
        />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="bannerDiv" id="banner">
      <img src="unnamed_014.webp" alt="Banner" />
      <h1>DEEPMIND AMA</h1>
      <button className="learnMoreBtn">Submit Your Question</button>
      <h3>A universal AI agent that is helpful in everyday life</h3>
    </div>
  );
}

function LatestNews() {
  return (
    <div className="latestNewsDiv" id="research">
      <div className="textDiv">
        <h1>Latest News</h1>

        <h3>Discover our latest AI breakthroughs and updates from the lab</h3>
      </div>
      <div className="newsGallery">
        <div className="div div1">
          <img
            className="image"
            src="https://unsplash.com/blog/content/images/size/w1000/2023/07/AI_safety_ethics_08L_ariel-lu_google-deepmind.jpg"
            alt="AI Safety"
          />
          <div className="text">
            AlphaQubit tackles one of quantum computing's biggest challenges
            <br />
            Our new AI system accurately identifies errors inside quantum
            computers...
          </div>
        </div>
        <div className="div div2">
          <img
            className="image"
            src="https://unsplash.com/blog/content/images/size/w1000/2023/07/AI_safety_ethics_05L_ariel-lu_google-deepmind.jpg"
            alt="AI Forum"
          />
          <div className="text">
            The AI for Science Forum: A new era of discovery
            <br />
            The AI science forum highlights AI's role in revolutionizing
            scientific research...
          </div>
        </div>
        <div className="div div3">
          <img
            className="image"
            src="https://unsplash.com/blog/content/images/size/w1000/2023/07/AI_safety_ethics_04L_ariel-lu_google-deepmind.jpg"
            alt="Audio Generation"
          />
          <div className="text">
            Pushing the frontiers of audio generation
            <br />
            Our pioneering speech generation technologies are helping people
            around the world...
          </div>
        </div>
      </div>
    </div>
  );
}

function Technologies() {
  return (
    <div className="technologiesDiv" id="technologies">
      <div className="headingDiv">
        <h1>Technologies</h1>
        <br />
        <br />

        <h3>Breakthrough research. Transformative products.</h3>
        <br />

        <h5>View all technologies</h5>
      </div>
      <div className="banner2">
        <img
          src="https://as2.ftcdn.net/v2/jpg/07/78/29/75/1000_F_778297590_diQ5WDYC9odh6wMJiKwXCBxwgyZQNo6n.jpg"
          alt="Technologies"
        />
      </div>
    </div>
  );
}

function ExploreMore() {
  return (
    <div className="exploreMoreDiv" id="discover">
      <div className="div textDiv">
        <h1>Explore our other teams and product areas</h1>
      </div>
      <div className="div optionsDiv">
        <div className="subDiv">
          <img
            src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
            alt="Google AI"
          />
          <span>Google AI</span>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
        <div className="subDiv">
          <img
            src="https://cdn-1.webcatalog.io/catalog/google-ai-studio/google-ai-studio-icon-filled-256.png?v=1714782928979"
            alt="Google AI"
          />
          <span>Google AI Studio</span>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
        <div className="subDiv">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMxJvqd1ogHWZPF2JuWlYdNp5TUGtNpYu9LA&s"
            alt="Google AI"
          />
          <span>Google Cloud</span>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
      </div>
      <div className="div optionsDiv">
        <div className="subDiv">
          <img
            src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
            alt="Google AI"
          />
          <span>Google AI For Developers</span>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
        <div className="subDiv">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s"
            alt="Google AI"
          />
          <span>Gemini</span>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
        <div className="subDiv">
          <img
            src="https://cdn.icon-icons.com/icons2/4184/PNG/512/virtual_labs_experiments_online_education_icon_262292.png"
            alt="Google AI"
          />
          <span>Google Labs</span>
          <i class="bx bx-right-arrow-alt"></i>
        </div>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <div className="footerDiv">
      <div className="topDiv">
        <span>Follow us</span>
        <span className="socioLinks">
          <i class="bx bxl-twitter"></i>
          <i class="bx bxl-instagram"></i>
          <i class="bx bxl-facebook"></i>
          <i class="bx bxl-github"></i>
        </span>
      </div>
      <div className="middleDiv">
        <div>
          About
          <br />
          <br />
          About Google DeepMind
          <br />
          <br />
          Responsibility & Safety
          <br />
          <br />
          Research
          <br />
          <br />
          Technologies
          <br />
          <br />
          Blog
          <br />
          <br />
          Careers
          <br />
          <br />
        </div>
        <div>
          Learn more Gemini
          <br />
          <br />
          Veo
          <br />
          <br />
          Imagen 3
          <br />
          <br />
          SynthID
        </div>
        <div className="signUpDiv">
          <span>Sign up for updates on our latest innovations</span>
          <br />
          <br />
          <br />

          <input type="text" placeHolder="Email Address" />
          <br />
          <br />

          <p>
            I accept Google's Terms and Conditions and acknowledge that my
            information will be used in accordance with Google's Privacy Policy.
          </p>
          <br />
          <br />

          <button>Sign Up</button>
        </div>
      </div>
      <div className="bottomDiv">
        <span>Google</span>
        <span> AboutGoogle</span>
        <span>Google Products</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </div>
  );
}

export default App;

