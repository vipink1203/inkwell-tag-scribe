
import { useNotes } from "@/context/NoteContext";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const SearchResults = () => {
  const { notes, tags, searchQuery, selectNote } = useNotes();
  
  if (!searchQuery.trim()) {
    return null;
  }
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getTagById = (id: string) => {
    return tags.find(tag => tag.id === id);
  };
  
  if (filteredNotes.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No results found for "{searchQuery}"</p>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Search Results for "{searchQuery}"</h2>
      <div className="space-y-4">
        {filteredNotes.map(note => (
          <div 
            key={note.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => selectNote(note.id)}
          >
            <div className="flex items-center mb-2">
              <FileText size={16} className="mr-2 text-muted-foreground" />
              <h3 className="font-medium">{note.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {note.content.replace(/[#*`\[\]]/g, '').substring(0, 120)}...
            </p>
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {note.tags.map(tagId => {
                  const tag = getTagById(tagId);
                  if (!tag) return null;
                  return (
                    <Badge 
                      key={tag.id} 
                      className={`bg-${tag.color} hover:bg-${tag.color}/80 text-xs`}
                    >
                      #{tag.name}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
