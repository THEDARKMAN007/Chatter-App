import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Showdown from 'showdown';

export const BlogPostCreator = () => {
  const [content, setContent] = useState<string>('');
  const converter = new Showdown.Converter();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // Save the "markdownContent" variable wherever you want (e.g., to a file, database, etc.).
  const saveContentInMarkdown = () => {
    const markdownContent = converter.makeMarkdown(content);
    console.log(markdownContent);
  };

  const wordCount = content.trim().split(/\s+/).length;

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={BlogPostCreator.modules}
        formats={BlogPostCreator.formats}
        placeholder="Write your content here..."
      />
      <div>
        Word Count: {wordCount}
      </div>
      <button onClick={saveContentInMarkdown}>Save as Markdown</button>
    </div>
  );
};

BlogPostCreator.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }], // Add alignment options
    [{ color: [] }, { background: [] }], // Add text color and background color options
    ['link', 'image'],
    ['clean'],
    [{ script: 'sub' }, { script: 'super' }], // Add subscript and superscript options
    [{ indent: '-1' }, { indent: '+1' }], // Add indentation options
    [{ direction: 'rtl' }], // Add right-to-left text direction option
    [{ size: ['small', false, 'large', 'huge'] }], // Add font size options
    [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }, { header: 5 }, { header: 6 }, { header: false }], // Add multiple header sizes
    ['video'], // Add video embedding option
    ['code', { language: 'javascript' }], // Add code syntax highlighting for JavaScript
  ],

  clipboard: {
    // Add a clean clipboard to strip out unsupported formatting when pasting content
    matchVisual: false,
  },
};

BlogPostCreator.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'list', 'bullet',
  'align', // Add alignment format
  'color', 'background', // Add text color and background color formats
  'link', 'image',
  'clean',
  'script', // Add subscript and superscript formats
  'indent', // Add indentation format
  'direction', // Add right-to-left text direction format
  'size', // Add font size format
  'video', // Add video embedding format
  'code', // Add code format
];