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
import { getTheme } from "../../utils/redux/slices/commonSlice";

interface TextEditor {
  value: string;
  onChange: (value: string) => void;
  handleFocus?: () => void;
  height?: string;
  ref?: any;
}
function TextEditor({
  value,
  onChange,
  handleFocus = () => {},
  height = "250px",
  ref,
}: TextEditor) {
  const theme = useSelector(getTheme);
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
    placeholder: "Type your content here...",
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
    <>
      <div className="my-editor">
        <CKEditor
          onReady={(editor) => {
            if (ref) ref.current = editor;
          }}
          editor={ClassicEditor}
          data={value}
          onChange={handleChange}
          onFocus={handleFocus}
          config={editorConfig as any}
        />
      </div>
      <style>{`
        .my-editor .ck-editor__editable_inline {
          min-height: ${height};
        }
        .ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
        .ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
          color: ${theme.textEditorColor};
          background-color: ${theme.textEditorBgColor};
        }
        .ck.ck-reset_all,
        .ck-reset_all *:not(.ck-reset_all-excluded *) {
          color: ${theme.textEditorColor};
          background-color: ${theme.textEditorBgColor};
        }
        .ck.ck-list__item > .ck-button.ck-on:not(.ck-list-item-button) {
          color: ${theme.textEditorColor};
        }
      `}</style>
    </>
  );
}

export default TextEditor;
