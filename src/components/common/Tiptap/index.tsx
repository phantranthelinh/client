import Link from "@tiptap/extension-link";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef } from "react";

import Toolbar from "./Menubar";
// define your extension array
const extensions = [
  StarterKit,
  Link.configure({
    openOnClick: false,
    defaultProtocol: "https",
  }),
];

type TiptapProps = {
  onChange: (body: string) => void;
  value?: string;
};

const Tiptap = forwardRef<HTMLInputElement, TiptapProps>(
  ({ onChange, value }, ref) => {
    const editor = useEditor({
      extensions,
      content: value,
      autofocus: false,
      editorProps: {
        attributes: {
          class: "focus:outline-none h-full",
        },
      },
      onUpdate: ({ editor }) => {
        if (editor) {
          const currentValue = editor.getHTML();
          onChange?.(currentValue);
        }
      },
    });

    return (
      <div className="p-2 border rounded-lg">
        <Toolbar editor={editor as Editor} />
        <EditorContent
          id="tiptap"
          ref={ref}
          editor={editor}
          className="mt-2 px-3 py-2 w-full h-full"
          placeholder="Enter text..."
        />
      </div>
    );
  }
);

export default Tiptap;
