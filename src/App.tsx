import { useState } from "react";
import "./App.css";
import { CategoryPills } from "./components/CategoryPills";
import { PageHeader } from "./layout/PageHeader";
import { categories, videos } from "./data/data";
import { VideoGridItem } from "./components/VideoGridItem";
import { Sidebar } from "./layout/SideBar";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
        <SidebarProvider>
            <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
                <PageHeader />
                <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
                   <Sidebar/>
                    <div className="overflow-x-hidden px-2 md:px-8 pb-4">
                        <div className="sticky top-0  z-10 pb-4 bg-[#0f0f0f]">
                            <CategoryPills
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onSelect={setSelectedCategory}
                            />
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                            {videos.map((video) => (
                                <VideoGridItem key={video.id} {...video} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}

export default App;
