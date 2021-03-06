import { injectGlobal } from "emotion";

injectGlobal`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    touch-action: manipulation;
    height:100%;
    text-rendering: optimizeLegibility!important;
    -webkit-font-smoothing: antialiased!important;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: 'Roboto', sans-serif;
    background-attachment: fixed;
    overflow-x: none;
    height: 100%;
    background: #ECEEF1;

    color: #4A4A4A;
  }
  html, body, #__next {
    height: 100%
  }

  a {
    text-decoration: none;
    color: #4A4A4A;
  }

  a:hover {
    text-decoration: none;
  }

  .vgproLogoBg {
    width: 100%;
    height: 100%;
    background: url("/static/images/logo_bg.png") no-repeat;
    opacity: 0.5;
    background-position: center top;
    position: absolute;
    z-index: -1;
  }

  * {
    box-sizing:  border-box;
  }

  .visibleOnMobile {
    display: none;
    @media screen and (max-width: 800px) {
      display: block;
    }
  }
  .invisibleOnMobile {
    display: block;
    @media screen and (max-width: 800px) {
      display: none;
    }
  }
`;
