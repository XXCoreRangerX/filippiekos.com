import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function CustomImage(props: any) {
    const img = "/assets/" + props.src;
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Image
                        src={img}
                        alt={props.alt}
                        width={props.width}
                        height={props.height}
                        className={cn("cursor-pointer", props.className)}
                    />
                </DialogTrigger>
                <DialogContent className="flex max-h-screen max-w-none flex-col overflow-y-auto sm:max-h-[calc(100vh-5rem)] sm:max-w-[calc(100vw-5rem)] xl:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>{props.alt}</DialogTitle>
                    </DialogHeader>
                    <div className="relative flex-1">
                        <a href={img}>
                            <Image
                                src={img}
                                alt={props.alt}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className={cn("h-auto w-full", props.className)}
                            />
                        </a>
                    </div>
                    {props.caption && <p className="text-center text-sm text-muted-foreground">{props.caption}</p>}
                </DialogContent>
            </Dialog>
            {props.caption && <p className="text-center text-sm text-muted-foreground">{props.caption}</p>}
        </>
    );
}
