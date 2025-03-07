import { Button } from "@/components/ui/button";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
} from "lucide-react";
import { BiParagraph } from "react-icons/bi";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="flex gap-1">
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <Heading1 />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <Heading2 />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <Heading3 />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <BiParagraph />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Strikethrough />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <List />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <ListOrdered />
        </Button>
        <Button
          size="icon"
          variant="outline"
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Quote />
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
