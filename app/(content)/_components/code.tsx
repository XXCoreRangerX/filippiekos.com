import { IconType } from "react-icons";
import {
    BiLogoCPlusPlus,
    BiLogoCss3,
    BiLogoHtml5,
    BiLogoJavascript,
    BiLogoMarkdown,
    BiLogoPython,
    BiLogoTypescript,
} from "react-icons/bi";
import { FaCode } from "react-icons/fa6";

export interface CodeProps {
    children: string;
    className: string;
    language?: boolean;
    file?: string;
}

function Code({ children, className = "" }: CodeProps) {
    const language = (className.replace(/(language-|hljs)/g, "").trim() || "txt").toLowerCase();

    const languageIcon: IconType | undefined = {
        ts: BiLogoTypescript,
        tsx: BiLogoTypescript,
        typescript: BiLogoTypescript,
        js: BiLogoJavascript,
        jsx: BiLogoJavascript,
        javascript: BiLogoJavascript,
        python: BiLogoPython,
        cpp: BiLogoCPlusPlus,
        md: BiLogoMarkdown,
        mdx: BiLogoMarkdown,
        html: BiLogoHtml5,
        css: BiLogoCss3,
        txt: FaCode,
    }[language];

    const DynamicLanguageIcon = languageIcon || FaCode;

    return (
        <div>
            <div className="flex justify-between text-xs text-slate-500">
                {language && (
                    <span className="flex select-none items-center gap-2">
                        <DynamicLanguageIcon className="h-4 w-4" />
                        <span>{language}</span>
                    </span>
                )}
            </div>
            <code className={className}>{children}</code>
        </div>
    );
}

export default Code;
