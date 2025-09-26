/*
 * @Author: huanggang huanggang@imilab.com
 * @Date: 2025-09-26 13:52:54
 * @LastEditors: huanggang huanggang@imilab.com
 * @LastEditTime: 2025-09-26 14:12:55
 * @FilePath: /HGAI_Cursor/react_project/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import HGGuideVideoListView from "./components/HGGuideVideoListView";
import "./components/HGGuideVideoListView.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HGGuideVideoListView />);
