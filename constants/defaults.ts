/*
* This file contains the default values for the website's metadata, such as title, description, and socials.
* Feel free to modify these values to your liking.
*/

class Defaults {
    static title = "Filip Piękoś | Portfolio";
    static description =  "Filip Piękoś's portfolio website. A place to showcase my work and share my thoughts.";
    static url = "https://filippiekos.com";
    /* Bio is a markdown-formatted string */
    static bio = "I'm a self-proclaimed, aspiring developer, engineer, sysadmin, UI/UX/CAD/EDA designer, and a tech enthusiast. Studying at ZSTiO, Jarosław, Poland";

    static fullName = "Filip Piękoś";
    static shortName = "Filip";
    static username = "XXCoreRangerX";
    static email = "contact@filippiekos.com";

    static socials = [
        ["GitHub", "FaGithub", "https://github.com/XXCoreRangerX"],
        ["Twitter", "FaXTwitter", "https://x.com/XXCoreRangerX"],
        ["Reddit", "FaReddit", "https://reddit.com/user/XXCoreRangerX"],
        ["Facebook", "FaFacebook", "https://facebook.com/profile.php?id=100029415751380"]
    ];

    static githubStats = "https://github-readme-stats.vercel.app/api?username=XXCoreRangerX&show_icons=true&hide_border=true&hide_rank=true&count_private=true&disable_animations&theme=transparent&title_color=ffffff&text_color=ffffff&icon_color=ffffff"

    static skills = ["DevOps", "Ansible", "Unix", "React", "Next.js", "UI/UX"]

    static achievements = [
        ["Regeneron ISEF", "2023", "3rd", "https://isef.com"],
        ["IEEE at ISEF", "2023", "2nd", "https://ieee.org"],
        ["Explory", "2022", "1st", "https://explory.pl"],
    ];
}

export default Defaults;