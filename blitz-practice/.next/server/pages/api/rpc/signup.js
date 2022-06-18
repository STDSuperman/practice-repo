"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/rpc/signup";
exports.ids = ["pages/api/rpc/signup"];
exports.modules = {

/***/ "./app/auth/mutations/signup.ts":
/*!**************************************!*\
  !*** ./app/auth/mutations/signup.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_data_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/data-client */ \"next/data-client\");\n/* harmony import */ var next_data_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_data_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_stdlib_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/stdlib-server */ \"next/stdlib-server\");\n/* harmony import */ var next_stdlib_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_stdlib_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! db */ \"./db/index.ts\");\n/* harmony import */ var app_auth_validations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/auth/validations */ \"./app/auth/validations.ts\");\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_data_client__WEBPACK_IMPORTED_MODULE_0__.buildRpcResolver)(next_stdlib_server__WEBPACK_IMPORTED_MODULE_1__.resolver.pipe(next_stdlib_server__WEBPACK_IMPORTED_MODULE_1__.resolver.zod(app_auth_validations__WEBPACK_IMPORTED_MODULE_3__.Signup), async ({\n  email,\n  password\n}, ctx) => {\n  const hashedPassword = await next_stdlib_server__WEBPACK_IMPORTED_MODULE_1__.SecurePassword.hash(password.trim());\n  const user = await db__WEBPACK_IMPORTED_MODULE_2__.default.user.create({\n    data: {\n      email: email.toLowerCase().trim(),\n      hashedPassword,\n      role: \"USER\"\n    },\n    select: {\n      id: true,\n      name: true,\n      email: true,\n      role: true\n    }\n  });\n  await ctx.session.$create({\n    userId: user.id,\n    role: user.role\n  });\n  return user;\n}), {\n  \"resolverName\": \"signup\",\n  \"resolverType\": \"mutation\",\n  \"routePath\": \"/api/rpc/signup\"\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvYXV0aC9tdXRhdGlvbnMvc2lnbnVwLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBR0EsaUVBQWUsbUVBQUFDLDZEQUFBLENBQWNBLDREQUFBLENBQWFFLHdEQUFiLENBQWQsRUFBb0MsT0FBTztBQUFFRyxFQUFBQSxLQUFGO0FBQVNDLEVBQUFBO0FBQVQsQ0FBUCxFQUE0QkMsR0FBNUIsS0FBb0M7QUFDckYsUUFBTUMsY0FBYyxHQUFHLE1BQU1ULG1FQUFBLENBQW9CTyxRQUFRLENBQUNJLElBQVQsRUFBcEIsQ0FBN0I7QUFDQSxRQUFNQyxJQUFJLEdBQUcsTUFBTVYsbURBQUEsQ0FBZTtBQUNoQ1ksSUFBQUEsSUFBSSxFQUFFO0FBQUVSLE1BQUFBLEtBQUssRUFBRUEsS0FBSyxDQUFDUyxXQUFOLEdBQW9CSixJQUFwQixFQUFUO0FBQXFDRixNQUFBQSxjQUFyQztBQUFxRE8sTUFBQUEsSUFBSSxFQUFFO0FBQTNELEtBRDBCO0FBRWhDQyxJQUFBQSxNQUFNLEVBQUU7QUFBRUMsTUFBQUEsRUFBRSxFQUFFLElBQU47QUFBWUMsTUFBQUEsSUFBSSxFQUFFLElBQWxCO0FBQXdCYixNQUFBQSxLQUFLLEVBQUUsSUFBL0I7QUFBcUNVLE1BQUFBLElBQUksRUFBRTtBQUEzQztBQUZ3QixHQUFmLENBQW5CO0FBS0EsUUFBTVIsR0FBRyxDQUFDWSxPQUFKLENBQVlDLE9BQVosQ0FBb0I7QUFBRUMsSUFBQUEsTUFBTSxFQUFFVixJQUFJLENBQUNNLEVBQWY7QUFBbUJGLElBQUFBLElBQUksRUFBRUosSUFBSSxDQUFDSTtBQUE5QixHQUFwQixDQUFOO0FBQ0EsU0FBT0osSUFBUDtBQUNELENBVGMsQ0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmxpdHotc3RhcnRlci8uL2FwcC9hdXRoL211dGF0aW9ucy9zaWdudXAudHM/MWJkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZXNvbHZlciwgU2VjdXJlUGFzc3dvcmQgfSBmcm9tIFwiYmxpdHpcIlxuaW1wb3J0IGRiIGZyb20gXCJkYlwiXG5pbXBvcnQgeyBTaWdudXAgfSBmcm9tIFwiYXBwL2F1dGgvdmFsaWRhdGlvbnNcIlxuaW1wb3J0IHsgUm9sZSB9IGZyb20gXCJ0eXBlc1wiXG5cbmV4cG9ydCBkZWZhdWx0IHJlc29sdmVyLnBpcGUocmVzb2x2ZXIuem9kKFNpZ251cCksIGFzeW5jICh7IGVtYWlsLCBwYXNzd29yZCB9LCBjdHgpID0+IHtcbiAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBTZWN1cmVQYXNzd29yZC5oYXNoKHBhc3N3b3JkLnRyaW0oKSlcbiAgY29uc3QgdXNlciA9IGF3YWl0IGRiLnVzZXIuY3JlYXRlKHtcbiAgICBkYXRhOiB7IGVtYWlsOiBlbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKSwgaGFzaGVkUGFzc3dvcmQsIHJvbGU6IFwiVVNFUlwiIH0sXG4gICAgc2VsZWN0OiB7IGlkOiB0cnVlLCBuYW1lOiB0cnVlLCBlbWFpbDogdHJ1ZSwgcm9sZTogdHJ1ZSB9LFxuICB9KVxuXG4gIGF3YWl0IGN0eC5zZXNzaW9uLiRjcmVhdGUoeyB1c2VySWQ6IHVzZXIuaWQsIHJvbGU6IHVzZXIucm9sZSBhcyBSb2xlIH0pXG4gIHJldHVybiB1c2VyXG59KVxuIl0sIm5hbWVzIjpbIlNlY3VyZVBhc3N3b3JkIiwicmVzb2x2ZXIiLCJkYiIsIlNpZ251cCIsInBpcGUiLCJ6b2QiLCJlbWFpbCIsInBhc3N3b3JkIiwiY3R4IiwiaGFzaGVkUGFzc3dvcmQiLCJoYXNoIiwidHJpbSIsInVzZXIiLCJjcmVhdGUiLCJkYXRhIiwidG9Mb3dlckNhc2UiLCJyb2xlIiwic2VsZWN0IiwiaWQiLCJuYW1lIiwic2Vzc2lvbiIsIiRjcmVhdGUiLCJ1c2VySWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/auth/mutations/signup.ts\n");

