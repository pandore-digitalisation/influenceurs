"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./app/dashboard/page.tsx":
/*!********************************!*\
  !*** ./app/dashboard/page.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Dashboard() {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Récupérer le token depuis l'URL via searchParams\n        const token = searchParams.get(\"token\");\n        if (token) {\n            localStorage.setItem(\"auth_token\", token);\n            // Utiliser le token pour récupérer les données de l'utilisateur\n            const fetchUserData = async ()=>{\n                try {\n                    const response = await fetch(\"http://localhost:3000/auth/user\", {\n                        method: \"GET\",\n                        headers: {\n                            \"Content-Type\": \"application/json\",\n                            Authorization: \"Bearer \".concat(token)\n                        },\n                        credentials: \"include\"\n                    });\n                    if (!response.ok) {\n                        throw new Error(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es.\");\n                    }\n                    const data = await response.json();\n                    console.log(\"data\", data);\n                    // Sauvegarder les données utilisateur dans le localStorage pour les prochaines ouvertures du popup\n                    // localStorage.setItem(\"user_data\", JSON.stringify(data));\n                    // console.log(localStorage);\n                    setUser(data);\n                    sendDataToExtension(data);\n                } catch (error) {\n                    setError(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es utilisateur.\");\n                } finally{\n                    setLoading(false);\n                }\n            };\n            fetchUserData();\n        } else {\n            setError(\"Aucun token trouv\\xe9 dans l'URL.\");\n            setLoading(false);\n        }\n    }, [\n        searchParams\n    ]);\n    // // Send data to extension afeter user connected\n    const sendDataToExtension = (userData1)=>{\n        window.postMessage({\n            action: \"sendData\",\n            data: userData1\n        }, window.location.origin);\n    };\n    // Logout\n    const handleLogout = async ()=>{\n        try {\n            const token = localStorage.getItem(\"auth_token\");\n            if (!token) {\n                router.push(\"/login\");\n                return;\n            }\n            const response = await fetch(\"http://localhost:3000/auth/logout\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                credentials: \"include\"\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la d\\xe9connexion.\");\n            }\n            localStorage.removeItem(\"auth_token\");\n            sessionStorage.clear();\n            window.postMessage({\n                action: \"logoutUser\",\n                data: userData\n            }, window.location.origin);\n            window.location.href = \"/login\";\n        } catch (error) {\n            console.error(\"Erreur pendant la d\\xe9connexion:\", error);\n        }\n    };\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Chargement...\"\n        }, void 0, false, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 111,\n            columnNumber: 12\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Erreur: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 115,\n            columnNumber: 12\n        }, this);\n    }\n    if (!user) {\n        router.push(\"/login\");\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-end px-4 pt-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: user === null || user === void 0 ? void 0 : user.data.picture,\n                        alt: \"Photo de profil\",\n                        className: \"rounded-full w-8 h-8\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 127,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                    lineNumber: 126,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 125,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: [\n                    \"Bienvenue sur votre Dashboard \",\n                    user === null || user === void 0 ? void 0 : user.data.name,\n                    \"!\"\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 134,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Email : \",\n                            user === null || user === void 0 ? void 0 : user.data.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 136,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleLogout,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"D\\xe9connexion\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 137,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 135,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n        lineNumber: 124,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"PG9jfsbDXnqLO4TTv/OSWCha0sc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFbUQ7QUFDVTtBQUU5QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFNO0lBQ3RDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQWdCO0lBRWxELE1BQU1XLGVBQWVULGdFQUFlQTtJQUNwQyxNQUFNVSxTQUFTVCwwREFBU0E7SUFFeEJGLGdEQUFTQSxDQUFDO1FBQ1IsbURBQW1EO1FBQ25ELE1BQU1ZLFFBQVFGLGFBQWFHLEdBQUcsQ0FBQztRQUUvQixJQUFJRCxPQUFPO1lBQ1RFLGFBQWFDLE9BQU8sQ0FBQyxjQUFjSDtZQUVuQyxnRUFBZ0U7WUFDaEUsTUFBTUksZ0JBQWdCO2dCQUNwQixJQUFJO29CQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxtQ0FBbUM7d0JBQzlEQyxRQUFRO3dCQUNSQyxTQUFTOzRCQUNQLGdCQUFnQjs0QkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlQ7d0JBQzNCO3dCQUNBVSxhQUFhO29CQUNmO29CQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO3dCQUNoQixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLE9BQU8sTUFBTVIsU0FBU1MsSUFBSTtvQkFFaENDLFFBQVFDLEdBQUcsQ0FBQyxRQUFRSDtvQkFFcEIsbUdBQW1HO29CQUNuRywyREFBMkQ7b0JBQzNELDZCQUE2QjtvQkFFN0JwQixRQUFRb0I7b0JBQ1JJLG9CQUFvQko7Z0JBQ3RCLEVBQUUsT0FBT2pCLE9BQU87b0JBQ2RDLFNBQVM7Z0JBQ1gsU0FBVTtvQkFDUkYsV0FBVztnQkFDYjtZQUNGO1lBRUFTO1FBRUYsT0FBTztZQUNMUCxTQUFTO1lBQ1RGLFdBQVc7UUFDYjtJQUNGLEdBQUc7UUFBQ0c7S0FBYTtJQUVqQixrREFBa0Q7SUFDbEQsTUFBTW1CLHNCQUFzQixDQUFDQztRQUMzQkMsT0FBT0MsV0FBVyxDQUNoQjtZQUFFQyxRQUFRO1lBQVlSLE1BQU1LO1FBQVMsR0FDckNDLE9BQU9HLFFBQVEsQ0FBQ0MsTUFBTTtJQUUxQjtJQUVBLFNBQVM7SUFDVCxNQUFNQyxlQUFlO1FBQ25CLElBQUk7WUFDRixNQUFNeEIsUUFBUUUsYUFBYXVCLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUN6QixPQUFPO2dCQUNWRCxPQUFPMkIsSUFBSSxDQUFDO2dCQUNaO1lBQ0Y7WUFFQSxNQUFNckIsV0FBVyxNQUFNQyxNQUFNLHFDQUFxQztnQkFDaEVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO29CQUNoQkMsZUFBZSxVQUFnQixPQUFOVDtnQkFDM0I7Z0JBQ0FVLGFBQWE7WUFDZjtZQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQVYsYUFBYXlCLFVBQVUsQ0FBQztZQUV4QkMsZUFBZUMsS0FBSztZQUVwQlYsT0FBT0MsV0FBVyxDQUNoQjtnQkFBRUMsUUFBUTtnQkFBY1IsTUFBTUs7WUFBUyxHQUN2Q0MsT0FBT0csUUFBUSxDQUFDQyxNQUFNO1lBR3hCSixPQUFPRyxRQUFRLENBQUNRLElBQUksR0FBRztRQUN6QixFQUFFLE9BQU9sQyxPQUFPO1lBQ2RtQixRQUFRbkIsS0FBSyxDQUFDLHFDQUFrQ0E7UUFDbEQ7SUFFRjtJQUlBLElBQUlGLFNBQVM7UUFDWCxxQkFBTyw4REFBQ3FDO3NCQUFJOzs7Ozs7SUFDZDtJQUVBLElBQUluQyxPQUFPO1FBQ1QscUJBQU8sOERBQUNtQzs7Z0JBQUk7Z0JBQVNuQzs7Ozs7OztJQUN2QjtJQUVBLElBQUksQ0FBQ0osTUFBTTtRQUNUTyxPQUFPMkIsSUFBSSxDQUFDO1FBQ1osT0FBTztJQUNUO0lBRUEscUJBQ0UsOERBQUNNO1FBQUtDLFdBQVU7OzBCQUNkLDhEQUFDRjtnQkFBSUUsV0FBVTswQkFDYiw0RUFBQ0Y7b0JBQUlFLFdBQVU7OEJBQ2IsNEVBQUNDO3dCQUNDQyxHQUFHLEVBQUUzQyxpQkFBQUEsMkJBQUFBLEtBQU1xQixJQUFJLENBQUN1QixPQUFPO3dCQUN2QkMsS0FBSTt3QkFDSkosV0FBVTs7Ozs7Ozs7Ozs7Ozs7OzswQkFJaEIsOERBQUNLOztvQkFBRztvQkFBK0I5QyxpQkFBQUEsMkJBQUFBLEtBQU1xQixJQUFJLENBQUMwQixJQUFJO29CQUFDOzs7Ozs7OzBCQUNuRCw4REFBQ1I7Z0JBQUlFLFdBQVU7O2tDQUNiLDhEQUFDRjs7NEJBQUk7NEJBQVN2QyxpQkFBQUEsMkJBQUFBLEtBQU1xQixJQUFJLENBQUMyQixLQUFLOzs7Ozs7O2tDQUM5Qiw4REFBQ0M7d0JBQ0NDLFNBQVNsQjt3QkFDVFMsV0FBVTtrQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVQ7R0E1SXdCMUM7O1FBS0RGLDREQUFlQTtRQUNyQkMsc0RBQVNBOzs7S0FORkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2Rhc2hib2FyZC9wYWdlLnRzeD9kMTI1Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlU2VhcmNoUGFyYW1zLCB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhc2hib2FyZCgpIHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8YW55PihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdXNlU2VhcmNoUGFyYW1zKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gUsOpY3Vww6lyZXIgbGUgdG9rZW4gZGVwdWlzIGwnVVJMIHZpYSBzZWFyY2hQYXJhbXNcbiAgICBjb25zdCB0b2tlbiA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ0b2tlblwiKTtcblxuICAgIGlmICh0b2tlbikge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhdXRoX3Rva2VuXCIsIHRva2VuKTtcblxuICAgICAgLy8gVXRpbGlzZXIgbGUgdG9rZW4gcG91ciByw6ljdXDDqXJlciBsZXMgZG9ubsOpZXMgZGUgbCd1dGlsaXNhdGV1clxuICAgICAgY29uc3QgZmV0Y2hVc2VyRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvdXNlclwiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFcIiwgZGF0YSk7XG5cbiAgICAgICAgICAvLyBTYXV2ZWdhcmRlciBsZXMgZG9ubsOpZXMgdXRpbGlzYXRldXIgZGFucyBsZSBsb2NhbFN0b3JhZ2UgcG91ciBsZXMgcHJvY2hhaW5lcyBvdXZlcnR1cmVzIGR1IHBvcHVwXG4gICAgICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2RhdGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZSk7XG5cbiAgICAgICAgICBzZXRVc2VyKGRhdGEpO1xuICAgICAgICAgIHNlbmREYXRhVG9FeHRlbnNpb24oZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgc2V0RXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMgdXRpbGlzYXRldXIuXCIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmZXRjaFVzZXJEYXRhKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RXJyb3IoXCJBdWN1biB0b2tlbiB0cm91dsOpIGRhbnMgbCdVUkwuXCIpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbc2VhcmNoUGFyYW1zXSk7XG5cbiAgLy8gLy8gU2VuZCBkYXRhIHRvIGV4dGVuc2lvbiBhZmV0ZXIgdXNlciBjb25uZWN0ZWRcbiAgY29uc3Qgc2VuZERhdGFUb0V4dGVuc2lvbiA9ICh1c2VyRGF0YTogYW55KSA9PiB7XG4gICAgd2luZG93LnBvc3RNZXNzYWdlKFxuICAgICAgeyBhY3Rpb246IFwic2VuZERhdGFcIiwgZGF0YTogdXNlckRhdGEgfSxcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW5cbiAgICApO1xuICB9O1xuXG4gIC8vIExvZ291dFxuICBjb25zdCBoYW5kbGVMb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhdXRoX3Rva2VuXCIpO1xuICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvbG9nb3V0XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSBkw6ljb25uZXhpb24uXCIpO1xuICAgICAgfVxuXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImF1dGhfdG9rZW5cIik7XG5cbiAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG5cbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShcbiAgICAgICAgeyBhY3Rpb246IFwibG9nb3V0VXNlclwiLCBkYXRhOiB1c2VyRGF0YSB9LFxuICAgICAgICB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAgICApO1xuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luXCI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgcGVuZGFudCBsYSBkw6ljb25uZXhpb246XCIsIGVycm9yKTtcbiAgICB9XG5cbiAgfTtcblxuICBcblxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiA8ZGl2PkNoYXJnZW1lbnQuLi48L2Rpdj47XG4gIH1cblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gPGRpdj5FcnJldXI6IHtlcnJvcn08L2Rpdj47XG4gIH1cblxuICBpZiAoIXVzZXIpIHtcbiAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPG1haW4gY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gcHgtNCBweS04XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgcHgtNCBwdC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy04IGgtOCBvdmVyZmxvdy1oaWRkZW4gYmctZ3JheS0xMDAgcm91bmRlZC1mdWxsIGRhcms6YmctZ3JheS02MDBcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9e3VzZXI/LmRhdGEucGljdHVyZX1cbiAgICAgICAgICAgIGFsdD1cIlBob3RvIGRlIHByb2ZpbFwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLWZ1bGwgdy04IGgtOFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxoMT5CaWVudmVudWUgc3VyIHZvdHJlIERhc2hib2FyZCB7dXNlcj8uZGF0YS5uYW1lfSE8L2gxPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8ZGl2PkVtYWlsIDoge3VzZXI/LmRhdGEuZW1haWx9PC9kaXY+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVMb2dvdXR9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmctcmVkLTUwMCB0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIETDqWNvbm5leGlvblxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlU2VhcmNoUGFyYW1zIiwidXNlUm91dGVyIiwiRGFzaGJvYXJkIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJzZWFyY2hQYXJhbXMiLCJyb3V0ZXIiLCJ0b2tlbiIsImdldCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJmZXRjaFVzZXJEYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiY3JlZGVudGlhbHMiLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwic2VuZERhdGFUb0V4dGVuc2lvbiIsInVzZXJEYXRhIiwid2luZG93IiwicG9zdE1lc3NhZ2UiLCJhY3Rpb24iLCJsb2NhdGlvbiIsIm9yaWdpbiIsImhhbmRsZUxvZ291dCIsImdldEl0ZW0iLCJwdXNoIiwicmVtb3ZlSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiY2xlYXIiLCJocmVmIiwiZGl2IiwibWFpbiIsImNsYXNzTmFtZSIsImltZyIsInNyYyIsInBpY3R1cmUiLCJhbHQiLCJoMSIsIm5hbWUiLCJlbWFpbCIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/page.tsx\n"));

/***/ })

});