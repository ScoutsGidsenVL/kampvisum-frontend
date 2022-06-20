/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue-leaflet/vue-leaflet';
declare module 'dropzone';
declare module 'vue-luxon';
declare module 'file-saver';
declare var process: NodeJS.Process;
