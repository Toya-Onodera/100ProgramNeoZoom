// FIXME: 型定義ファイルがないのでごまかしの型定義ファイル
// https://github.com/supermedium/aframe-react/issues/133
declare module "aframe-react";
declare namespace JSX {
  interface IntrinsicElements {
    "a-assets": any;
  }
}