/***/ }),

/***/ "./app/auth/validations.ts":
/*!*********************************!*\
  !*** ./app/auth/validations.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"email\": () => (/* binding */ email),\n/* harmony export */   \"password\": () => (/* binding */ password),\n/* harmony export */   \"Signup\": () => (/* binding */ Signup),\n/* harmony export */   \"Login\": () => (/* binding */ Login),\n/* harmony export */   \"ForgotPassword\": () => (/* binding */ ForgotPassword),\n/* harmony export */   \"ResetPassword\": () => (/* binding */ ResetPassword),\n/* harmony export */   \"ChangePassword\": () => (/* binding */ ChangePassword)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"zod\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);\n\nconst email = zod__WEBPACK_IMPORTED_MODULE_0__.z.string().email().transform(str => str.toLowerCase().trim());\nconst password = zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(10).max(100).transform(str => str.trim());\nconst Signup = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n  email,\n  password\n});\nconst Login = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n  email,\n  password: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()\n});\nconst ForgotPassword = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n  email\n});\nconst ResetPassword = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n  password: password,\n  passwordConfirmation: password,\n  token: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()\n}).refine(data => data.password === data.passwordConfirmation, {\n  message: \"Passwords don't match\",\n  path: [\"passwordConfirmation\"] // set the path of the error\n\n});\nconst ChangePassword = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n  currentPassword: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),\n  newPassword: password\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAvYXV0aC92YWxpZGF0aW9ucy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUVPLE1BQU1DLEtBQUssR0FBR0QseUNBQUEsR0FFbEJDLEtBRmtCLEdBR2xCRSxTQUhrQixDQUdQQyxHQUFELElBQVNBLEdBQUcsQ0FBQ0MsV0FBSixHQUFrQkMsSUFBbEIsRUFIRCxDQUFkO0FBS0EsTUFBTUMsUUFBUSxHQUFHUCx5Q0FBQSxHQUVyQlEsR0FGcUIsQ0FFakIsRUFGaUIsRUFHckJDLEdBSHFCLENBR2pCLEdBSGlCLEVBSXJCTixTQUpxQixDQUlWQyxHQUFELElBQVNBLEdBQUcsQ0FBQ0UsSUFBSixFQUpFLENBQWpCO0FBTUEsTUFBTUksTUFBTSxHQUFHVix5Q0FBQSxDQUFTO0FBQzdCQyxFQUFBQSxLQUQ2QjtBQUU3Qk0sRUFBQUE7QUFGNkIsQ0FBVCxDQUFmO0FBS0EsTUFBTUssS0FBSyxHQUFHWix5Q0FBQSxDQUFTO0FBQzVCQyxFQUFBQSxLQUQ0QjtBQUU1Qk0sRUFBQUEsUUFBUSxFQUFFUCx5Q0FBQTtBQUZrQixDQUFULENBQWQ7QUFLQSxNQUFNYSxjQUFjLEdBQUdiLHlDQUFBLENBQVM7QUFDckNDLEVBQUFBO0FBRHFDLENBQVQsQ0FBdkI7QUFJQSxNQUFNYSxhQUFhLEdBQUdkLHlDQUFBLENBQ25CO0FBQ05PLEVBQUFBLFFBQVEsRUFBRUEsUUFESjtBQUVOUSxFQUFBQSxvQkFBb0IsRUFBRVIsUUFGaEI7QUFHTlMsRUFBQUEsS0FBSyxFQUFFaEIseUNBQUE7QUFIRCxDQURtQixFQU0xQmlCLE1BTjBCLENBTWxCQyxJQUFELElBQVVBLElBQUksQ0FBQ1gsUUFBTCxLQUFrQlcsSUFBSSxDQUFDSCxvQkFOZCxFQU1vQztBQUM3REksRUFBQUEsT0FBTyxFQUFFLHVCQURvRDtBQUU3REMsRUFBQUEsSUFBSSxFQUFFLENBQUMsc0JBQUQsQ0FGdUQsQ0FFN0I7O0FBRjZCLENBTnBDLENBQXRCO0FBV0EsTUFBTUMsY0FBYyxHQUFHckIseUNBQUEsQ0FBUztBQUNyQ3NCLEVBQUFBLGVBQWUsRUFBRXRCLHlDQUFBLEVBRG9CO0FBRXJDdUIsRUFBQUEsV0FBVyxFQUFFaEI7QUFGd0IsQ0FBVCxDQUF2QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JsaXR6LXN0YXJ0ZXIvLi9hcHAvYXV0aC92YWxpZGF0aW9ucy50cz9hNmQyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHogfSBmcm9tIFwiem9kXCJcblxuZXhwb3J0IGNvbnN0IGVtYWlsID0gelxuICAuc3RyaW5nKClcbiAgLmVtYWlsKClcbiAgLnRyYW5zZm9ybSgoc3RyKSA9PiBzdHIudG9Mb3dlckNhc2UoKS50cmltKCkpXG5cbmV4cG9ydCBjb25zdCBwYXNzd29yZCA9IHpcbiAgLnN0cmluZygpXG4gIC5taW4oMTApXG4gIC5tYXgoMTAwKVxuICAudHJhbnNmb3JtKChzdHIpID0+IHN0ci50cmltKCkpXG5cbmV4cG9ydCBjb25zdCBTaWdudXAgPSB6Lm9iamVjdCh7XG4gIGVtYWlsLFxuICBwYXNzd29yZCxcbn0pXG5cbmV4cG9ydCBjb25zdCBMb2dpbiA9IHoub2JqZWN0KHtcbiAgZW1haWwsXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLFxufSlcblxuZXhwb3J0IGNvbnN0IEZvcmdvdFBhc3N3b3JkID0gei5vYmplY3Qoe1xuICBlbWFpbCxcbn0pXG5cbmV4cG9ydCBjb25zdCBSZXNldFBhc3N3b3JkID0gelxuICAub2JqZWN0KHtcbiAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgcGFzc3dvcmRDb25maXJtYXRpb246IHBhc3N3b3JkLFxuICAgIHRva2VuOiB6LnN0cmluZygpLFxuICB9KVxuICAucmVmaW5lKChkYXRhKSA9PiBkYXRhLnBhc3N3b3JkID09PSBkYXRhLnBhc3N3b3JkQ29uZmlybWF0aW9uLCB7XG4gICAgbWVzc2FnZTogXCJQYXNzd29yZHMgZG9uJ3QgbWF0Y2hcIixcbiAgICBwYXRoOiBbXCJwYXNzd29yZENvbmZpcm1hdGlvblwiXSwgLy8gc2V0IHRoZSBwYXRoIG9mIHRoZSBlcnJvclxuICB9KVxuXG5leHBvcnQgY29uc3QgQ2hhbmdlUGFzc3dvcmQgPSB6Lm9iamVjdCh7XG4gIGN1cnJlbnRQYXNzd29yZDogei5zdHJpbmcoKSxcbiAgbmV3UGFzc3dvcmQ6IHBhc3N3b3JkLFxufSlcbiJdLCJuYW1lcyI6WyJ6IiwiZW1haWwiLCJzdHJpbmciLCJ0cmFuc2Zvcm0iLCJzdHIiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJwYXNzd29yZCIsIm1pbiIsIm1heCIsIlNpZ251cCIsIm9iamVjdCIsIkxvZ2luIiwiRm9yZ290UGFzc3dvcmQiLCJSZXNldFBhc3N3b3JkIiwicGFzc3dvcmRDb25maXJtYXRpb24iLCJ0b2tlbiIsInJlZmluZSIsImRhdGEiLCJtZXNzYWdlIiwicGF0aCIsIkNoYW5nZVBhc3N3b3JkIiwiY3VycmVudFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./app/auth/validations.ts\n");

/***/ }),

