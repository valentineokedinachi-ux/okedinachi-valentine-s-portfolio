
document.addEventListener("DOMContentLoaded", () => {

    // TYPEWRITER EFFECT

    const typedName = document.getElementById("typed-name");

    const names = [
        "Okedinachi Valentine",
        "Bossy Val"
    ];

    let nameIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeWriter() {

        const currentName = names[nameIndex];

        if (!deleting) {

            // Add one letter at a time
            characterIndex++;

            typedName.textContent =
                currentName.substring(0, characterIndex);

            // When the complete name appears
            if (characterIndex === currentName.length) {

                deleting = true;

                setTimeout(typeWriter, 2000);
                return;
            }

            setTimeout(typeWriter, 110);

        } else {

            // Remove one letter at a time
            characterIndex--;

            typedName.textContent =
                currentName.substring(0, characterIndex);

            // When the name has disappeared
            if (characterIndex === 0) {

                deleting = false;

                nameIndex = (nameIndex + 1) % names.length;

                setTimeout(typeWriter, 500);
                return;
            }

            setTimeout(typeWriter, 55);
        }
    }

    // Start typing after the page loads
    typedName.textContent = "";
    typeWriter();


    // MOBILE NAVIGATION

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {

        menuToggle.classList.remove("active");
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.style.overflow =
            isOpen ? "hidden" : "";
    });

    navItems.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

});



