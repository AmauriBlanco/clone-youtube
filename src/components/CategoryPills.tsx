import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
    categories: string[];
    selectedCategory: string;
    onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

export function CategoryPills({
    categories,
    selectedCategory,
    onSelect,
}: CategoryPillProps) {
    const [translate, setTranslate] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(false);
    const [isRightVisible, setIsRightVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current == null) return;
        const observer = new ResizeObserver((entries) => {
            const container = entries[0]?.target

            if(container == null) return

            setIsLeftVisible(translate > 0)
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
        });
        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [categories, translate]);

    return (
        <div ref={containerRef} className="overflow-hidden relative bg-[#0f0f0f]">
            <div
                className="flex whitespace-nowrap gap-3 transition-transform w-[max-content] text-white py-3 mt-[-10px]"
                style={{ transform: `translateX(-${translate}px)` }}
            >
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => onSelect(category)}
                        variant={
                            selectedCategory === category ? "dark" : "default"
                        }
                        className="py-1 px-3 rounded-lg whitespace-nowrap"
                    >
                        {category}
                    </Button>
                ))}
            </div>
            {isLeftVisible && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-black from-50% to-transparent w-24 text-[#f1f1f1]">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-hull aspect-square w-auto p-1.5"
                        onClick={() => {
                            setTranslate((translate) => {
                                const newTranslate =
                                    translate - TRANSLATE_AMOUNT;
                                if (newTranslate <= 0) return 0;
                                return newTranslate;
                            });
                        }}
                    >
                        <ChevronLeft />
                    </Button>
                </div>
            )}

            {isRightVisible && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-black from-50% to-transparent w-24 flex justify-end text-[#f1f1f1]">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-hull aspect-square w-auto p-1.5"
                        onClick={() => {
                            setTranslate((translate) => {
                                if (containerRef.current == null) {
                                    return translate;
                                }
                                const newTranslate =
                                    translate + TRANSLATE_AMOUNT;
                                const edge = containerRef.current.scrollWidth;
                                const width = containerRef.current.clientWidth;
                                if (newTranslate + width >= edge) {
                                    return edge - width;
                                }
                                return newTranslate;
                            });
                        }}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}
        </div>
    );
}
