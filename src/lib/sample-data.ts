
import { Note, Folder, Tag } from "@/types";

export const generateSampleData = () => {
  const folders: Folder[] = [
    {
      id: "folder-1",
      name: "Getting Started",
      parentId: null,
    },
    {
      id: "folder-2",
      name: "Projects",
      parentId: null,
    },
    {
      id: "folder-3",
      name: "Personal",
      parentId: null,
    },
  ];

  const tags: Tag[] = [
    {
      id: "tag-1",
      name: "important",
      color: "note-red",
    },
    {
      id: "tag-2",
      name: "work",
      color: "note-blue",
    },
    {
      id: "tag-3",
      name: "idea",
      color: "note-purple",
    },
    {
      id: "tag-4",
      name: "todo",
      color: "note-yellow",
    },
    {
      id: "tag-5",
      name: "reference",
      color: "note-green",
    },
  ];

  const notes: Note[] = [
    {
      id: "note-1",
      title: "Welcome to InkWell",
      content: `# Welcome to InkWell!

InkWell is a markdown-based note-taking app with powerful features to help you organize your thoughts.

## Features

- **Markdown Support**: Write using markdown syntax with live preview
- **Folders**: Organize your notes in folders
- **Tags**: Categorize notes with colorful tags
- **Search**: Quickly find any note
- **Syntax Highlighting**: Code blocks are beautifully highlighted

## Markdown Examples

### Text Formatting

You can write in **bold**, *italic*, or ~~strikethrough~~.

### Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Code

Inline code: \`const greeting = "Hello World";\`

Code block with syntax highlighting:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("User"));
\`\`\`

### Blockquotes

> This is a blockquote
> It can span multiple lines

### Links and Images

[Link to Google](https://google.com)

### Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

Enjoy using InkWell for all your note-taking needs!`,
      folderId: "folder-1",
      tags: ["tag-5"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "note-2",
      title: "Project Ideas",
      content: `# Project Ideas

## Web Development
- Create a personal portfolio website
- Build a weather app with React
- Develop a recipe finder app

## Mobile Apps
- Habit tracker with reminders
- Language learning flashcards
- Minimalist to-do list

## Machine Learning
- Image classification for plant species
- Sentiment analysis for product reviews
- Music recommendation engine

## Game Development
- 2D platformer with procedural level generation
- Text-based adventure game
- Puzzle game with increasing difficulty

Need to prioritize these and start working on them soon!`,
      folderId: "folder-2",
      tags: ["tag-3"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "note-3",
      title: "Weekly Tasks",
      content: `# Weekly Tasks

## Monday
- [x] Team meeting (9:00 AM)
- [x] Review project requirements
- [ ] Send follow-up emails

## Tuesday
- [ ] Work on database design
- [ ] Update documentation
- [ ] Virtual coffee chat with mentor

## Wednesday
- [ ] Implement new API endpoints
- [ ] Code review for PR #42
- [ ] Debugging session

## Thursday
- [ ] UI improvements for dashboard
- [ ] Write tests for new features
- [ ] Project planning for next sprint

## Friday
- [ ] Weekly summary report
- [ ] Team retrospective
- [ ] Plan for next week

**Remember:** Update task list daily and prioritize based on deadline.`,
      folderId: "folder-2",
      tags: ["tag-2", "tag-4"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "note-4",
      title: "Reading List",
      content: `# Reading List

## Currently Reading
- "Atomic Habits" by James Clear
- "The Pragmatic Programmer" by Andrew Hunt and David Thomas

## Next Up
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "Deep Work" by Cal Newport
- "The Psychology of Money" by Morgan Housel

## Recommended by Friends
- "Sapiens" by Yuval Noah Harari
- "The Almanack of Naval Ravikant"
- "Thinking, Fast and Slow" by Daniel Kahneman

## Technical Books to Consider
- "Clean Code" by Robert C. Martin
- "Refactoring" by Martin Fowler
- "Domain-Driven Design" by Eric Evans

*Remember to check the local library or e-book availability before purchasing!*`,
      folderId: "folder-3",
      tags: ["tag-5"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "note-5",
      title: "Vacation Planning",
      content: `# Summer Vacation Planning

## Destination Ideas
- Barcelona, Spain
- Kyoto, Japan
- Vancouver, Canada
- Santorini, Greece

## Budget Breakdown
| Category | Estimated Cost |
| -------- | -------------- |
| Flights  | $800 - $1200   |
| Lodging  | $1000 - $1500  |
| Food     | $500 - $700    |
| Activities | $400 - $600  |
| Misc     | $300           |
| **Total**| $3000 - $4300  |

## Pre-Trip Checklist
- [ ] Research visa requirements
- [ ] Book flights
- [ ] Reserve accommodations
- [ ] Purchase travel insurance
- [ ] Notify bank of travel plans
- [ ] Set up mail hold
- [ ] Create packing list

## Must-See Attractions
Depends on final destination, but should include:
- Local cultural sites
- Natural landscapes
- Food experiences
- Off-the-beaten-path neighborhoods

Need to make final decision by end of month to get the best deals!`,
      folderId: "folder-3",
      tags: ["tag-3", "tag-4"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return { notes, folders, tags };
};
