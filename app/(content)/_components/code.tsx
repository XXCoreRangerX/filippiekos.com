import CopyButton from "@/app/(content)/_components/copybutton";
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
import "./code.css";

export interface CodeProps {
    children: string;
    raw: string;
    language: string;
}

function Code({ children, raw, language, ...props }: CodeProps) {
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
        <>
            {language && (
                <div className="flex justify-between border-b bg-background px-3 py-2 text-xs text-slate-500">
                    <span className="flex select-none items-center gap-2">
                        <DynamicLanguageIcon className="h-5 w-5" />
                        <span>{language}</span>
                    </span>
                    <CopyButton raw={raw} />
                </div>
            )}
            <code {...props}>{children}</code>
        </>
    );
}

export default Code;
