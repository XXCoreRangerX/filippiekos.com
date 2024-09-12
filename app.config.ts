/*
 * This file contains the default values for the website's metadata, such as title, description, and socials.
 * Feel free to modify these values to your liking.
 */

export default class App {
    static title = "Filip Piękoś | Portfolio";
    static shortTitle = "Filip Piękoś";
    static description =
        "Filip Piękoś's portfolio website. An aspiring developer, engineer, sysadmin, UI/UX/CAD/EDA designer, and a tech enthusiast. Studying at ZSTiO, Jarosław, Poland.";
    static url = "https://filippiekos.com";

    static fullName = "Filip Piękoś";
    static username = "XXCoreRangerX";
    static subtitle = "Developer, Designer, Engineer";
    static email = "mail@filippiekos.com";
    static darkColor = "#0f172a";
    static lightColor = "#f8f8f8";

    static about = `
    I've been interested in computers and technology for as long as I remember. I mostly work with **web technologies**, but I also enjoy **embedded systems** and **low-level programming**.
    Recently also taken interest in **machine learning** and **artificial intelligence**.
    
    My hobbies include **homelabbing**, **3D printing**, **electronics** and **tinkering** with various gadgets and devices. I also enjoy some casual gaming and listen to heavy metal or EDM music.
    
    I'm fully **self-taught**, and I've been working on various projects for the past few years, most notably **[ZHELTA](https://zhelta.pl)** — an ecosystem of custom, contactless, programmable keyboards for people with disabilities.
    
    The project has been featured in various local, national and international media outlets, and has been presented at multiple conferences and events. ZHELTA has received the international [Regeneron ISEF 2023](https://www.societyforscience.org/press-release/regeneron-isef-full-awards-2023/) science and engineering competition **3rd Grand Award** in Engineering - Embedded Systems along with the **2nd place Special Award** by [IEEE](https://spectrum.ieee.org/ieee-presidents-scholarship-2023) and **1st place Grand Award** at the national [Explory 2022](https://www.explory.pl/laureat/filip-piekos,188) competition.
    
    I've been giving out ZHELTA keyboards to people with disabilities **for free**, thanks to the support of various sponsors and donors, and I'm working on making them more accessible and affordable.
    
    I'm a [Rafał Brzoska Foundation](https://rafalbrzoskafoundation.org/stypendysci-fundacja-rafala-brzoski/) scholarship holder, a scholarship for young people with outstanding achievements.
    
    Currently, I'm a **high school student** at [ZSTiO, Jarosław, Poland](https://zstiojar.edu.pl/), but I'm looking forward to studying computer science at a university in the near future.
    `;

    static socials = [
        ["GitHub", "https://github.com/XXCoreRangerX"],
        ["Twitter", "https://x.com/XXCoreRangerX"],
        ["Reddit", "https://reddit.com/user/XXCoreRangerX"],
        ["Facebook", "https://facebook.com/profile.php?id=100029415751380"],
        ["LinkedIn", "https://linkedin.com/in/filippiekos"],
    ];

    static skills = [
        "DevOps",
        "SysAdmin",
        "EDA",
        "CAD",
        "UI/UX",
        "Unix",
        "Python",
        "Embedded",
        "Raspberry Pi",
        "Kubernetes",
        "HTML5",
        "CSS",
        "TypeScript",
        "TailwindCSS",
        "React",
        "Vue.js",
        "Next.js",
        "Nuxt.js",
    ];

    static achievements = [
        {
            title: "Rafał Brzoska Foundation",
            type: "Scholarship",
            date: "2022 — Present",
            url: "https://rafalbrzoskafoundation.org/stypendysci-fundacja-rafala-brzoski/",
        },
        {
            title: "Regeneron ISEF",
            type: "Grand Award",
            date: "2023",
            location: "Dallas, USA",
            place: "3rd",
            url: "https://www.societyforscience.org/press-release/regeneron-isef-full-awards-2023/",
        },
        {
            title: "Explory",
            type: "Grand Award",
            date: "2022",
            location: "Gdynia, PL",
            place: "1st",
            url: "https://www.explory.pl/laureat/filip-piekos,188",
        },
        {
            title: "IEEE at ISEF",
            type: "Special Award",
            date: "2023",
            location: "Dallas, USA",
            place: "2nd",
            url: "https://spectrum.ieee.org/ieee-presidents-scholarship-2023/",
        },
    ];

    static projects = [
        {
            title: "Filip Piękoś - Portfolio",
            date: "Feb 2024 — Present",
            description: "My personal portfolio website, showcasing my work, achievements, and blog posts.",
            url: "https://filippiekos.com/",
            tags: ["Web", "Next.js", "React", "TypeScript", "TailwindCSS", "MDX"],
        },
        {
            title: "edupartyzant.pl",
            date: "Mar 2024 — Present",
            description:
                "Personal portfolio for Artur Tutka, a renowned high school teacher and a 3D printing enthusiast.",
            url: "https://edupartyzant-pl.vercel.app/",
            tags: ["Web", "Nuxt.js", "Vue", "TypeScript", "TailwindCSS"],
        },
        {
            title: "Vehify",
            date: "Mar 2024 — Present",
            description: "Tool for checking polish car history, accidents, and other important information.",
            url: "https://vehify.vercel.app/",
            tags: ["Web", "Nuxt.js", "Vue", "TypeScript", "TailwindCSS"],
        },
        {
            title: "ZHELTA",
            date: "2022 — Present",
            description: "A series of contactless, programmable keyboards for people with disabilities.",
            url: "https://zhelta.pl/",
            tags: ["Embedded", "EDA", "CAD", "Electronics", "3D Printing"],
        },
        {
            title: "discord-send-embed-code-to-webhook",
            date: "2021 - 2022",
            description: "Atom Editor [*] plugin to easily send code extracts to Discord using webhooks.",
            url: "https://github.com/XXCoreRangerX/discord-send-embed-code-to-webhook/",
            tags: ["Node.js", "JavaScript", "Plugin"],
        },
        {
            title: "Astro",
            date: "2021",
            description: "A clean, elegant color palette, representing the minimalistic idea of the universe.",
            url: "https://github.com/XXCoreRangerX/astro/",
            tags: ["Design", "UI/UX", "Color scheme"],
        },
    ];
}