/***/ "./db/index.ts":
/*!*********************!*\
  !*** ./db/index.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_stdlib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/stdlib */ \"next/stdlib\");\n/* harmony import */ var next_stdlib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_stdlib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _prisma_client__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _prisma_client__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\nconst EnhancedPrisma = (0,next_stdlib__WEBPACK_IMPORTED_MODULE_0__.enhancePrisma)(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EnhancedPrisma());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kYi9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQSxNQUFNRSxjQUFjLEdBQUdGLDBEQUFhLENBQUNDLHdEQUFELENBQXBDO0FBRUE7QUFDQSxpRUFBZSxJQUFJQyxjQUFKLEVBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibGl0ei1zdGFydGVyLy4vZGIvaW5kZXgudHM/ZmI1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbmhhbmNlUHJpc21hIH0gZnJvbSBcImJsaXR6XCJcbmltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXG5cbmNvbnN0IEVuaGFuY2VkUHJpc21hID0gZW5oYW5jZVByaXNtYShQcmlzbWFDbGllbnQpXG5cbmV4cG9ydCAqIGZyb20gXCJAcHJpc21hL2NsaWVudFwiXG5leHBvcnQgZGVmYXVsdCBuZXcgRW5oYW5jZWRQcmlzbWEoKVxuIl0sIm5hbWVzIjpbImVuaGFuY2VQcmlzbWEiLCJQcmlzbWFDbGllbnQiLCJFbmhhbmNlZFByaXNtYSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./db/index.ts\n");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/data-client":
/*!***********************************!*\
  !*** external "next/data-client" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("next/data-client");

/***/ }),

/***/ "next/stdlib":
/*!******************************!*\
  !*** external "next/stdlib" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/stdlib");

/***/ }),

/***/ "next/stdlib-server":
/*!*************************************!*\
  !*** external "next/stdlib-server" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("next/stdlib-server");

/***/ }),

/***/ "zod":
/*!**********************!*\
  !*** external "zod" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("zod");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./app/auth/mutations/signup.ts"));
module.exports = __webpack_exports__;

})();