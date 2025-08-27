import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Code,
  CodeBlock,
  FindAndReplace,
  Link,
  SelectAll,
  ShowBlocks,
  Strikethrough,
  Table,
  Underline,
  Undo,
  List,
  ListProperties,
  TodoList,
  Mention,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "./textEditor.css";
import { useSelector } from "react-redux";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice";
import type { EmployeeSummaryType } from "../../constants/types";

interface TextEditor {
  value: string;
  onChange: (value: string) => void;
}
function TextEditor({ value, onChange }: TextEditor) {
  const { employees } = useSelector(selectedProjectDetails);
  const feedDetails = employees.map(
    (emp: EmployeeSummaryType) => `@${emp.firstName} ${emp.lastName}`
  );
  const handleChange = (_event: any, editor: any) => {
    const value = editor.getData();
    onChange(value);
  };

  const editorConfig = {
    licenseKey: "GPL",
    plugins: [
      Bold,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      Italic,
      Link,
      Paragraph,
      SelectAll,
      ShowBlocks,
      Table,
      Undo,
      Strikethrough,
      Underline,
      List,
      ListProperties,
      TodoList,
      Mention,
    ],
    toolbar: [
      "undo",
      "redo",
      "|",
      "showBlocks",
      "findAndReplace",
      "selectAll",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "code",
      "|",
      "numberedList",
      "bulletedList",
      "todoList",
      "|",
      "link",
      "insertTable",
      "codeBlock",
    ],
    mention: {
      feeds: [
        {
          marker: "@", // 👈 Trigger character
          feed: (query: string) =>
            feedDetails.filter((item) =>
              item.toLowerCase().includes(query.toLowerCase())
            ),
          minimumCharacters: 0,
        },
      ],
    },
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={handleChange}
      config={editorConfig as any}
    />
  );
}

export default TextEditor;
