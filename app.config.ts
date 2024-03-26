/*
 * This file contains the default values for the website's metadata, such as title, description, and socials.
 * Feel free to modify these values to your liking.
 */

export default class App {
    static title = "Filip Piękoś | Portfolio";
    static description =
        "Filip Piękoś's portfolio website. An aspiring developer, engineer, sysadmin, UI/UX/CAD/EDA designer, and a tech enthusiast. Studying at ZSTiO, Jarosław, Poland.";
    static url = "https://filippiekos.com";

    static fullName = "Filip Piękoś";
    static username = "XXCoreRangerX";
    static subtitle = "Developer, Designer, Engineer";
    static email = "mail@filippiekos.com";
    static darkColor = "#0f172a";
    static lightColor = "#f8f8f8";

    static socials = [
        ["GitHub", "https://github.com/XXCoreRangerX"],
        ["Twitter", "https://x.com/XXCoreRangerX"],
        ["Reddit", "https://reddit.com/user/XXCoreRangerX"],
        ["Facebook", "https://facebook.com/profile.php?id=100029415751380"],
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
            description: "Personal portfolio for Artur Tutka, a high school teacher and a 3d printing enthusiast.",
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
