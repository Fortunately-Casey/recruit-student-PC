<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  min-width: 1680px;
  min-height: 900px;
}
@font-color: #64b3ed;
#app {
  font-family: "free", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

/*滚动条样式 */
::-webkit-scrollbar-track-piece {
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #b8b8b8;
  -webkit-border-radius: 6px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
::-webkit-scrollbar-thumb:hover {
  height: 50px;
  background-color: #878987;
  -webkit-border-radius: 6px;
}
.ivu-page-item:hover {
  border-color:@font-color !important;
  background-color:@font-color;
  a {
    color: #fff !important;
  }
}
// .ivu-table-header thead tr{
//   background-color:@font-color !important;
// }
.ivu-table th {
  background-color:@font-color !important;
}
.ivu-table-header .ivu-table-cell span {
  color: #fff !important;
}
.ivu-input:hover {
  border-color:@font-color !important;
}
.ivu-input:focus {
  border-color:@font-color !important;
}
</style>
