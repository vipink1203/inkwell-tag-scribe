
import { useState, useEffect } from "react";
import { useNotes } from "@/context/NoteContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tag as TagType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  X, 
  Eye, 
  PenLine, 
  Tags as TagsIcon,
  Trash2
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { MarkdownPreview } from "./MarkdownPreview";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

export const TagSelector = () => {
  const { tags, currentNote, addTagToNote, removeTagFromNote } = useNotes();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentNote) return null;

  const handleToggleTag = (tagId: string) => {
    if (currentNote.tags.includes(tagId)) {
      removeTagFromNote(currentNote.id, tagId);
    } else {
      addTagToNote(currentNote.id, tagId);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <TagsIcon size={16} />
          <span>Tags</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-2">
          <h3 className="font-medium">Manage Tags</h3>
          <div className="grid grid-cols-2 gap-2">
            {tags.map((tag) => {
              const isActive = currentNote.tags.includes(tag.id);
              return (
                <Button
                  key={tag.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "justify-start",
                    isActive && `bg-${tag.color} hover:bg-${tag.color}/80`
                  )}
                  onClick={() => handleToggleTag(tag.id)}
                >
                  <div className={`h-2 w-2 rounded-full ${isActive ? "bg-white" : `bg-${tag.color}`} mr-2`} />
                  <span className="truncate">#{tag.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const NoteEditor = () => {
  const { currentNote, updateNote, deleteNote, tags, isEditing, setIsEditing } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    }
  }, [currentNote]);

  if (!currentNote) {
    return (
      <div className="flex h-screen items-center justify-center p-8 text-center text-muted-foreground">
        <div>
          <h3 className="text-2xl font-semibold mb-2">No Note Selected</h3>
          <p>Select a note from the sidebar or create a new one.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateNote({
      ...currentNote,
      title,
      content,
    });
    setIsEditing(false);
    toast({
      title: "Note saved",
      description: "Your changes have been saved.",
    });
  };

  const handleDelete = () => {
    deleteNote(currentNote.id);
    toast({
      title: "Note deleted",
      description: "The note has been removed.",
      variant: "destructive",
    });
  };

  const getTagById = (tagId: string): TagType | undefined => {
    return tags.find(tag => tag.id === tagId);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="h-14 border-b flex items-center justify-between px-4">
        <div className="flex items-center">
          {isEditing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-medium border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 max-w-md"
              placeholder="Note title..."
            />
          ) : (
            <h1 className="text-xl font-medium">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <TagSelector />
              
              <Button size="sm" variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                {isPreviewMode ? (
                  <>
                    <PenLine size={16} className="mr-1" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye size={16} className="mr-1" />
                    Preview
                  </>
                )}
              </Button>
              
              <Button size="sm" variant="default" onClick={handleSave}>
                <Save size={16} className="mr-1" />
                Save
              </Button>
              
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                <X size={16} />
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-1 mr-4">
                {currentNote.tags.map(tagId => {
                  const tag = getTagById(tagId);
                  if (!tag) return null;
                  return (
                    <Badge 
                      key={tag.id} 
                      className={`bg-${tag.color} hover:bg-${tag.color}/80`}
                    >
                      #{tag.name}
                    </Badge>
                  );
                })}
              </div>
              
              <Button size="sm" variant="default" onClick={() => setIsEditing(true)}>
                <PenLine size={16} className="mr-1" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this note? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4">
        {isEditing ? (
          isPreviewMode ? (
            <MarkdownPreview content={content} />
          ) : (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your note here..."
              className="w-full h-full min-h-[calc(100vh-8rem)] p-4 font-mono text-base resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          )
        ) : (
          <MarkdownPreview content={content} />
        )}
      </div>
    </div>
  );
};
