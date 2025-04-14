
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { NoteEditor } from "@/components/NoteEditor";
import { SearchResults } from "@/components/SearchResults";
import { useNotes } from "@/context/NoteContext";
import { SettingsDialog } from "@/components/SettingsDialog";

const Index = () => {
  const { searchQuery, currentNote } = useNotes();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen w-full">
      <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute top-2 right-2 z-10">
          <SettingsDialog />
        </div>
        {searchQuery.trim() && !currentNote ? (
          <SearchResults />
        ) : (
          <NoteEditor />
        )}
      </div>
    </div>
  );
};

export default Index;
