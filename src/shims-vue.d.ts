// declare module '*.vue' {
//   import Vue from 'vue';

//   export default Vue;
// }
// declare var process: any
declare let process: any;
declare module '*.vue' {
  import { defineComponent } from 'vue';

  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
