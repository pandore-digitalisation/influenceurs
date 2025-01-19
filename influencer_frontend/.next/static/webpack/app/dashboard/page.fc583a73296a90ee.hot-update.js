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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n// const BASE_URL = \"https://influenceurs.onrender.com\";\nfunction Dashboard() {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [lists, setLists] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // Nouvel état pour les listes\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Récupérer le token depuis l'URL via searchParams\n        const token = searchParams.get(\"token\");\n        if (token) {\n            localStorage.setItem(\"auth_token\", token);\n            // Utiliser le token pour récupérer les données de l'utilisateur\n            const fetchUserData = async ()=>{\n                try {\n                    const response = await fetch(\"\".concat(BASE_URL, \"/auth/user\"), {\n                        method: \"GET\",\n                        headers: {\n                            \"Content-Type\": \"application/json\",\n                            Authorization: \"Bearer \".concat(token)\n                        },\n                        credentials: \"include\"\n                    });\n                    if (!response.ok) {\n                        throw new Error(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es.\");\n                    }\n                    const data = await response.json();\n                    // Sauvegarder les données utilisateur dans le state\n                    setUser(data);\n                    sendDataToExtension(data, token);\n                    // Une fois l'utilisateur récupéré, récupérer les listes associées à cet utilisateur\n                    const fetchUserLists = async ()=>{\n                        try {\n                            const listsResponse = await fetch(\"\".concat(BASE_URL, \"/lists/user/\").concat(data.data.userId), {\n                                method: \"GET\",\n                                headers: {\n                                    \"Content-Type\": \"application/json\",\n                                    Authorization: \"Bearer \".concat(token)\n                                }\n                            });\n                            if (!listsResponse.ok) {\n                                window.location.href = \"/login\";\n                                throw new Error(\"Votre session est expir\\xe9es, veillez vous reconnecter.\");\n                            }\n                            const listsData = await listsResponse.json();\n                            console.log(\"listData\", listsData);\n                            setLists(listsData); // Mettre à jour l'état des listes\n                        } catch (error) {\n                            console.error(\"Erreur de r\\xe9cup\\xe9ration des listes:\", error);\n                            setError(\"Erreur lors de la r\\xe9cup\\xe9ration des listes.\");\n                        }\n                    };\n                    fetchUserLists();\n                } catch (error) {\n                    window.location.href = \"/login\";\n                    setError(\"Votre session est expir\\xe9es, veillez vous reconnecter.\");\n                } finally{\n                    setLoading(false);\n                }\n            };\n            fetchUserData();\n        } else {\n            setError(\"Aucun token trouv\\xe9 dans l'URL.\");\n            setLoading(false);\n        }\n        // Send data to extension after user connected\n        const sendDataToExtension = (userData, token)=>{\n            window.postMessage({\n                action: \"sendData\",\n                data: userData,\n                token: token\n            }, window.location.origin);\n        };\n    }, [\n        searchParams\n    ]);\n    // Logout\n    const handleLogout = async ()=>{\n        try {\n            const token = localStorage.getItem(\"auth_token\");\n            if (!token) {\n                window.location.href = \"/login\";\n                window.postMessage({\n                    action: \"logoutUser\"\n                }, window.location.origin);\n                return;\n            }\n            const response = await fetch(\"\".concat(BASE_URL, \"/auth/logout\"), {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                credentials: \"include\"\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la d\\xe9connexion.\");\n            }\n            localStorage.removeItem(\"auth_token\");\n            sessionStorage.clear();\n            window.location.href = \"/login\";\n            window.postMessage({\n                action: \"logoutUser\"\n            }, window.location.origin);\n        } catch (error) {\n            console.error(\"Erreur pendant la d\\xe9connexion:\", error);\n        }\n    };\n    // Dans la page web\n    // window.addEventListener(\"message\", function (event) {\n    //   if (event.origin !== window.location.origin) return; // S'assurer que le message vient du bon domaine\n    //   const { action } = event.data;\n    //   if (action === \"logout\") {\n    //     // Code pour déconnecter l'utilisateur de la page web\n    //     // Par exemple, effacer les données du sessionStorage ou rediriger l'utilisateur\n    //     console.log(\"Déconnexion depuis l'extension.\");\n    //     // Effectuer la déconnexion sur la page web\n    //     window.location.href = \"/logout\"; // ou effacer les cookies/sessionStorage\n    //   }\n    // });\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Chargement...\"\n        }, void 0, false, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 149,\n            columnNumber: 12\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Erreur: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 153,\n            columnNumber: 12\n        }, this);\n    }\n    if (!user) {\n        router.push(\"/login\");\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-end px-4 pt-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: user === null || user === void 0 ? void 0 : user.data.picture,\n                        alt: \"Photo de profil\",\n                        className: \"rounded-full w-8 h-8\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 165,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                    lineNumber: 164,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 163,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: [\n                    \"Bienvenue sur votre Dashboard \",\n                    user === null || user === void 0 ? void 0 : user.data.name,\n                    \"!\"\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 172,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Email : \",\n                            user === null || user === void 0 ? void 0 : user.data.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 174,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"userId : \",\n                            user === null || user === void 0 ? void 0 : user.data.userId\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 175,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                children: \"Mes Listes\"\n                            }, void 0, false, {\n                                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                                lineNumber: 179,\n                                columnNumber: 11\n                            }, this),\n                            lists.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                                children: lists.map((list)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                        children: [\n                                            list._id,\n                                            \" - \",\n                                            list.name,\n                                            \" - \",\n                                            list.profiles.description\n                                        ]\n                                    }, list.index, true, {\n                                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                                        lineNumber: 183,\n                                        columnNumber: 17\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                                lineNumber: 181,\n                                columnNumber: 13\n                            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Aucune liste trouv\\xe9e.\"\n                            }, void 0, false, {\n                                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                                lineNumber: 189,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 178,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleLogout,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"D\\xe9connexion\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 193,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 173,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n        lineNumber: 162,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"WlgJZvjKqZzZ3HnAtudxenzGkWY=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFbUQ7QUFDVTtBQUU3RCx3REFBd0Q7QUFFekMsU0FBU0s7O0lBQ3RCLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTiwrQ0FBUUEsQ0FBTTtJQUN0QyxNQUFNLENBQUNPLE9BQU9DLFNBQVMsR0FBR1IsK0NBQVFBLENBQVEsRUFBRSxHQUFHLDhCQUE4QjtJQUM3RSxNQUFNLENBQUNTLFNBQVNDLFdBQVcsR0FBR1YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDVyxPQUFPQyxTQUFTLEdBQUdaLCtDQUFRQSxDQUFnQjtJQUVsRCxNQUFNYSxlQUFlWCxnRUFBZUE7SUFDcEMsTUFBTVksU0FBU1gsMERBQVNBO0lBRXhCRixnREFBU0EsQ0FBQztRQUNSLG1EQUFtRDtRQUNuRCxNQUFNYyxRQUFRRixhQUFhRyxHQUFHLENBQUM7UUFFL0IsSUFBSUQsT0FBTztZQUNURSxhQUFhQyxPQUFPLENBQUMsY0FBY0g7WUFDbkMsZ0VBQWdFO1lBQ2hFLE1BQU1JLGdCQUFnQjtnQkFDcEIsSUFBSTtvQkFDRixNQUFNQyxXQUFXLE1BQU1DLE1BQU0sR0FBWSxPQUFUQyxVQUFTLGVBQWE7d0JBQ3BEQyxRQUFRO3dCQUNSQyxTQUFTOzRCQUNQLGdCQUFnQjs0QkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlY7d0JBQzNCO3dCQUNBVyxhQUFhO29CQUNmO29CQUVBLElBQUksQ0FBQ04sU0FBU08sRUFBRSxFQUFFO3dCQUNoQixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLE9BQU8sTUFBTVQsU0FBU1UsSUFBSTtvQkFFaEMsb0RBQW9EO29CQUNwRHhCLFFBQVF1QjtvQkFFUkUsb0JBQW9CRixNQUFNZDtvQkFDMUIsb0ZBQW9GO29CQUNwRixNQUFNaUIsaUJBQWlCO3dCQUNyQixJQUFJOzRCQUNGLE1BQU1DLGdCQUFnQixNQUFNWixNQUMxQixHQUEw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QUEsS0FBTXdCLElBQUksQ0FBQzJCLE9BQU87d0JBQ3ZCQyxLQUFJO3dCQUNKSixXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OzBCQUloQiw4REFBQ0s7O29CQUFHO29CQUErQnJELGlCQUFBQSwyQkFBQUEsS0FBTXdCLElBQUksQ0FBQzhCLElBQUk7b0JBQUM7Ozs7Ozs7MEJBQ25ELDhEQUFDVDtnQkFBSUcsV0FBVTs7a0NBQ2IsOERBQUNIOzs0QkFBSTs0QkFBUzdDLGlCQUFBQSwyQkFBQUEsS0FBTXdCLElBQUksQ0FBQytCLEtBQUs7Ozs7Ozs7a0NBQzlCLDhEQUFDVjs7NEJBQUk7NEJBQVU3QyxpQkFBQUEsMkJBQUFBLEtBQU13QixJQUFJLENBQUNLLE1BQU07Ozs7Ozs7a0NBR2hDLDhEQUFDZ0I7OzBDQUNDLDhEQUFDVzswQ0FBRzs7Ozs7OzRCQUNIdEQsTUFBTXVELE1BQU0sR0FBRyxrQkFDZCw4REFBQ0M7MENBQ0V4RCxNQUFNeUQsR0FBRyxDQUFDLENBQUNDLHFCQUNWLDhEQUFDQzs7NENBQ0VELEtBQUtFLEdBQUc7NENBQUM7NENBQUlGLEtBQUtOLElBQUk7NENBQUM7NENBQUlNLEtBQUtHLFFBQVEsQ0FBQ0MsV0FBVzs7dUNBRDlDSixLQUFLSyxLQUFLOzs7Ozs7Ozs7cURBTXZCLDhEQUFDQzswQ0FBRTs7Ozs7Ozs7Ozs7O2tDQUlQLDhEQUFDQzt3QkFDQ0MsU0FBUzVCO3dCQUNUUSxXQUFVO2tDQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNVDtHQWxNd0JqRDs7UUFNREYsNERBQWVBO1FBQ3JCQyxzREFBU0E7OztLQVBGQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZGFzaGJvYXJkL3BhZ2UudHN4P2QxMjUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMsIHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcblxuLy8gY29uc3QgQkFTRV9VUkwgPSBcImh0dHBzOi8vaW5mbHVlbmNldXJzLm9ucmVuZGVyLmNvbVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmQoKSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4gIGNvbnN0IFtsaXN0cywgc2V0TGlzdHNdID0gdXNlU3RhdGU8YW55W10+KFtdKTsgLy8gTm91dmVsIMOpdGF0IHBvdXIgbGVzIGxpc3Rlc1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBSw6ljdXDDqXJlciBsZSB0b2tlbiBkZXB1aXMgbCdVUkwgdmlhIHNlYXJjaFBhcmFtc1xuICAgIGNvbnN0IHRva2VuID0gc2VhcmNoUGFyYW1zLmdldChcInRva2VuXCIpO1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImF1dGhfdG9rZW5cIiwgdG9rZW4pO1xuICAgICAgLy8gVXRpbGlzZXIgbGUgdG9rZW4gcG91ciByw6ljdXDDqXJlciBsZXMgZG9ubsOpZXMgZGUgbCd1dGlsaXNhdGV1clxuICAgICAgY29uc3QgZmV0Y2hVc2VyRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9hdXRoL3VzZXJgLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgICAvLyBTYXV2ZWdhcmRlciBsZXMgZG9ubsOpZXMgdXRpbGlzYXRldXIgZGFucyBsZSBzdGF0ZVxuICAgICAgICAgIHNldFVzZXIoZGF0YSk7XG4gICAgICAgICBcbiAgICAgICAgICBzZW5kRGF0YVRvRXh0ZW5zaW9uKGRhdGEsIHRva2VuKTtcbiAgICAgICAgICAvLyBVbmUgZm9pcyBsJ3V0aWxpc2F0ZXVyIHLDqWN1cMOpcsOpLCByw6ljdXDDqXJlciBsZXMgbGlzdGVzIGFzc29jacOpZXMgw6AgY2V0IHV0aWxpc2F0ZXVyXG4gICAgICAgICAgY29uc3QgZmV0Y2hVc2VyTGlzdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBsaXN0c1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgICAgICAgICAgYCR7QkFTRV9VUkx9L2xpc3RzL3VzZXIvJHtkYXRhLmRhdGEudXNlcklkfWAsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBpZiAoIWxpc3RzUmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luXCI7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgXCJWb3RyZSBzZXNzaW9uIGVzdCBleHBpcsOpZXMsIHZlaWxsZXogdm91cyByZWNvbm5lY3Rlci5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBsaXN0c0RhdGEgPSBhd2FpdCBsaXN0c1Jlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsaXN0RGF0YVwiLCBsaXN0c0RhdGEpO1xuICAgICAgICAgICAgICBzZXRMaXN0cyhsaXN0c0RhdGEpOyAvLyBNZXR0cmUgw6Agam91ciBsJ8OpdGF0IGRlcyBsaXN0ZXNcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgZGUgcsOpY3Vww6lyYXRpb24gZGVzIGxpc3RlczpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICBzZXRFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBsaXN0ZXMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmZXRjaFVzZXJMaXN0cygpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbG9naW5cIjtcbiAgICAgICAgICBzZXRFcnJvcihcIlZvdHJlIHNlc3Npb24gZXN0IGV4cGlyw6llcywgdmVpbGxleiB2b3VzIHJlY29ubmVjdGVyLlwiKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmV0Y2hVc2VyRGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRFcnJvcihcIkF1Y3VuIHRva2VuIHRyb3V2w6kgZGFucyBsJ1VSTC5cIik7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBTZW5kIGRhdGEgdG8gZXh0ZW5zaW9uIGFmdGVyIHVzZXIgY29ubmVjdGVkXG4gICAgY29uc3Qgc2VuZERhdGFUb0V4dGVuc2lvbiA9ICh1c2VyRGF0YTogYW55LCB0b2tlbjogYW55KSA9PiB7XG4gICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICAgIHsgYWN0aW9uOiBcInNlbmREYXRhXCIsIGRhdGE6IHVzZXJEYXRhLCB0b2tlbjogdG9rZW4gfSxcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAgICAgKTtcbiAgICB9O1xuICB9LCBbc2VhcmNoUGFyYW1zXSk7XG5cbiAgLy8gTG9nb3V0XG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhfdG9rZW5cIik7XG4gICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbG9naW5cIjtcbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHsgYWN0aW9uOiBcImxvZ291dFVzZXJcIiB9LCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfS9hdXRoL2xvZ291dGAsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSBkw6ljb25uZXhpb24uXCIpO1xuICAgICAgfVxuXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImF1dGhfdG9rZW5cIik7XG5cbiAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvbG9naW5cIjtcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7IGFjdGlvbjogXCJsb2dvdXRVc2VyXCIgfSwgd2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgcGVuZGFudCBsYSBkw6ljb25uZXhpb246XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRGFucyBsYSBwYWdlIHdlYlxuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIC8vICAgaWYgKGV2ZW50Lm9yaWdpbiAhPT0gd2luZG93LmxvY2F0aW9uLm9yaWdpbikgcmV0dXJuOyAvLyBTJ2Fzc3VyZXIgcXVlIGxlIG1lc3NhZ2UgdmllbnQgZHUgYm9uIGRvbWFpbmVcblxuICAvLyAgIGNvbnN0IHsgYWN0aW9uIH0gPSBldmVudC5kYXRhO1xuXG4gIC8vICAgaWYgKGFjdGlvbiA9PT0gXCJsb2dvdXRcIikge1xuICAvLyAgICAgLy8gQ29kZSBwb3VyIGTDqWNvbm5lY3RlciBsJ3V0aWxpc2F0ZXVyIGRlIGxhIHBhZ2Ugd2ViXG4gIC8vICAgICAvLyBQYXIgZXhlbXBsZSwgZWZmYWNlciBsZXMgZG9ubsOpZXMgZHUgc2Vzc2lvblN0b3JhZ2Ugb3UgcmVkaXJpZ2VyIGwndXRpbGlzYXRldXJcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiRMOpY29ubmV4aW9uIGRlcHVpcyBsJ2V4dGVuc2lvbi5cIik7XG4gIC8vICAgICAvLyBFZmZlY3R1ZXIgbGEgZMOpY29ubmV4aW9uIHN1ciBsYSBwYWdlIHdlYlxuICAvLyAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9sb2dvdXRcIjsgLy8gb3UgZWZmYWNlciBsZXMgY29va2llcy9zZXNzaW9uU3RvcmFnZVxuICAvLyAgIH1cbiAgLy8gfSk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gPGRpdj5DaGFyZ2VtZW50Li4uPC9kaXY+O1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIDxkaXY+RXJyZXVyOiB7ZXJyb3J9PC9kaXY+O1xuICB9XG5cbiAgaWYgKCF1c2VyKSB7XG4gICAgcm91dGVyLnB1c2goXCIvbG9naW5cIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIHB4LTQgcHQtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctOCBoLTggb3ZlcmZsb3ctaGlkZGVuIGJnLWdyYXktMTAwIHJvdW5kZWQtZnVsbCBkYXJrOmJnLWdyYXktNjAwXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPXt1c2VyPy5kYXRhLnBpY3R1cmV9XG4gICAgICAgICAgICBhbHQ9XCJQaG90byBkZSBwcm9maWxcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIHctOCBoLThcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8aDE+QmllbnZlbnVlIHN1ciB2b3RyZSBEYXNoYm9hcmQge3VzZXI/LmRhdGEubmFtZX0hPC9oMT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPGRpdj5FbWFpbCA6IHt1c2VyPy5kYXRhLmVtYWlsfTwvZGl2PlxuICAgICAgICA8ZGl2PnVzZXJJZCA6IHt1c2VyPy5kYXRhLnVzZXJJZH08L2Rpdj5cblxuICAgICAgICB7LyogQWZmaWNoYWdlIGRlcyBsaXN0ZXMgKi99XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGgyPk1lcyBMaXN0ZXM8L2gyPlxuICAgICAgICAgIHtsaXN0cy5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICB7bGlzdHMubWFwKChsaXN0KSA9PiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17bGlzdC5pbmRleH0+XG4gICAgICAgICAgICAgICAgICB7bGlzdC5faWR9IC0ge2xpc3QubmFtZX0gLSB7bGlzdC5wcm9maWxlcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxwPkF1Y3VuZSBsaXN0ZSB0cm91dsOpZS48L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJiZy1yZWQtNTAwIHRleHQtd2hpdGUgcHgtNCBweS0yIHJvdW5kZWRcIlxuICAgICAgICA+XG4gICAgICAgICAgRMOpY29ubmV4aW9uXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWFyY2hQYXJhbXMiLCJ1c2VSb3V0ZXIiLCJEYXNoYm9hcmQiLCJ1c2VyIiwic2V0VXNlciIsImxpc3RzIiwic2V0TGlzdHMiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJzZWFyY2hQYXJhbXMiLCJyb3V0ZXIiLCJ0b2tlbiIsImdldCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJmZXRjaFVzZXJEYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsIkJBU0VfVVJMIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJjcmVkZW50aWFscyIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsInNlbmREYXRhVG9FeHRlbnNpb24iLCJmZXRjaFVzZXJMaXN0cyIsImxpc3RzUmVzcG9uc2UiLCJ1c2VySWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJsaXN0c0RhdGEiLCJjb25zb2xlIiwibG9nIiwidXNlckRhdGEiLCJwb3N0TWVzc2FnZSIsImFjdGlvbiIsIm9yaWdpbiIsImhhbmRsZUxvZ291dCIsImdldEl0ZW0iLCJyZW1vdmVJdGVtIiwic2Vzc2lvblN0b3JhZ2UiLCJjbGVhciIsImRpdiIsInB1c2giLCJtYWluIiwiY2xhc3NOYW1lIiwiaW1nIiwic3JjIiwicGljdHVyZSIsImFsdCIsImgxIiwibmFtZSIsImVtYWlsIiwiaDIiLCJsZW5ndGgiLCJ1bCIsIm1hcCIsImxpc3QiLCJsaSIsIl9pZCIsInByb2ZpbGVzIiwiZGVzY3JpcHRpb24iLCJpbmRleCIsInAiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/page.tsx\n"));

/***/ })

});