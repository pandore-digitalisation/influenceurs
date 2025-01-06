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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Dashboard() {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Récupérer le token depuis l'URL via searchParams\n        const token = searchParams.get(\"token\");\n        if (token) {\n            localStorage.setItem(\"auth_token\", token);\n            // Utiliser le token pour récupérer les données de l'utilisateur\n            const fetchUserData = async ()=>{\n                try {\n                    const response = await fetch(\"http://localhost:3000/auth/user\", {\n                        method: \"GET\",\n                        headers: {\n                            \"Content-Type\": \"application/json\",\n                            Authorization: \"Bearer \".concat(token)\n                        },\n                        credentials: \"include\"\n                    });\n                    if (!response.ok) {\n                        throw new Error(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es.\");\n                    }\n                    const data = await response.json();\n                    console.log(\"data\", data);\n                    // Sauvegarder les données utilisateur dans le localStorage pour les prochaines ouvertures du popup\n                    localStorage.setItem(\"user_data\", JSON.stringify(data));\n                    console.log(localStorage);\n                    setUser(data);\n                    sendDataToExtension(data);\n                } catch (error) {\n                    setError(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es utilisateur.\");\n                } finally{\n                    setLoading(false);\n                }\n            };\n            fetchUserData();\n            // Send data to extension afeter user connected\n            const sendDataToExtension = async (userData)=>{\n                userData = JSON.parse(localStorage.getItem(\"user_data\") || \"null\");\n                if (!userData) {\n                    const updateUserData = await fetchUserData();\n                    if (updateUserData) {\n                        window.postMessage({\n                            action: \"sendData\",\n                            data: up\n                        });\n                    }\n                }\n                window.postMessage({\n                    action: \"sendData\",\n                    data: userData\n                }, window.location.origin);\n            };\n        } else {\n            setError(\"Aucun token trouv\\xe9 dans l'URL.\");\n            setLoading(false);\n        }\n    }, [\n        searchParams\n    ]);\n    // // Send data to extension afeter user connected\n    // const sendDataToExtension = (userData: any) => {\n    //   window.postMessage(\n    //     { action: \"sendData\", data: userData },\n    //     window.location.origin\n    //   );\n    // };\n    // Logout\n    const handleLogout = async ()=>{\n        try {\n            const token = localStorage.getItem(\"auth_token\");\n            if (!token) {\n                router.push(\"/login\");\n                return;\n            }\n            const response = await fetch(\"http://localhost:3000/auth/logout\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                credentials: \"include\"\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la d\\xe9connexion.\");\n            }\n            localStorage.removeItem(\"auth_token\");\n            sessionStorage.clear();\n            window.location.href = \"/login\";\n        } catch (error) {\n            console.error(\"Erreur pendant la d\\xe9connexion:\", error);\n        }\n    };\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Chargement...\"\n        }, void 0, false, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 123,\n            columnNumber: 12\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Erreur: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 127,\n            columnNumber: 12\n        }, this);\n    }\n    if (!user) {\n        router.push(\"/login\");\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-end px-4 pt-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: user === null || user === void 0 ? void 0 : user.data.picture,\n                        alt: \"Photo de profil\",\n                        className: \"rounded-full w-8 h-8\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                    lineNumber: 138,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 137,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: [\n                    \"Bienvenue sur votre Dashboard \",\n                    user === null || user === void 0 ? void 0 : user.data.name,\n                    \"!\"\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 146,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Email : \",\n                            user === null || user === void 0 ? void 0 : user.data.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 148,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleLogout,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"D\\xe9connexion\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 149,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 147,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n        lineNumber: 136,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"PG9jfsbDXnqLO4TTv/OSWCha0sc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFbUQ7QUFDVTtBQUU5QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFNO0lBQ3RDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQWdCO0lBRWxELE1BQU1XLGVBQWVULGdFQUFlQTtJQUNwQyxNQUFNVSxTQUFTVCwwREFBU0E7SUFFeEJGLGdEQUFTQSxDQUFDO1FBQ1IsbURBQW1EO1FBQ25ELE1BQU1ZLFFBQVFGLGFBQWFHLEdBQUcsQ0FBQztRQUUvQixJQUFJRCxPQUFPO1lBQ1RFLGFBQWFDLE9BQU8sQ0FBQyxjQUFjSDtZQUVuQyxnRUFBZ0U7WUFDaEUsTUFBTUksZ0JBQWdCO2dCQUNwQixJQUFJO29CQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxtQ0FBbUM7d0JBQzlEQyxRQUFRO3dCQUNSQyxTQUFTOzRCQUNQLGdCQUFnQjs0QkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlQ7d0JBQzNCO3dCQUNBVSxhQUFhO29CQUNmO29CQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO3dCQUNoQixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLE9BQU8sTUFBTVIsU0FBU1MsSUFBSTtvQkFFaENDLFFBQVFDLEdBQUcsQ0FBQyxRQUFRSDtvQkFFcEIsbUdBQW1HO29CQUNuR1gsYUFBYUMsT0FBTyxDQUFDLGFBQWFjLEtBQUtDLFNBQVMsQ0FBQ0w7b0JBQ2pERSxRQUFRQyxHQUFHLENBQUNkO29CQUVaVCxRQUFRb0I7b0JBQ1JNLG9CQUFvQk47Z0JBQ3RCLEVBQUUsT0FBT2pCLE9BQU87b0JBQ2RDLFNBQVM7Z0JBQ1gsU0FBVTtvQkFDUkYsV0FBVztnQkFDYjtZQUNGO1lBRUFTO1lBRUEsK0NBQStDO1lBQy9DLE1BQU1lLHNCQUFzQixPQUFPQztnQkFDakNBLFdBQVdILEtBQUtJLEtBQUssQ0FBQ25CLGFBQWFvQixPQUFPLENBQUMsZ0JBQWdCO2dCQUUzRCxJQUFHLENBQUNGLFVBQVU7b0JBQ1osTUFBTUcsaUJBQWlCLE1BQU1uQjtvQkFFN0IsSUFBSW1CLGdCQUFnQjt3QkFDbEJDLE9BQU9DLFdBQVcsQ0FDaEI7NEJBQUNDLFFBQVE7NEJBQVliLE1BQU1jO3dCQUFFO29CQUVqQztnQkFDRjtnQkFFQUgsT0FBT0MsV0FBVyxDQUNoQjtvQkFBRUMsUUFBUTtvQkFBWWIsTUFBTU87Z0JBQVMsR0FDckNJLE9BQU9JLFFBQVEsQ0FBQ0MsTUFBTTtZQUUxQjtRQUVGLE9BQU87WUFDTGhDLFNBQVM7WUFDVEYsV0FBVztRQUNiO0lBQ0YsR0FBRztRQUFDRztLQUFhO0lBRWpCLGtEQUFrRDtJQUNsRCxtREFBbUQ7SUFDbkQsd0JBQXdCO0lBQ3hCLDhDQUE4QztJQUM5Qyw2QkFBNkI7SUFDN0IsT0FBTztJQUNQLEtBQUs7SUFFTCxTQUFTO0lBQ1QsTUFBTWdDLGVBQWU7UUFDbkIsSUFBSTtZQUNGLE1BQU05QixRQUFRRSxhQUFhb0IsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQ3RCLE9BQU87Z0JBQ1ZELE9BQU9nQyxJQUFJLENBQUM7Z0JBQ1o7WUFDRjtZQUVBLE1BQU0xQixXQUFXLE1BQU1DLE1BQU0scUNBQXFDO2dCQUNoRUMsUUFBUTtnQkFDUkMsU0FBUztvQkFDUCxnQkFBZ0I7b0JBQ2hCQyxlQUFlLFVBQWdCLE9BQU5UO2dCQUMzQjtnQkFDQVUsYUFBYTtZQUNmO1lBRUEsSUFBSSxDQUFDTCxTQUFTTSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBVixhQUFhOEIsVUFBVSxDQUFDO1lBRXhCQyxlQUFlQyxLQUFLO1lBRXBCVixPQUFPSSxRQUFRLENBQUNPLElBQUksR0FBRztRQUN6QixFQUFFLE9BQU92QyxPQUFPO1lBQ2RtQixRQUFRbkIsS0FBSyxDQUFDLHFDQUFrQ0E7UUFDbEQ7SUFDRjtJQUVBLElBQUlGLFNBQVM7UUFDWCxxQkFBTyw4REFBQzBDO3NCQUFJOzs7Ozs7SUFDZDtJQUVBLElBQUl4QyxPQUFPO1FBQ1QscUJBQU8sOERBQUN3Qzs7Z0JBQUk7Z0JBQVN4Qzs7Ozs7OztJQUN2QjtJQUVBLElBQUksQ0FBQ0osTUFBTTtRQUNUTyxPQUFPZ0MsSUFBSSxDQUFDO1FBQ1osT0FBTztJQUNUO0lBRUEscUJBQ0UsOERBQUNNO1FBQUtDLFdBQVU7OzBCQUNkLDhEQUFDRjtnQkFBSUUsV0FBVTswQkFDYiw0RUFBQ0Y7b0JBQUlFLFdBQVU7OEJBQ2IsNEVBQUNDO3dCQUNDQyxHQUFHLEVBQUVoRCxpQkFBQUEsMkJBQUFBLEtBQU1xQixJQUFJLENBQUM0QixPQUFPO3dCQUN2QkMsS0FBSTt3QkFDSkosV0FBVTs7Ozs7Ozs7Ozs7Ozs7OzswQkFJaEIsOERBQUNLOztvQkFBRztvQkFBK0JuRCxpQkFBQUEsMkJBQUFBLEtBQU1xQixJQUFJLENBQUMrQixJQUFJO29CQUFDOzs7Ozs7OzBCQUNuRCw4REFBQ1I7Z0JBQUlFLFdBQVU7O2tDQUNiLDhEQUFDRjs7NEJBQUk7NEJBQVM1QyxpQkFBQUEsMkJBQUFBLEtBQU1xQixJQUFJLENBQUNnQyxLQUFLOzs7Ozs7O2tDQUM5Qiw4REFBQ0M7d0JBQ0NDLFNBQVNqQjt3QkFDVFEsV0FBVTtrQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVQ7R0F4SndCL0M7O1FBS0RGLDREQUFlQTtRQUNyQkMsc0RBQVNBOzs7S0FORkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2Rhc2hib2FyZC9wYWdlLnRzeD9kMTI1Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlU2VhcmNoUGFyYW1zLCB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhc2hib2FyZCgpIHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8YW55PihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdXNlU2VhcmNoUGFyYW1zKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gUsOpY3Vww6lyZXIgbGUgdG9rZW4gZGVwdWlzIGwnVVJMIHZpYSBzZWFyY2hQYXJhbXNcbiAgICBjb25zdCB0b2tlbiA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ0b2tlblwiKTtcblxuICAgIGlmICh0b2tlbikge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJhdXRoX3Rva2VuXCIsIHRva2VuKTtcblxuICAgICAgLy8gVXRpbGlzZXIgbGUgdG9rZW4gcG91ciByw6ljdXDDqXJlciBsZXMgZG9ubsOpZXMgZGUgbCd1dGlsaXNhdGV1clxuICAgICAgY29uc3QgZmV0Y2hVc2VyRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvdXNlclwiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFcIiwgZGF0YSk7XG5cbiAgICAgICAgICAvLyBTYXV2ZWdhcmRlciBsZXMgZG9ubsOpZXMgdXRpbGlzYXRldXIgZGFucyBsZSBsb2NhbFN0b3JhZ2UgcG91ciBsZXMgcHJvY2hhaW5lcyBvdXZlcnR1cmVzIGR1IHBvcHVwXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2RhdGFcIiwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZSlcblxuICAgICAgICAgIHNldFVzZXIoZGF0YSk7XG4gICAgICAgICAgc2VuZERhdGFUb0V4dGVuc2lvbihkYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBzZXRFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBkb25uw6llcyB1dGlsaXNhdGV1ci5cIik7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZldGNoVXNlckRhdGEoKTtcblxuICAgICAgLy8gU2VuZCBkYXRhIHRvIGV4dGVuc2lvbiBhZmV0ZXIgdXNlciBjb25uZWN0ZWRcbiAgICAgIGNvbnN0IHNlbmREYXRhVG9FeHRlbnNpb24gPSBhc3luYyAodXNlckRhdGE6IGFueSkgPT4ge1xuICAgICAgICB1c2VyRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2RhdGFcIikgfHwgXCJudWxsXCIpO1xuXG4gICAgICAgIGlmKCF1c2VyRGF0YSkge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZVVzZXJEYXRhID0gYXdhaXQgZmV0Y2hVc2VyRGF0YSgpO1xuXG4gICAgICAgICAgaWYgKHVwZGF0ZVVzZXJEYXRhKSB7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICAgICAgICAgIHthY3Rpb246IFwic2VuZERhdGFcIiwgZGF0YTogdXB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKFxuICAgICAgICAgIHsgYWN0aW9uOiBcInNlbmREYXRhXCIsIGRhdGE6IHVzZXJEYXRhIH0sXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRFcnJvcihcIkF1Y3VuIHRva2VuIHRyb3V2w6kgZGFucyBsJ1VSTC5cIik7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtzZWFyY2hQYXJhbXNdKTtcblxuICAvLyAvLyBTZW5kIGRhdGEgdG8gZXh0ZW5zaW9uIGFmZXRlciB1c2VyIGNvbm5lY3RlZFxuICAvLyBjb25zdCBzZW5kRGF0YVRvRXh0ZW5zaW9uID0gKHVzZXJEYXRhOiBhbnkpID0+IHtcbiAgLy8gICB3aW5kb3cucG9zdE1lc3NhZ2UoXG4gIC8vICAgICB7IGFjdGlvbjogXCJzZW5kRGF0YVwiLCBkYXRhOiB1c2VyRGF0YSB9LFxuICAvLyAgICAgd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAvLyAgICk7XG4gIC8vIH07XG5cbiAgLy8gTG9nb3V0XG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhfdG9rZW5cIik7XG4gICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXV0aC9sb2dvdXRcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIGTDqWNvbm5leGlvbi5cIik7XG4gICAgICB9XG5cbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiYXV0aF90b2tlblwiKTtcblxuICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcblxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9sb2dpblwiO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHBlbmRhbnQgbGEgZMOpY29ubmV4aW9uOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIDxkaXY+Q2hhcmdlbWVudC4uLjwvZGl2PjtcbiAgfVxuXG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiA8ZGl2PkVycmV1cjoge2Vycm9yfTwvZGl2PjtcbiAgfVxuXG4gIGlmICghdXNlcikge1xuICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweC00IHB5LThcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBweC00IHB0LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTggaC04IG92ZXJmbG93LWhpZGRlbiBiZy1ncmF5LTEwMCByb3VuZGVkLWZ1bGwgZGFyazpiZy1ncmF5LTYwMFwiPlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz17dXNlcj8uZGF0YS5waWN0dXJlfVxuICAgICAgICAgICAgYWx0PVwiUGhvdG8gZGUgcHJvZmlsXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtZnVsbCB3LTggaC04XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGgxPkJpZW52ZW51ZSBzdXIgdm90cmUgRGFzaGJvYXJkIHt1c2VyPy5kYXRhLm5hbWV9ITwvaDE+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgIDxkaXY+RW1haWwgOiB7dXNlcj8uZGF0YS5lbWFpbH08L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJiZy1yZWQtNTAwIHRleHQtd2hpdGUgcHgtNCBweS0yIHJvdW5kZWRcIlxuICAgICAgICA+XG4gICAgICAgICAgRMOpY29ubmV4aW9uXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWFyY2hQYXJhbXMiLCJ1c2VSb3V0ZXIiLCJEYXNoYm9hcmQiLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsInNlYXJjaFBhcmFtcyIsInJvdXRlciIsInRva2VuIiwiZ2V0IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImZldGNoVXNlckRhdGEiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJjcmVkZW50aWFscyIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwic2VuZERhdGFUb0V4dGVuc2lvbiIsInVzZXJEYXRhIiwicGFyc2UiLCJnZXRJdGVtIiwidXBkYXRlVXNlckRhdGEiLCJ3aW5kb3ciLCJwb3N0TWVzc2FnZSIsImFjdGlvbiIsInVwIiwibG9jYXRpb24iLCJvcmlnaW4iLCJoYW5kbGVMb2dvdXQiLCJwdXNoIiwicmVtb3ZlSXRlbSIsInNlc3Npb25TdG9yYWdlIiwiY2xlYXIiLCJocmVmIiwiZGl2IiwibWFpbiIsImNsYXNzTmFtZSIsImltZyIsInNyYyIsInBpY3R1cmUiLCJhbHQiLCJoMSIsIm5hbWUiLCJlbWFpbCIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/page.tsx\n"));

/***/ })

});