/* =========================================
   DEVELOPER CODE SHOWCASE ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const codeOutput = document.getElementById("code-output");
    const lineNumbers = document.getElementById("line-numbers");
    const editor = document.querySelector(".code-editor");

    if (!codeOutput || !lineNumbers || !editor) return;

    const developerCode = [
        "// A little introduction about me",
        "",
        "const developer = {",
        '    name: "Okedinachi Valentine",',
        '    title: "Creative Web Developer",',
        '    location: "Enugu, Nigeria",',
        "",
        "    technologies: [",
        '        "HTML",',
        '        "CSS",',
        '        "JavaScript",',
        '        "Git & GitHub"',
        "    ],",
        "",
        '    passion: "Building meaningful digital experiences",',
        "",
        "    create: function() {",
        '        return "Ideas into reality."; ',
        "    }",
        "};",
        "",
        "console.log(developer);"
    ].join("\n");


    // SIMPLE JAVASCRIPT SYNTAX HIGHLIGHTING

    function highlightCode(code) {

        const escaped = code.replace(/[&<>"]/g, character => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
            };

            return entities[character];
        });

        const tokenPattern =
            /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|var|return|function|new|this)\b|\b\d+\b|\b(?:console|developer|name|title|location|technologies|passion|create|log)\b)/g;

        return escaped.replace(tokenPattern, token => {

            if (token.startsWith("//")) {
                return `<span class="code-comment">${token}</span>`;
            }

            if (token.startsWith('"') || token.startsWith("'")) {
                return `<span class="code-string">${token}</span>`;
            }

            if (/^(const|let|var|return|function|new|this)$/.test(token)) {
                return `<span class="code-keyword">${token}</span>`;
            }

            if (/^\d+$/.test(token)) {
                return `<span class="code-number">${token}</span>`;
            }

            if (token === "console" || token === "log" || token === "create") {
                return `<span class="code-function">${token}</span>`;
            }

            return `<span class="code-property">${token}</span>`;
        });
    }


    // GENERATE LINE NUMBERS

    const totalLines = developerCode.split("\n").length;

    lineNumbers.innerHTML = Array.from(
        { length: totalLines },
        (_, index) => `<span>${index + 1}</span>`
    ).join("");


    // TYPE THE CODE

    let character = 0;
    let animationStarted = false;
    let typingTimer;

    function typeCode() {

        if (character <= developerCode.length) {

            const currentText = developerCode.substring(0, character);

            codeOutput.innerHTML = highlightCode(currentText);

            character++;

            typingTimer = setTimeout(typeCode, 24);

        } else {

            // Keep the completed code visible
            clearTimeout(typingTimer);
        }
    }


    // START WHEN THE EDITOR ENTERS THE SCREEN

    function startCodeAnimation() {

        if (animationStarted) return;

        animationStarted = true;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            codeOutput.innerHTML = highlightCode(developerCode);
            return;
        }

        typeCode();
    }


    if ("IntersectionObserver" in window) {

        const editorObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCodeAnimation();
                    editorObserver.disconnect();

                }

            });

        }, {
            threshold: 0.25
        });

        editorObserver.observe(editor);

    } else {

        startCodeAnimation();

    }

});


/* =========================================
   SECTION ENTRANCE ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll(".section-reveal");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    sectionObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    } else {

        sections.forEach(section => {
            section.classList.add("visible");
        });

    }

});



/* =========================================
   FEATURED PROJECTS DATA & RENDERING
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projects = [
        {
            name: "Cine-Verse",
            category: "Cinema & Entertainment",
            description: "A modern cinema and movie discovery platform where users can explore films and enjoy a cinematic experience.",
            image: "./image.png",
            url: "ADD_CINEVERSE_LINK_HERE"
        },
        {
            name: "Mama Nkechi's Kitchen",
            category: "Food & Restaurant",
            description: "A Nigerian restaurant website celebrating delicious local meals, menus and authentic food experiences.",
            image: "https://tb-static.uber.com/prod/image-proc/processed_images/d236837367eec86f312b607b787812ac/aa13fff7e2466014ca51307be81e7738.jpeg",
            url: "ADD_MAMA_NKECHI_LINK_HERE"
        },
        {
            name: "Luxury Jewelry Website",
            category: "E-commerce & Luxury",
            description: "An elegant online jewellery store showcasing premium necklaces, rings and luxury accessories.",
            image: "./image copy.png",
            url: "ADD_JEWELRY_LINK_HERE"
        },
        {
            name: "Wander Niger",
            category: "Travel & Tourism",
            description: "A Nigerian travel and tourism platform showcasing beautiful destinations and unforgettable experiences.",
            image: "https://static.wixstatic.com/media/cd6132_ead4645321594e67a3e51ebcec7b65b3~mv2.jpeg/v1/fill/w_1000%2Ch_667%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01/cd6132_ead4645321594e67a3e51ebcec7b65b3~mv2.jpeg",
            url: "ADD_WANDER_NIGER_LINK_HERE"
        }
    ];

    const projectsGrid = document.getElementById("projects-grid");

    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map((project, index) => `
        <article class="project-card">

            <div class="project-image-wrap">
                <img
                    src="${project.image}"
                    alt="${project.name} project preview"
                    class="project-image"
                    loading="lazy"
                >
            </div>

            <div class="project-content">
                <span class="project-category">
                    ${project.category}
                </span>

                <h3>${project.name}</h3>

                <p>${project.description}</p>

                <a
                    href="${project.url.startsWith('ADD_') ? '#' : project.url}"
                    class="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-project-index="${index}"
                >
                    View Project
                    <i class="ri-arrow-right-up-line"></i>
                </a>
            </div>

        </article>
    `).join("");

    // Handle project links
    projectsGrid.addEventListener("click", (event) => {
        const link = event.target.closest(".project-link");

        if (!link) return;

        const projectIndex = Number(link.dataset.projectIndex);
        const project = projects[projectIndex];

        if (project.url.startsWith("ADD_")) {
            event.preventDefault();
            alert("Add the deployed project URL in the projects array inside script.js first.");
        }
    });

});



/* =========================================
   ANIMATED SKILLS & TECH STACK
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const technologies = [
        // PROGRAMMING LANGUAGES & WEB
        { name: "HTML5", slug: "html5" },
        { name: "CSS3", slug: "css" },
        { name: "JavaScript", slug: "javascript" },
        { name: "TypeScript", slug: "typescript" },

        // FRAMEWORKS & STYLING
        { name: "Tailwind CSS", slug: "tailwindcss" },
        { name: "React", slug: "react" },
        { name: "Next.js", slug: "nextdotjs" },
        { name: "Bootstrap", slug: "bootstrap" },
        { name: "Node.js", slug: "nodedotjs" },
        { name: "Express.js", slug: "express" },

        // DEVELOPMENT TOOLS
        { name: "Git", slug: "git" },
        { name: "GitHub", slug: "github" },
        { name: "VS Code", slug: "vscode" },
        { name: "npm", slug: "npm" },
        
        { name: "Chrome DevTools", slug: "googlechrome" },
        

        // AI TOOLS
        { name: "Claude", slug: "claude" },
    
        { name: "Google Gemini", slug: "googlegemini" },
        { name: "Kimi", slug: "kimi" },
        { name: "GitHub Copilot", slug: "githubcopilot" },
        { name: "Perplexity", slug: "perplexity" },

       
    ];

    const firstRow = document.getElementById("tech-chain-one");
    const secondRow = document.getElementById("tech-chain-two");

    if (!firstRow || !secondRow) return;

    // Split technologies between the two rows
    const middle = Math.ceil(technologies.length / 2);

    const firstGroup = technologies.slice(0, middle);
    const secondGroup = technologies.slice(middle);

    // Create a logo item
    function createTechItem(tech) {
        const item = document.createElement("div");
        item.className = "tech-logo-item";
        item.title = tech.name;

        const logo = document.createElement("img");
        // Dedicated logo sources for brands that need them
const customLogos = {
    

    "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
};

logo.src = customLogos[tech.name]
    || `https://cdn.simpleicons.org/${tech.slug}`;
        logo.alt = `${tech.name} logo`;
        logo.loading = "lazy";

        const name = document.createElement("span");
        name.textContent = tech.name;

        item.appendChild(logo);
        item.appendChild(name);

        return item;
    }

    // Build a duplicated sequence for seamless animation
    function buildMarquee(container, items, direction) {

        container.classList.add(
            direction === "left"
                ? "tech-chain-left"
                : "tech-chain-right"
        );

        const groupOne = document.createElement("div");
        groupOne.className = "tech-group";

        const groupTwo = document.createElement("div");
        groupTwo.className = "tech-group";
        groupTwo.setAttribute("aria-hidden", "true");

        items.forEach(tech => {
            groupOne.appendChild(createTechItem(tech));
            groupTwo.appendChild(createTechItem(tech));
        });

        container.appendChild(groupOne);
        container.appendChild(groupTwo);
    }

    // First row: right to left
    buildMarquee(firstRow, firstGroup, "left");

    // Second row: left to right
    buildMarquee(secondRow, secondGroup, "right");

});



/* =========================================
   CONTACT FORM — WHATSAPP INTEGRATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ADD YOUR WHATSAPP NUMBER HERE
    // Use international format without + or spaces.
    // Example: 2348012345678
    const whatsappNumber = "ADD_YOUR_WHATSAPP_NUMBER";

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("visitor-name").value.trim();
            const email = document.getElementById("visitor-email").value.trim();
            const message = document.getElementById("visitor-message").value.trim();

            if (!name || !email || !message) {
                alert("Please complete all the fields.");
                return;
            }

            if (whatsappNumber.startsWith("ADD_")) {
                alert("Please add your WhatsApp number in script.js first.");
                return;
            }

            const whatsappMessage =
                `Hello Okedinachi Valentine!\n\n` +
                `My name is: ${name}\n` +
                `My email: ${email}\n\n` +
                `My message:\n${message}`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappURL, "_blank", "noopener,noreferrer");
        });
    }

});


/* =========================================
   FOOTER TYPEWRITER ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const footerName = document.getElementById("footer-typed-name");

    if (!footerName) return;

    const names = [
        "Okedinachi Valentine",
        "Bossy Val"
    ];

    let nameIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function footerTypeWriter() {

        const currentName = names[nameIndex];

        if (!deleting) {

            characterIndex++;

            footerName.textContent =
                currentName.substring(0, characterIndex);

            if (characterIndex === currentName.length) {
                deleting = true;
                setTimeout(footerTypeWriter, 2200);
                return;
            }

            setTimeout(footerTypeWriter, 110);

        } else {

            characterIndex--;

            footerName.textContent =
                currentName.substring(0, characterIndex);

            if (characterIndex === 0) {
                deleting = false;
                nameIndex = (nameIndex + 1) % names.length;
                setTimeout(footerTypeWriter, 500);
                return;
            }

            setTimeout(footerTypeWriter, 55);
        }
    }

    footerTypeWriter();

});
