import { useState } from "react";
import { useNotes } from "@/context/NoteContext";
import { Folder, Tag, Note } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronDown, 
  ChevronRight, 
  FolderIcon, 
  PlusCircle, 
  Search, 
  Tag as TagIcon, 
  FileText, 
  File, 
  X,
  Menu,
  Settings
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SettingsDialog } from "@/components/SettingsDialog";
import { TagItem } from "@/components/TagItem";

interface FolderItemProps {
  folder: Folder;
  level?: number;
  onClick: (folder: Folder) => void;
  onCreateNote: (folderId: string) => void;
  isActive: boolean;
}

const FolderItem = ({ folder, level = 0, onClick, onCreateNote, isActive }: FolderItemProps) => {
  const { folders, notes } = useNotes();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const childFolders = folders.filter(f => f.parentId === folder.id);
  const folderNotes = notes.filter(note => note.folderId === folder.id);
  
  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex items-center py-1 px-2 rounded-md text-sm cursor-pointer", 
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-secondary"
        )}
        style={{ paddingLeft: `${(level + 1) * 0.5}rem` }}
        onClick={() => onClick(folder)}
      >
        <button 
          className="mr-1 p-1 focus:outline-none opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {childFolders.length > 0 || folderNotes.length > 0 ? (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : <span className="w-[14px]" />}
        </button>
        <FolderIcon size={16} className="mr-2 text-sidebar-foreground opacity-70" />
        <span className="flex-1 truncate">{folder.name}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 opacity-0 group-hover:opacity-70"
          onClick={(e) => {
            e.stopPropagation();
            onCreateNote(folder.id);
          }}
        >
          <PlusCircle size={14} />
        </Button>
      </div>
      
      {isExpanded && (
        <div>
          {childFolders.map(childFolder => (
            <FolderItem 
              key={childFolder.id}
              folder={childFolder}
              level={level + 1}
              onClick={onClick}
              onCreateNote={onCreateNote}
              isActive={false}
            />
          ))}
          
          {folderNotes.map(note => (
            <NoteItem 
              key={note.id}
              note={note}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NoteItem = ({ note, level = 0 }: { note: Note, level?: number }) => {
  const { selectNote, currentNote } = useNotes();
  
  return (
    <div
      className={cn(
        "flex items-center py-1 px-2 rounded-md text-sm cursor-pointer",
        currentNote?.id === note.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-secondary"
      )}
      style={{ paddingLeft: `${(level + 2) * 0.5}rem` }}
      onClick={() => selectNote(note.id)}
    >
      <FileText size={14} className="mr-2 text-sidebar-foreground opacity-70" />
      <span className="truncate">{note.title}</span>
    </div>
  );
};

export const CreateFolderDialog = () => {
  const { createFolder } = useNotes();
  const [folderName, setFolderName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createFolder(folderName, null);
      setFolderName("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2">
          <PlusCircle size={16} className="mr-2" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFolder();
            }}
            autoFocus
          />
          <Button onClick={handleCreateFolder}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const CreateTagDialog = () => {
  const { createTag } = useNotes();
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("note-purple");
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: "Purple", value: "note-purple" },
    { name: "Blue", value: "note-blue" },
    { name: "Green", value: "note-green" },
    { name: "Red", value: "note-red" },
    { name: "Yellow", value: "note-yellow" },
    { name: "Pink", value: "note-pink" },
    { name: "Gray", value: "note-gray" },
  ];

  const handleCreateTag = () => {
    if (tagName.trim()) {
      createTag(tagName, tagColor);
      setTagName("");
      setIsOpen(false);
    }
  };

  const getColorClass = (colorValue: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2">
          <PlusCircle size={16} className="mr-2" />
          New Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Tag</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            placeholder="Tag name (without #)"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateTag();
            }}
            autoFocus
          />
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color.value}
                className={cn(
                  "h-8 w-8 rounded-full cursor-pointer transition-all",
                  getColorClass(color.value),
                  tagColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""
                )}
                onClick={() => setTagColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
          <Button onClick={handleCreateTag}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (value: boolean) => void }) => {
  const { folders, tags, createNote, searchQuery, updateSearchQuery } = useNotes();
  const [activeSection, setActiveSection] = useState<"folders" | "tags" | "all">("all");
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const rootFolders = folders.filter(folder => folder.parentId === null);
  
  const handleCreateNote = (folderId: string | null = null) => {
    createNote(folderId);
  };
  
  return (
    <div className={cn(
      "border-r border-sidebar-border h-screen flex flex-col bg-sidebar transition-all", 
      isCollapsed ? "w-[50px]" : "w-64"
    )}>
      <div className="h-14 border-b border-sidebar-border flex items-center px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu size={18} />
        </Button>
        {!isCollapsed && (
          <h1 className="font-semibold text-lg">InkWell</h1>
        )}
      </div>
      
      {!isCollapsed && (
        <>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="p-2">
            <Button 
              onClick={() => handleCreateNote()} 
              className="w-full"
            >
              <File size={16} className="mr-2" />
              New Note
            </Button>
          </div>
          
          <div className="flex items-center px-2 py-1">
            <button
              className={cn(
                "py-1 px-2 rounded-md text-sm flex-1 text-center transition-colors",
                activeSection === "all" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-secondary"
              )}
              onClick={() => setActiveSection("all")}
            >
              All
            </button>
            <button
              className={cn(
                "py-1 px-2 rounded-md text-sm flex-1 text-center transition-colors",
                activeSection === "folders" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-secondary"
              )}
              onClick={() => setActiveSection("folders")}
            >
              Folders
            </button>
            <button
              className={cn(
                "py-1 px-2 rounded-md text-sm flex-1 text-center transition-colors",
                activeSection === "tags" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-secondary"
              )}
              onClick={() => setActiveSection("tags")}
            >
              Tags
            </button>
          </div>
          
          <div className="flex-1 overflow-auto px-2 py-2">
            {(activeSection === "all" || activeSection === "folders") && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <FolderIcon size={16} className="mr-2 text-sidebar-foreground opacity-70" />
                    <h2 className="text-sm font-medium">Folders</h2>
                  </div>
                  <CreateFolderDialog />
                </div>
                <div className="mt-1">
                  {rootFolders.map(folder => (
                    <FolderItem 
                      key={folder.id} 
                      folder={folder} 
                      onClick={() => {}} 
                      onCreateNote={handleCreateNote}
                      isActive={false}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {(activeSection === "all" || activeSection === "tags") && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <TagIcon size={16} className="mr-2 text-sidebar-foreground opacity-70" />
                    <h2 className="text-sm font-medium">Tags</h2>
                  </div>
                  <CreateTagDialog />
                </div>
                <div className="mt-1">
                  {tags.map(tag => (
                    <TagItem key={tag.id} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-auto p-2 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Button>
            
            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
          </div>
        </>
      )}
    </div>
  );
};
