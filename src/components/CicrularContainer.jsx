import React from 'react'

export const CicrularContainer = (props) => {
    return (
        <div style={{ marginBottom: 80 }}>
          <hr style={{ border: "2px solid #ddd" }} />
          <div style={{ marginTop: 30, display: "flex" }}>
            <div style={{ width: "200%", paddingRight: 30 }}>{props.children}</div>
          </div>
        </div>
      );
}
