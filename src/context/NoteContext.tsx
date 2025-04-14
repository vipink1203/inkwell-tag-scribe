
import React, { createContext, useContext, useState, useEffect } from "react";
import { Note, Folder, Tag } from "@/types";
import { generateSampleData } from "@/lib/sample-data";

interface NoteContextType {
  notes: Note[];
  folders: Folder[];
  tags: Tag[];
  currentNote: Note | null;
  searchQuery: string;
  isEditing: boolean;
  updateSearchQuery: (query: string) => void;
  createNote: (folderId: string | null) => void;
  updateNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  selectNote: (noteId: string) => void;
  createFolder: (name: string, parentId: string | null) => void;
  updateFolder: (folder: Folder) => void;
  deleteFolder: (folderId: string) => void;
  createTag: (name: string, color: string) => void;
  updateTag: (tag: Tag) => void;
  deleteTag: (tagId: string) => void;
  addTagToNote: (noteId: string, tagId: string) => void;
  removeTagFromNote: (noteId: string, tagId: string) => void;
  setIsEditing: (value: boolean) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load data from localStorage or use sample data
    const savedNotes = localStorage.getItem("notes");
    const savedFolders = localStorage.getItem("folders");
    const savedTags = localStorage.getItem("tags");

    if (savedNotes && savedFolders && savedTags) {
      setNotes(JSON.parse(savedNotes));
      setFolders(JSON.parse(savedFolders));
      setTags(JSON.parse(savedTags));
    } else {
      const { notes, folders, tags } = generateSampleData();
      setNotes(notes);
      setFolders(folders);
      setTags(tags);
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    if (folders.length > 0) {
      localStorage.setItem("folders", JSON.stringify(folders));
    }
    if (tags.length > 0) {
      localStorage.setItem("tags", JSON.stringify(tags));
    }
  }, [notes, folders, tags]);

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const createNote = (folderId: string | null) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "# Untitled Note\n\nStart writing here...",
      folderId,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
    setCurrentNote(updatedNote);
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    if (currentNote?.id === noteId) {
      setCurrentNote(updatedNotes[0] || null);
    }
  };

  const selectNote = (noteId: string) => {
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      setCurrentNote(note);
      setIsEditing(false);
    }
  };

  const createFolder = (name: string, parentId: string | null) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId,
    };
    setFolders([...folders, newFolder]);
  };

  const updateFolder = (updatedFolder: Folder) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === updatedFolder.id ? updatedFolder : folder
    );
    setFolders(updatedFolders);
  };

  const deleteFolder = (folderId: string) => {
    // Delete the folder
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    setFolders(updatedFolders);

    // Move notes from this folder to root
    const updatedNotes = notes.map((note) =>
      note.folderId === folderId ? { ...note, folderId: null } : note
    );
    setNotes(updatedNotes);
  };

  const createTag = (name: string, color: string) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      name,
      color,
    };
    setTags([...tags, newTag]);
  };

  const updateTag = (updatedTag: Tag) => {
    const updatedTags = tags.map((tag) =>
      tag.id === updatedTag.id ? updatedTag : tag
    );
    setTags(updatedTags);
  };

  const deleteTag = (tagId: string) => {
    // Delete the tag
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setTags(updatedTags);

    // Remove tag from all notes
    const updatedNotes = notes.map((note) => ({
      ...note,
      tags: note.tags.filter((id) => id !== tagId),
    }));
    setNotes(updatedNotes);
  };

  const addTagToNote = (noteId: string, tagId: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId && !note.tags.includes(tagId)) {
        return {
          ...note,
          tags: [...note.tags, tagId],
          updatedAt: new Date().toISOString(),
        };
      }
      return note;
    });
    setNotes(updatedNotes);
    setCurrentNote(updatedNotes.find((note) => note.id === noteId) || null);
  };

  const removeTagFromNote = (noteId: string, tagId: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        return {
          ...note,
          tags: note.tags.filter((id) => id !== tagId),
          updatedAt: new Date().toISOString(),
        };
      }
      return note;
    });
    setNotes(updatedNotes);
    setCurrentNote(updatedNotes.find((note) => note.id === noteId) || null);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        folders,
        tags,
        currentNote,
        searchQuery,
        isEditing,
        updateSearchQuery,
        createNote,
        updateNote,
        deleteNote,
        selectNote,
        createFolder,
        updateFolder,
        deleteFolder,
        createTag,
        updateTag,
        deleteTag,
        addTagToNote,
        removeTagFromNote,
        setIsEditing,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};
