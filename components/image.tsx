import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import Image from "next/image";

export async function getBase64ImageUrl(imageUrl: string) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + imageUrl);
    const buffer = await response.arrayBuffer();
    const minified = await imagemin.buffer(Buffer.from(buffer), {
        plugins: [imageminJpegtran()],
    });
    const base64 = Buffer.from(minified).toString("base64");
    return `data:image/jpeg;base64,${base64}`;
}

export async function CustomImage(props: any) {
    const img = "/assets/" + props.src;
    const blurDataUrl = await getBase64ImageUrl(img);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Image
                    src={img}
                    alt={props.alt}
                    width={props.width}
                    height={props.height}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    className="cursor-pointer"
                />
            </DialogTrigger>
            <DialogContent className="flex max-h-screen max-w-none flex-col overflow-y-auto sm:max-h-[calc(100vh-5rem)] sm:max-w-[calc(100vw-5rem)] xl:max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>{props.alt}</DialogTitle>
                </DialogHeader>
                <div className="relative my-2 flex-1">
                    <a href={img}>
                        <Image src={img} alt={props.alt} width="0" height="0" sizes="100vw" className="h-auto w-full" />
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
}
