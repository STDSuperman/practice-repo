import React, { useState } from 'react';

const Routers = ['Home', 'List'];

export default () => {
  const [currentRoute, setRoute] = useState(Routers[0]);

  return (
    <div className="layout">
      <div className="layout-header">
        {Routers.map((router) => {
          return (
            <div
              className={`layout-header-btn ${router === currentRoute ? 'layout-header-btn-current' : ''}`}
              onClick={setRoute.bind(null, router)}
            >
              {router}
            </div>
          );
        })}
      </div>
    </div>
  );
};
