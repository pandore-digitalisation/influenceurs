"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./components/login/login-form.tsx":
/*!*****************************************!*\
  !*** ./components/login/login-form.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Login: function() { return /* binding */ Login; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.tsx\");\n/* __next_internal_client_entry_do_not_use__ Login auto */ \nvar _s = $RefreshSig$();\n\n\nconst BASE_URL = \"https://influenceur-list.onrender.com\";\n// const BASE_URL = \"http://localhost:3000\";\nfunction Login(param) {\n    let { className, ...props } = param;\n    _s();\n    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setIsClient(true);\n    }, []);\n    if (!isClient) return null;\n    const handleGoogleLogin = ()=>{\n        window.location.href = \"\".concat(BASE_URL, \"/auth/google\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n        className: \"flex flex-col gap-6\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center gap-2 text-center \",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-bold\",\n                        children: \"Bienvenue \\xe0 nouveau\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-balance text-sm text-muted-foreground\",\n                        children: \"Veuillez cliquer sur le bouton suivant pour continuer.\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid gap-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    variant: \"outline\",\n                    className: \"w-full\",\n                    type: \"button\",\n                    onClick: handleGoogleLogin,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                            className: \"w-4 h-4 me-2\",\n                            xmlns: \"http://www.w3.org/2000/svg\",\n                            viewBox: \"0 0 18 19\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                fillRule: \"evenodd\",\n                                d: \"M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z\",\n                                clipRule: \"evenodd\"\n                            }, void 0, false, {\n                                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 11\n                        }, this),\n                        \"Continuer avec Google\"\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                    lineNumber: 37,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/components/login/login-form.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, this);\n}\n_s(Login, \"k460N28PNzD7zo1YW47Q9UigQis=\");\n_c = Login;\nvar _c;\n$RefreshReg$(_c, \"Login\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvbG9naW4vbG9naW4tZm9ybS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVtRDtBQUVIO0FBRWhELE1BQU1JLFdBQVc7QUFDakIsNENBQTRDO0FBSXJDLFNBQVNDLE1BQU0sS0FHbUI7UUFIbkIsRUFDcEJDLFNBQVMsRUFDVCxHQUFHQyxPQUNvQyxHQUhuQjs7SUFJcEIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdQLCtDQUFRQSxDQUFDO0lBRXpDRCxnREFBU0EsQ0FBQztRQUNSUSxZQUFZO0lBQ2QsR0FBRyxFQUFFO0lBRUwsSUFBSSxDQUFDRCxVQUFVLE9BQU87SUFFdEIsTUFBTUUsb0JBQW9CO1FBQ3hCQyxPQUFPQyxRQUFRLENBQUNDLElBQUksR0FBRyxHQUFZLE9BQVRULFVBQVM7SUFDckM7SUFFQSxxQkFDRSw4REFBQ1U7UUFBS1IsV0FBVTs7MEJBQ2QsOERBQUNTO2dCQUFJVCxXQUFVOztrQ0FDYiw4REFBQ1U7d0JBQUdWLFdBQVU7a0NBQXFCOzs7Ozs7a0NBQ25DLDhEQUFDVzt3QkFBRVgsV0FBVTtrQ0FBNkM7Ozs7Ozs7Ozs7OzswQkFJNUQsOERBQUNTO2dCQUFJVCxXQUFVOzBCQUNiLDRFQUFDSCx5REFBTUE7b0JBQ0xlLFNBQVE7b0JBQ1JaLFdBQVU7b0JBQ1ZhLE1BQUs7b0JBQ0xDLFNBQVNWOztzQ0FFVCw4REFBQ1c7NEJBQ0NmLFdBQVU7NEJBQ1ZnQixPQUFNOzRCQUNOQyxTQUFRO3NDQUVSLDRFQUFDQztnQ0FDQ0MsVUFBUztnQ0FDVEMsR0FBRTtnQ0FDRkMsVUFBUzs7Ozs7Ozs7Ozs7d0JBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1oQjtHQS9DZ0J0QjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLWZvcm0udHN4PzgzMDgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbiB9IGZyb20gXCJAL2xpYi91dGlsc1wiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcblxuY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vaW5mbHVlbmNldXItbGlzdC5vbnJlbmRlci5jb21cIjtcbi8vIGNvbnN0IEJBU0VfVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBMb2dpbih7XG4gIGNsYXNzTmFtZSxcbiAgLi4ucHJvcHNcbn06IFJlYWN0LkNvbXBvbmVudFByb3BzV2l0aG91dFJlZjxcImZvcm1cIj4pIHtcbiAgY29uc3QgW2lzQ2xpZW50LCBzZXRJc0NsaWVudF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRJc0NsaWVudCh0cnVlKTtcbiAgfSwgW10pO1xuXG4gIGlmICghaXNDbGllbnQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZUdvb2dsZUxvZ2luID0gKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7QkFTRV9VUkx9L2F1dGgvZ29vZ2xlYDtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxmb3JtIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTZcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1jZW50ZXIgXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGRcIj5CaWVudmVudWUgw6Agbm91dmVhdTwvaDE+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtYmFsYW5jZSB0ZXh0LXNtIHRleHQtbXV0ZWQtZm9yZWdyb3VuZFwiPlxuICAgICAgICAgIFZldWlsbGV6IGNsaXF1ZXIgc3VyIGxlIGJvdXRvbiBzdWl2YW50IHBvdXIgY29udGludWVyLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtNlwiPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgdmFyaWFudD1cIm91dGxpbmVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlR29vZ2xlTG9naW59XG4gICAgICAgID5cbiAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IG1lLTJcIlxuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDE4IDE5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBmaWxsUnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICBkPVwiTTguODQyIDE4LjA4M2E4LjggOC44IDAgMCAxLTguNjUtOC45NDggOC44NDEgOC44NDEgMCAwIDEgOC44LTguNjUyaC4xNTNhOC40NjQgOC40NjQgMCAwIDEgNS43IDIuMjU3bC0yLjE5MyAyLjAzOEE1LjI3IDUuMjcgMCAwIDAgOS4wOSAzLjRhNS44ODIgNS44ODIgMCAwIDAtLjIgMTEuNzZoLjEyNGE1LjA5MSA1LjA5MSAwIDAgMCA1LjI0OC00LjA1N0wxNC4zIDExSDlWOGg4LjM0Yy4wNjYuNTQzLjA5NSAxLjA5LjA4OCAxLjYzNi0uMDg2IDUuMDUzLTMuNDYzIDguNDQ5LTguNCA4LjQ0OWwtLjE4Ni0uMDAyWlwiXG4gICAgICAgICAgICAgIGNsaXBSdWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIENvbnRpbnVlciBhdmVjIEdvb2dsZVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQnV0dG9uIiwiQkFTRV9VUkwiLCJMb2dpbiIsImNsYXNzTmFtZSIsInByb3BzIiwiaXNDbGllbnQiLCJzZXRJc0NsaWVudCIsImhhbmRsZUdvb2dsZUxvZ2luIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZm9ybSIsImRpdiIsImgxIiwicCIsInZhcmlhbnQiLCJ0eXBlIiwib25DbGljayIsInN2ZyIsInhtbG5zIiwidmlld0JveCIsInBhdGgiLCJmaWxsUnVsZSIsImQiLCJjbGlwUnVsZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/login/login-form.tsx\n"));

/***/ })

});