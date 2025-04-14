
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { NoteEditor } from "@/components/NoteEditor";
import { SearchResults } from "@/components/SearchResults";
import { useNotes } from "@/context/NoteContext";

const Index = () => {
  const { searchQuery, currentNote } = useNotes();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen w-full">
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      <div className="flex-1 overflow-hidden relative">
        {searchQuery.trim() ? (
          <SearchResults />
        ) : (
          <NoteEditor />
        )}
      </div>
    </div>
  );
};

export default Index;
