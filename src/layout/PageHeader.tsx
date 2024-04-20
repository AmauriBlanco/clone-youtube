import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

export function PageHeader() {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

    return (
        <header className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4 bg-[#0f0f0f] text-[#f1f1f1]">
            <PageHeaderFirstSection hidden={showFullWidthSearch} />
            <form
                className={` gap-4 flex-grow justify-center ${
                    showFullWidthSearch ? "flex" : "hidden md:flex"
                }`}
            >
                {showFullWidthSearch && (
                    <Button
                        onClick={() => setShowFullWidthSearch(false)}
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="flex-shrink-0"
                    >
                        <ArrowLeft />
                    </Button>
                )}

                <div className="flex flex-grow max-w-[600px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="rounded-l-full shadow-inner border border-1 border-secondary-border border-r-0 shadow-secondary-dark-hover py-1 px-4 text-lg w-full focus:border-neutral-100 bg-[#0f0f0f]"
                    />
                    <Button className="py-2 px-4 rounded-r-full border-secondary-border border boder-l-0 flex-shrink-0">
                        <Search />
                    </Button>
                </div>
                <Button type="button" size="icon" className="flex-shrink-0">
                    <Mic />
                </Button>
            </form>
            <div
                className={`flex flex-shrink-0 md:gap-2 ${
                    showFullWidthSearch ? "hidden" : "flex"
                }`}
            >
                <Button
                    onClick={() => setShowFullWidthSearch(true)}
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <Search />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:block">
                    <Mic />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:block">
                    <Upload />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:block">
                    <Bell />
                </Button>
                <Button variant="ghost" size="icon">
                    <User />
                </Button>
            </div>
        </header>
    );
}

type PageHeaderFirstSectionProps = {
    hidden?: boolean;
};

export function PageHeaderFirstSection({
    hidden = false,
}: PageHeaderFirstSectionProps) {
    const { toggle } = useSidebarContext();
    return (
        <div
            className={`gap-4 items-center flex-shrink-0 text-white ${
                hidden ? "hidden" : "flex"
            }`}
        >
            <Button onClick={toggle} variant="default" size="icon">
                <Menu />
            </Button>
            <a href="https://youtube.com" target="_blank">
                <img src={logo} className="h-6 text-white" />
            </a>
        </div>
    );
}
