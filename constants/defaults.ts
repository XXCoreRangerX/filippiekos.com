/*
 * This file contains the default values for the website's metadata, such as title, description, and socials.
 * Feel free to modify these values to your liking.
 */

class Defaults {
    static title = "Filip Piękoś | Portfolio";
    static description =
        "Filip Piękoś's portfolio website. A self-proclaimed, aspiring developer, engineer, sysadmin, UI/UX/CAD/EDA designer, and a tech enthusiast. Studying at ZSTiO, Jarosław, Poland.";
    static url = "https://filippiekos.com";
    /* Bio is a markdown-formatted string */
    static bio = `
    I'm an aspiring developer, engineer, sysadmin, UI/UX/CAD/EDA designer, and a **tech enthusiast**. I enjoy long walks, skiing and heavy metal.
    
    Studying at ZSTiO, Jarosław, Poland.
    `;

    static fullName = "Filip Piękoś";
    static shortName = "Filip";
    static username = "XXCoreRangerX";
    static email = "mail@filippiekos.com";

    static socials = [
        ["GitHub", "FaGithub", "https://github.com/XXCoreRangerX"],
        ["Twitter", "FaXTwitter", "https://x.com/XXCoreRangerX"],
        ["Reddit", "FaReddit", "https://reddit.com/user/XXCoreRangerX"],
        [
            "Facebook",
            "FaFacebook",
            "https://facebook.com/profile.php?id=100029415751380",
        ],
    ];

    static skills = [
        "DevOps",
        "SysAdmin",
        "CI/CD",
        "Unix",
        "Python",
        "Rust",
        "Arduino",
        "Raspberry Pi",
        "Kubernetes",
        "EDA",
        "CAD",
        "UI/UX",
        "React",
        "Vue.js",
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "HTML5",
        "CSS",
    ];

    static achievements = [
        [
            "Regeneron ISEF",
            "2023 (Dallas, USA)",
            "3rd",
            "https://www.societyforscience.org/isef/",
        ],
        ["IEEE at ISEF", "2023 (Dallas, USA)", "2nd", "https://ieee.org"],
        ["Explory", "2022 (Gdynia, PL)", "1st", "https://explory.pl"],
    ];
}

export default Defaults;
