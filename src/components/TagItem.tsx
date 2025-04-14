
import { useState } from "react";
import { useNotes } from "@/context/NoteContext";
import { Tag } from "@/types";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const getTagColorClass = (colorValue: string) => {
  switch (colorValue) {
    case "note-purple": return "bg-note-purple";
    case "note-blue": return "bg-note-blue";
    case "note-green": return "bg-note-green";
    case "note-red": return "bg-note-red";
    case "note-yellow": return "bg-note-yellow";
    case "note-pink": return "bg-note-pink";
    case "note-gray": return "bg-note-gray";
    default: return "bg-note-purple";
  }
};

export const TagItem = ({ tag }: { tag: Tag }) => {
  const { notes, selectNote, currentNote } = useNotes();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const tagNotes = notes.filter(note => note.tags.includes(tag.id));
  
  return (
    <div className="select-none">
      <div 
        className="flex items-center py-1 px-2 rounded-md text-sm cursor-pointer hover:bg-secondary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <button className="mr-1 p-1 focus:outline-none opacity-80">
          {tagNotes.length > 0 ? (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : <span className="w-[14px]" />}
        </button>
        <div className={`h-3 w-3 rounded-full ${getTagColorClass(tag.color)} mr-2`} />
        <span className="flex-1 truncate">#{tag.name}</span>
        <span className="text-xs text-muted-foreground">{tagNotes.length}</span>
      </div>
      
      {isExpanded && (
        <div>
          {tagNotes.map(note => (
            <div
              key={note.id}
              className={cn(
                "flex items-center py-1 px-2 rounded-md text-sm cursor-pointer ml-6",
                currentNote?.id === note.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-secondary"
              )}
              onClick={() => selectNote(note.id)}
            >
              <FileText size={14} className="mr-2 text-sidebar-foreground opacity-70" />
              <span className="truncate">{note.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
