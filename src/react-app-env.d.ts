import "styled-components";

/// <reference types="react-scripts" />

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
  }
}
