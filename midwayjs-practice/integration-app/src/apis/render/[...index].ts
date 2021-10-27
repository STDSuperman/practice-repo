import { withController } from '@midwayjs/hooks';
// import ReactApp from '../../../build/static/ssr/server.bundle';
// import React from 'react'
// const ReactDOMServer = require('react-dom/server');

export default withController(
  {
    middleware: ['fmw:staticFile'],
  },
  async () => {
    return 'xxxx'
  }
);

// const renderSsrPage =  async () => {
//   const element = React.createElement(ReactApp);
//   const content = ReactDOMServer.renderToString(element);
//   return content;
// }