import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { LayoutList, MenuIcon } from "lucide-react";
import React from "react";

const MenuButton = ({
    title = "Menu Baru",
    className,
    active,
    icon,
    href = "#",
}) => {
    return (
        <Button
            asChild
            variant={active ? "" : "outline"}
            className={`${className} w-full flex justify-start items-center`}
        >
            <Link href={href}>
                {icon ? icon : <LayoutList className="mr-2 h-4 w-4" />} {title}
            </Link>
        </Button>
    );
};

export default MenuButton;
