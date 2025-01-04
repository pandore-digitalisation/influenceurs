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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Dashboard() {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Récupérer le token depuis l'URL via searchParams\n        const token = searchParams.get(\"token\");\n        if (token) {\n            localStorage.setItem(\"auth_token\", token);\n            // Utiliser le token pour récupérer les données de l'utilisateur\n            const fetchUserData = async ()=>{\n                try {\n                    const response = await fetch(\"http://localhost:3000/auth/user\", {\n                        method: \"GET\",\n                        headers: {\n                            \"Content-Type\": \"application/json\",\n                            Authorization: \"Bearer \".concat(token)\n                        },\n                        credentials: \"include\"\n                    });\n                    if (!response.ok) {\n                        throw new Error(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es.\");\n                    }\n                    const data = await response.json();\n                    console.log(\"data\", data);\n                    setUser(data);\n                    sendDataToExtension(data);\n                } catch (error) {\n                    setError(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es utilisateur.\");\n                } finally{\n                    setLoading(false);\n                }\n            };\n            fetchUserData();\n        } else {\n            setError(\"Aucun token trouv\\xe9 dans l'URL.\");\n            setLoading(false);\n        }\n    }, [\n        searchParams\n    ]);\n    const sendDataToExtension = (userData)=>{\n        window.postMessage({\n            action: \"sendData\",\n            data: userData\n        }, window.location.origin);\n    };\n    const handleLogout = async ()=>{\n        try {\n            const token = localStorage.getItem(\"auth_token\");\n            if (!token) {\n                router.push(\"/login\");\n                return;\n            }\n            const response = await fetch(\"http://localhost:3000/auth/logout\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                credentials: \"include\"\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la d\\xe9connexion.\");\n            }\n            // Supprimer le token du localStorage\n            localStorage.removeItem(\"auth_token\");\n            // Rediriger vers la page de connexion\n            router.push(\"/login\");\n        } catch (error) {\n            console.error(\"Erreur pendant la d\\xe9connexion:\", error);\n        }\n    };\n    // Si les données sont en cours de chargement\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Chargement...\"\n        }, void 0, false, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 100,\n            columnNumber: 12\n        }, this);\n    }\n    // Si une erreur est survenue\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Erreur: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 105,\n            columnNumber: 12\n        }, this);\n    }\n    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion\n    if (!user) {\n        router.push(\"/login\"); // Redirection si l'utilisateur n'est pas authentifié\n        return null; // Retourner null pendant la redirection\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-end px-4 pt-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                        className: \"absolute w-10 h-10 text-gray-400 -left-1\",\n                        fill: \"currentColor\",\n                        viewBox: \"0 0 20 20\",\n                        xmlns: \"http://www.w3.org/2000/svg\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                            \"fill-rule\": \"evenodd\",\n                            d: \"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z\",\n                            \"clip-rule\": \"evenodd\"\n                        }, void 0, false, {\n                            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                            lineNumber: 124,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 118,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                    lineNumber: 117,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 116,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Bienvenue sur votre Dashboard !\"\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 132,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Email : \",\n                            user === null || user === void 0 ? void 0 : user.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleLogout,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"D\\xe9connexion\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 140,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 133,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n        lineNumber: 115,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"PG9jfsbDXnqLO4TTv/OSWCha0sc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFbUQ7QUFDVTtBQUU5QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFNO0lBQ3RDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQWdCO0lBRWxELE1BQU1XLGVBQWVULGdFQUFlQTtJQUNwQyxNQUFNVSxTQUFTVCwwREFBU0E7SUFFeEJGLGdEQUFTQSxDQUFDO1FBQ1IsbURBQW1EO1FBQ25ELE1BQU1ZLFFBQVFGLGFBQWFHLEdBQUcsQ0FBQztRQUUvQixJQUFJRCxPQUFPO1lBQ1RFLGFBQWFDLE9BQU8sQ0FBQyxjQUFjSDtZQUVuQyxnRUFBZ0U7WUFDaEUsTUFBTUksZ0JBQWdCO2dCQUNwQixJQUFJO29CQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxtQ0FBbUM7d0JBQzlEQyxRQUFRO3dCQUNSQyxTQUFTOzRCQUNQLGdCQUFnQjs0QkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlQ7d0JBQzNCO3dCQUNBVSxhQUFhO29CQUNmO29CQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO3dCQUNoQixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLE9BQU8sTUFBTVIsU0FBU1MsSUFBSTtvQkFFaENDLFFBQVFDLEdBQUcsQ0FBQyxRQUFRSDtvQkFFcEJwQixRQUFRb0I7b0JBQ1JJLG9CQUFvQko7Z0JBQ3RCLEVBQUUsT0FBT2pCLE9BQU87b0JBQ2RDLFNBQVM7Z0JBQ1gsU0FBVTtvQkFDUkYsV0FBVztnQkFDYjtZQUNGO1lBRUFTO1FBQ0YsT0FBTztZQUNMUCxTQUFTO1lBQ1RGLFdBQVc7UUFDYjtJQUNGLEdBQUc7UUFBQ0c7S0FBYTtJQUVqQixNQUFNbUIsc0JBQXNCLENBQUNDO1FBRzNCQyxPQUFPQyxXQUFXLENBQ2hCO1lBQUVDLFFBQVE7WUFBWVIsTUFBTUs7UUFBUyxHQUNyQ0MsT0FBT0csUUFBUSxDQUFDQyxNQUFNO0lBRTFCO0lBRUEsTUFBTUMsZUFBZTtRQUNuQixJQUFJO1lBQ0YsTUFBTXhCLFFBQVFFLGFBQWF1QixPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDekIsT0FBTztnQkFDVkQsT0FBTzJCLElBQUksQ0FBQztnQkFDWjtZQUNGO1lBRUEsTUFBTXJCLFdBQVcsTUFBTUMsTUFBTSxxQ0FBcUM7Z0JBQ2hFQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtvQkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlQ7Z0JBQzNCO2dCQUNBVSxhQUFhO1lBQ2Y7WUFFQSxJQUFJLENBQUNMLFNBQVNNLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBRUEscUNBQXFDO1lBQ3JDVixhQUFheUIsVUFBVSxDQUFDO1lBRXhCLHNDQUFzQztZQUN0QzVCLE9BQU8yQixJQUFJLENBQUM7UUFFZCxFQUFFLE9BQU85QixPQUFPO1lBQ2RtQixRQUFRbkIsS0FBSyxDQUFDLHFDQUFrQ0E7UUFDbEQ7SUFDRjtJQUVBLDZDQUE2QztJQUM3QyxJQUFJRixTQUFTO1FBQ1gscUJBQU8sOERBQUNrQztzQkFBSTs7Ozs7O0lBQ2Q7SUFFQSw2QkFBNkI7SUFDN0IsSUFBSWhDLE9BQU87UUFDVCxxQkFBTyw4REFBQ2dDOztnQkFBSTtnQkFBU2hDOzs7Ozs7O0lBQ3ZCO0lBRUEsOEVBQThFO0lBQzlFLElBQUksQ0FBQ0osTUFBTTtRQUNUTyxPQUFPMkIsSUFBSSxDQUFDLFdBQVcscURBQXFEO1FBQzVFLE9BQU8sTUFBTSx3Q0FBd0M7SUFDdkQ7SUFFQSxxQkFDRSw4REFBQ0c7UUFBS0MsV0FBVTs7MEJBQ2QsOERBQUNGO2dCQUFJRSxXQUFVOzBCQUNiLDRFQUFDRjtvQkFBSUUsV0FBVTs4QkFDYiw0RUFBQ0M7d0JBQ0NELFdBQVU7d0JBQ1ZFLE1BQUs7d0JBQ0xDLFNBQVE7d0JBQ1JDLE9BQU07a0NBRU4sNEVBQUNDOzRCQUNDQyxhQUFVOzRCQUNWQyxHQUFFOzRCQUNGQyxhQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBS2xCLDhEQUFDQzswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDWDtnQkFBSUUsV0FBVTs7a0NBTWIsOERBQUNGOzs0QkFBSTs0QkFBU3BDLGlCQUFBQSwyQkFBQUEsS0FBTWdELEtBQUs7Ozs7Ozs7a0NBQ3pCLDhEQUFDQzt3QkFDQ0MsU0FBU2xCO3dCQUNUTSxXQUFVO2tDQUNYOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPVDtHQWhKd0J2Qzs7UUFLREYsNERBQWVBO1FBQ3JCQyxzREFBU0E7OztLQU5GQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZGFzaGJvYXJkL3BhZ2UudHN4P2QxMjUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMsIHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkKCkge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBSw6ljdXDDqXJlciBsZSB0b2tlbiBkZXB1aXMgbCdVUkwgdmlhIHNlYXJjaFBhcmFtc1xuICAgIGNvbnN0IHRva2VuID0gc2VhcmNoUGFyYW1zLmdldChcInRva2VuXCIpO1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImF1dGhfdG9rZW5cIiwgdG9rZW4pO1xuXG4gICAgICAvLyBVdGlsaXNlciBsZSB0b2tlbiBwb3VyIHLDqWN1cMOpcmVyIGxlcyBkb25uw6llcyBkZSBsJ3V0aWxpc2F0ZXVyXG4gICAgICBjb25zdCBmZXRjaFVzZXJEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXV0aC91c2VyXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBkb25uw6llcy5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKTtcblxuICAgICAgICAgIHNldFVzZXIoZGF0YSk7XG4gICAgICAgICAgc2VuZERhdGFUb0V4dGVuc2lvbihkYXRhKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHNldEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIGRvbm7DqWVzIHV0aWxpc2F0ZXVyLlwiKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmV0Y2hVc2VyRGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRFcnJvcihcIkF1Y3VuIHRva2VuIHRyb3V2w6kgZGFucyBsJ1VSTC5cIik7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtzZWFyY2hQYXJhbXNdKTtcblxuICBjb25zdCBzZW5kRGF0YVRvRXh0ZW5zaW9uID0gKHVzZXJEYXRhOiBhbnkpID0+IHtcblxuXG4gICAgd2luZG93LnBvc3RNZXNzYWdlKFxuICAgICAgeyBhY3Rpb246IFwic2VuZERhdGFcIiwgZGF0YTogdXNlckRhdGEgfSxcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW5cbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvZ291dCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImF1dGhfdG9rZW5cIik7XG4gICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXV0aC9sb2dvdXRcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgIH0sXG4gICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIGTDqWNvbm5leGlvbi5cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFN1cHByaW1lciBsZSB0b2tlbiBkdSBsb2NhbFN0b3JhZ2VcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiYXV0aF90b2tlblwiKTtcblxuICAgICAgLy8gUmVkaXJpZ2VyIHZlcnMgbGEgcGFnZSBkZSBjb25uZXhpb25cbiAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgcGVuZGFudCBsYSBkw6ljb25uZXhpb246XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gU2kgbGVzIGRvbm7DqWVzIHNvbnQgZW4gY291cnMgZGUgY2hhcmdlbWVudFxuICBpZiAobG9hZGluZykge1xuICAgIHJldHVybiA8ZGl2PkNoYXJnZW1lbnQuLi48L2Rpdj47XG4gIH1cblxuICAvLyBTaSB1bmUgZXJyZXVyIGVzdCBzdXJ2ZW51ZVxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gPGRpdj5FcnJldXI6IHtlcnJvcn08L2Rpdj47XG4gIH1cblxuICAvLyBTaSBsJ3V0aWxpc2F0ZXVyIG4nZXN0IHBhcyBhdXRoZW50aWZpw6ksIHJlZGlyaWdlciB2ZXJzIGxhIHBhZ2UgZGUgY29ubmV4aW9uXG4gIGlmICghdXNlcikge1xuICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpOyAvLyBSZWRpcmVjdGlvbiBzaSBsJ3V0aWxpc2F0ZXVyIG4nZXN0IHBhcyBhdXRoZW50aWZpw6lcbiAgICByZXR1cm4gbnVsbDsgLy8gUmV0b3VybmVyIG51bGwgcGVuZGFudCBsYSByZWRpcmVjdGlvblxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweC00IHB5LThcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBweC00IHB0LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTggaC04IG92ZXJmbG93LWhpZGRlbiBiZy1ncmF5LTEwMCByb3VuZGVkLWZ1bGwgZGFyazpiZy1ncmF5LTYwMFwiPlxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHctMTAgaC0xMCB0ZXh0LWdyYXktNDAwIC1sZWZ0LTFcIlxuICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICBkPVwiTTEwIDlhMyAzIDAgMTAwLTYgMyAzIDAgMDAwIDZ6bS03IDlhNyA3IDAgMTExNCAwSDN6XCJcbiAgICAgICAgICAgICAgY2xpcC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICA+PC9wYXRoPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGgxPkJpZW52ZW51ZSBzdXIgdm90cmUgRGFzaGJvYXJkICE8L2gxPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICB7LyogPGltZ1xuICAgICAgICAgIHNyYz17dXNlcj8ucGljdHVyZX1cbiAgICAgICAgICBhbHQ9XCJQaG90byBkZSBwcm9maWxcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtZnVsbCB3LTMyIGgtMzJcIlxuICAgICAgICAvPiAqL31cbiAgICAgICAgPGRpdj5FbWFpbCA6IHt1c2VyPy5lbWFpbH08L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUxvZ291dH1cbiAgICAgICAgICBjbGFzc05hbWU9XCJiZy1yZWQtNTAwIHRleHQtd2hpdGUgcHgtNCBweS0yIHJvdW5kZWRcIlxuICAgICAgICA+XG4gICAgICAgICAgRMOpY29ubmV4aW9uXG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVNlYXJjaFBhcmFtcyIsInVzZVJvdXRlciIsIkRhc2hib2FyZCIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwic2VhcmNoUGFyYW1zIiwicm91dGVyIiwidG9rZW4iLCJnZXQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZmV0Y2hVc2VyRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImNyZWRlbnRpYWxzIiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImxvZyIsInNlbmREYXRhVG9FeHRlbnNpb24iLCJ1c2VyRGF0YSIsIndpbmRvdyIsInBvc3RNZXNzYWdlIiwiYWN0aW9uIiwibG9jYXRpb24iLCJvcmlnaW4iLCJoYW5kbGVMb2dvdXQiLCJnZXRJdGVtIiwicHVzaCIsInJlbW92ZUl0ZW0iLCJkaXYiLCJtYWluIiwiY2xhc3NOYW1lIiwic3ZnIiwiZmlsbCIsInZpZXdCb3giLCJ4bWxucyIsInBhdGgiLCJmaWxsLXJ1bGUiLCJkIiwiY2xpcC1ydWxlIiwiaDEiLCJlbWFpbCIsImJ1dHRvbiIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/page.tsx\n"));

/***/ })

});