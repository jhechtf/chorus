import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from 'codemirror';
import { tags } from '@lezer/highlight';

export const newMoonEditorTheme = EditorView.theme(
  {
    '.cm-scroller': {
      overflow: 'auto',
    },
    '.cm-wrap': {
      height: '100%',
    },
    '&': {
      backgroundColor: '#2d2d2d',
      color: '#b3b9c5',
    },
    '.cm-content': {
      caretColor: '#3b4252',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#3b4252',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: '#eceff4',
    },
    '.cm-activeLine': {
      backgroundColor: '#eceff4',
    },
    '.cm-searchMatch': {
      backgroundColor: '#72a1ff',
    },
    '.cm-gutters': {
      backgroundColor: '#2d2d2d',
      color: '#fff',
    },
  },
  {
    dark: true,
  },
);

export const newMoonHighlighter = HighlightStyle.define(
  [
    {
      tag: [tags.keyword],
      color: '#ffeea6',
    },
    {
      tag: [tags.string],
      color: '#92d192',
    },
    {
      tag: [tags.function(tags.variableName)],
      color: '#ffffff',
    },
    {
      tag: [tags.variableName],
      color: '#f2777a',
    },
    {
      tag: [tags.brace],
      color: '#8fbcbb',
    },
    {
      tag: [tags.annotation],
      color: '#d30102',
    },
    {
      tag: [tags.typeName],
      color: '#ebcb8b',
    },
    {
      tag: [tags.className],
      color: '#ebcb8b',
    },
    {
      tag: [tags.operator, tags.operatorKeyword],
      color: '#ac8d58',
    },
    {
      tag: [tags.squareBracket],
      color: '#8fbcbb',
    },
    {
      tag: [tags.angleBracket],
      color: '#8fbcbb',
    },
  ],
  { themeType: 'dark' },
);
console.info(newMoonEditorTheme);
export const NewMoonExtension = [
  newMoonEditorTheme,
  syntaxHighlighting(newMoonHighlighter),
] as const;
