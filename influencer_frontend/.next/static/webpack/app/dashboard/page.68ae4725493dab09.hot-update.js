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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Dashboard() {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Récupérer le token depuis l'URL via searchParams\n        const token = searchParams.get(\"token\");\n        if (token) {\n            localStorage.setItem(\"auth_token\", token);\n            // Utiliser le token pour récupérer les données de l'utilisateur\n            const fetchUserData1 = async ()=>{\n                try {\n                    const response = await fetch(\"http://localhost:3000/auth/user\", {\n                        method: \"GET\",\n                        headers: {\n                            \"Content-Type\": \"application/json\",\n                            Authorization: \"Bearer \".concat(token)\n                        },\n                        credentials: \"include\"\n                    });\n                    if (!response.ok) {\n                        throw new Error(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es.\");\n                    }\n                    const data1 = await response.json();\n                    console.log(\"data\", data1);\n                    setUser(data1);\n                } catch (error) {\n                    setError(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es utilisateur.\");\n                } finally{\n                    setLoading(false);\n                }\n            };\n            fetchUserData1();\n        } else {\n            setError(\"Aucun token trouv\\xe9 dans l'URL.\");\n            setLoading(false);\n        }\n    }, [\n        searchParams\n    ]);\n    const sendDataToExtension = ()=>{\n        fetchUserData();\n        window.postMessage({\n            action: \"sendData\",\n            data: data\n        }, window.location.origin);\n    };\n    const handleLogout = async ()=>{\n        try {\n            const token = localStorage.getItem(\"auth_token\");\n            if (!token) {\n                router.push(\"/login\");\n                return;\n            }\n            const response = await fetch(\"http://localhost:3000/auth/logout\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                credentials: \"include\"\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la d\\xe9connexion.\");\n            }\n            // Supprimer le token du localStorage\n            localStorage.removeItem(\"auth_token\");\n            // Rediriger vers la page de connexion\n            router.push(\"/login\");\n        } catch (error) {\n            console.error(\"Erreur pendant la d\\xe9connexion:\", error);\n        }\n    };\n    // Si les données sont en cours de chargement\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Chargement...\"\n        }, void 0, false, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 99,\n            columnNumber: 12\n        }, this);\n    }\n    // Si une erreur est survenue\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Erreur: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 104,\n            columnNumber: 12\n        }, this);\n    }\n    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion\n    if (!user) {\n        router.push(\"/login\"); // Redirection si l'utilisateur n'est pas authentifié\n        return null; // Retourner null pendant la redirection\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-end px-4 pt-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                        className: \"absolute w-10 h-10 text-gray-400 -left-1\",\n                        fill: \"currentColor\",\n                        viewBox: \"0 0 20 20\",\n                        xmlns: \"http://www.w3.org/2000/svg\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                            \"fill-rule\": \"evenodd\",\n                            d: \"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z\",\n                            \"clip-rule\": \"evenodd\"\n                        }, void 0, false, {\n                            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                            lineNumber: 123,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 117,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                    lineNumber: 116,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 115,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Bienvenue sur votre Dashboard !\"\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 131,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Email : \",\n                            user === null || user === void 0 ? void 0 : user.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 138,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleLogout,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"D\\xe9connexion\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 139,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: sendDataToExtension,\n                        children: \"Envoyer les donn\\xe9es \\xe0 l'extension\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 145,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 132,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n        lineNumber: 114,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"PG9jfsbDXnqLO4TTv/OSWCha0sc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFbUQ7QUFDVTtBQUU5QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFNO0lBQ3RDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQWdCO0lBRWxELE1BQU1XLGVBQWVULGdFQUFlQTtJQUNwQyxNQUFNVSxTQUFTVCwwREFBU0E7SUFFeEJGLGdEQUFTQSxDQUFDO1FBQ1IsbURBQW1EO1FBQ25ELE1BQU1ZLFFBQVFGLGFBQWFHLEdBQUcsQ0FBQztRQUUvQixJQUFJRCxPQUFPO1lBQ1RFLGFBQWFDLE9BQU8sQ0FBQyxjQUFjSDtZQUVuQyxnRUFBZ0U7WUFDaEUsTUFBTUksaUJBQWdCO2dCQUNwQixJQUFJO29CQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxtQ0FBbUM7d0JBQzlEQyxRQUFRO3dCQUNSQyxTQUFTOzRCQUNQLGdCQUFnQjs0QkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlQ7d0JBQzNCO3dCQUNBVSxhQUFhO29CQUNmO29CQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO3dCQUNoQixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLFFBQU8sTUFBTVIsU0FBU1MsSUFBSTtvQkFFaENDLFFBQVFDLEdBQUcsQ0FBQyxRQUFRSDtvQkFFcEJwQixRQUFRb0I7Z0JBQ1YsRUFBRSxPQUFPakIsT0FBTztvQkFDZEMsU0FBUztnQkFDWCxTQUFVO29CQUNSRixXQUFXO2dCQUNiO1lBQ0Y7WUFFQVM7UUFDRixPQUFPO1lBQ0xQLFNBQVM7WUFDVEYsV0FBVztRQUNiO0lBQ0YsR0FBRztRQUFDRztLQUFhO0lBRWpCLE1BQU1tQixzQkFBc0I7UUFDMUJiO1FBR0FjLE9BQU9DLFdBQVcsQ0FDaEI7WUFBRUMsUUFBUTtZQUFZUCxNQUFNQTtRQUFLLEdBQ2pDSyxPQUFPRyxRQUFRLENBQUNDLE1BQU07SUFFMUI7SUFFQSxNQUFNQyxlQUFlO1FBQ25CLElBQUk7WUFDRixNQUFNdkIsUUFBUUUsYUFBYXNCLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUN4QixPQUFPO2dCQUNWRCxPQUFPMEIsSUFBSSxDQUFDO2dCQUNaO1lBQ0Y7WUFFQSxNQUFNcEIsV0FBVyxNQUFNQyxNQUFNLHFDQUFxQztnQkFDaEVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO29CQUNoQkMsZUFBZSxVQUFnQixPQUFOVDtnQkFDM0I7Z0JBQ0FVLGFBQWE7WUFDZjtZQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxxQ0FBcUM7WUFDckNWLGFBQWF3QixVQUFVLENBQUM7WUFFeEIsc0NBQXNDO1lBQ3RDM0IsT0FBTzBCLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBTzdCLE9BQU87WUFDZG1CLFFBQVFuQixLQUFLLENBQUMscUNBQWtDQTtRQUNsRDtJQUNGO0lBRUEsNkNBQTZDO0lBQzdDLElBQUlGLFNBQVM7UUFDWCxxQkFBTyw4REFBQ2lDO3NCQUFJOzs7Ozs7SUFDZDtJQUVBLDZCQUE2QjtJQUM3QixJQUFJL0IsT0FBTztRQUNULHFCQUFPLDhEQUFDK0I7O2dCQUFJO2dCQUFTL0I7Ozs7Ozs7SUFDdkI7SUFFQSw4RUFBOEU7SUFDOUUsSUFBSSxDQUFDSixNQUFNO1FBQ1RPLE9BQU8wQixJQUFJLENBQUMsV0FBVyxxREFBcUQ7UUFDNUUsT0FBTyxNQUFNLHdDQUF3QztJQUN2RDtJQUVBLHFCQUNFLDhEQUFDRztRQUFLQyxXQUFVOzswQkFDZCw4REFBQ0Y7Z0JBQUlFLFdBQVU7MEJBQ2IsNEVBQUNGO29CQUFJRSxXQUFVOzhCQUNiLDRFQUFDQzt3QkFDQ0QsV0FBVTt3QkFDVkUsTUFBSzt3QkFDTEMsU0FBUTt3QkFDUkMsT0FBTTtrQ0FFTiw0RUFBQ0M7NEJBQ0NDLGFBQVU7NEJBQ1ZDLEdBQUU7NEJBQ0ZDLGFBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFLbEIsOERBQUNDOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNYO2dCQUFJRSxXQUFVOztrQ0FNYiw4REFBQ0Y7OzRCQUFJOzRCQUFTbkMsaUJBQUFBLDJCQUFBQSxLQUFNK0MsS0FBSzs7Ozs7OztrQ0FDekIsOERBQUNDO3dCQUNDQyxTQUFTbEI7d0JBQ1RNLFdBQVU7a0NBQ1g7Ozs7OztrQ0FHRCw4REFBQ1c7d0JBQU9DLFNBQVN4QjtrQ0FBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUs5QztHQWhKd0IxQjs7UUFLREYsNERBQWVBO1FBQ3JCQyxzREFBU0E7OztLQU5GQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZGFzaGJvYXJkL3BhZ2UudHN4P2QxMjUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMsIHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGFzaGJvYXJkKCkge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBSw6ljdXDDqXJlciBsZSB0b2tlbiBkZXB1aXMgbCdVUkwgdmlhIHNlYXJjaFBhcmFtc1xuICAgIGNvbnN0IHRva2VuID0gc2VhcmNoUGFyYW1zLmdldChcInRva2VuXCIpO1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImF1dGhfdG9rZW5cIiwgdG9rZW4pO1xuXG4gICAgICAvLyBVdGlsaXNlciBsZSB0b2tlbiBwb3VyIHLDqWN1cMOpcmVyIGxlcyBkb25uw6llcyBkZSBsJ3V0aWxpc2F0ZXVyXG4gICAgICBjb25zdCBmZXRjaFVzZXJEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvYXV0aC91c2VyXCIsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBkb25uw6llcy5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKTtcblxuICAgICAgICAgIHNldFVzZXIoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgc2V0RXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMgdXRpbGlzYXRldXIuXCIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmZXRjaFVzZXJEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEVycm9yKFwiQXVjdW4gdG9rZW4gdHJvdXbDqSBkYW5zIGwnVVJMLlwiKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW3NlYXJjaFBhcmFtc10pO1xuXG4gIGNvbnN0IHNlbmREYXRhVG9FeHRlbnNpb24gPSAoKSA9PiB7XG4gICAgZmV0Y2hVc2VyRGF0YSgpO1xuXG5cbiAgICB3aW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICB7IGFjdGlvbjogXCJzZW5kRGF0YVwiLCBkYXRhOiBkYXRhIH0sXG4gICAgICB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVMb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhdXRoX3Rva2VuXCIpO1xuICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvbG9nb3V0XCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSBkw6ljb25uZXhpb24uXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBTdXBwcmltZXIgbGUgdG9rZW4gZHUgbG9jYWxTdG9yYWdlXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImF1dGhfdG9rZW5cIik7XG5cbiAgICAgIC8vIFJlZGlyaWdlciB2ZXJzIGxhIHBhZ2UgZGUgY29ubmV4aW9uXG4gICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBwZW5kYW50IGxhIGTDqWNvbm5leGlvbjpcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvLyBTaSBsZXMgZG9ubsOpZXMgc29udCBlbiBjb3VycyBkZSBjaGFyZ2VtZW50XG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIDxkaXY+Q2hhcmdlbWVudC4uLjwvZGl2PjtcbiAgfVxuXG4gIC8vIFNpIHVuZSBlcnJldXIgZXN0IHN1cnZlbnVlXG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiA8ZGl2PkVycmV1cjoge2Vycm9yfTwvZGl2PjtcbiAgfVxuXG4gIC8vIFNpIGwndXRpbGlzYXRldXIgbidlc3QgcGFzIGF1dGhlbnRpZmnDqSwgcmVkaXJpZ2VyIHZlcnMgbGEgcGFnZSBkZSBjb25uZXhpb25cbiAgaWYgKCF1c2VyKSB7XG4gICAgcm91dGVyLnB1c2goXCIvbG9naW5cIik7IC8vIFJlZGlyZWN0aW9uIHNpIGwndXRpbGlzYXRldXIgbidlc3QgcGFzIGF1dGhlbnRpZmnDqVxuICAgIHJldHVybiBudWxsOyAvLyBSZXRvdXJuZXIgbnVsbCBwZW5kYW50IGxhIHJlZGlyZWN0aW9uXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIHB4LTQgcHQtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctOCBoLTggb3ZlcmZsb3ctaGlkZGVuIGJnLWdyYXktMTAwIHJvdW5kZWQtZnVsbCBkYXJrOmJnLWdyYXktNjAwXCI+XG4gICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdy0xMCBoLTEwIHRleHQtZ3JheS00MDAgLWxlZnQtMVwiXG4gICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjAgMjBcIlxuICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgIGQ9XCJNMTAgOWEzIDMgMCAxMDAtNiAzIDMgMCAwMDAgNnptLTcgOWE3IDcgMCAxMTE0IDBIM3pcIlxuICAgICAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8aDE+QmllbnZlbnVlIHN1ciB2b3RyZSBEYXNoYm9hcmQgITwvaDE+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgIHsvKiA8aW1nXG4gICAgICAgICAgc3JjPXt1c2VyPy5waWN0dXJlfVxuICAgICAgICAgIGFsdD1cIlBob3RvIGRlIHByb2ZpbFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIHctMzIgaC0zMlwiXG4gICAgICAgIC8+ICovfVxuICAgICAgICA8ZGl2PkVtYWlsIDoge3VzZXI/LmVtYWlsfTwvZGl2PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlTG9nb3V0fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXJlZC01MDAgdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZFwiXG4gICAgICAgID5cbiAgICAgICAgICBEw6ljb25uZXhpb25cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17c2VuZERhdGFUb0V4dGVuc2lvbn0+RW52b3llciBsZXMgZG9ubsOpZXMgw6AgbCdleHRlbnNpb248L2J1dHRvbj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWFyY2hQYXJhbXMiLCJ1c2VSb3V0ZXIiLCJEYXNoYm9hcmQiLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsInNlYXJjaFBhcmFtcyIsInJvdXRlciIsInRva2VuIiwiZ2V0IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImZldGNoVXNlckRhdGEiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJjcmVkZW50aWFscyIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJzZW5kRGF0YVRvRXh0ZW5zaW9uIiwid2luZG93IiwicG9zdE1lc3NhZ2UiLCJhY3Rpb24iLCJsb2NhdGlvbiIsIm9yaWdpbiIsImhhbmRsZUxvZ291dCIsImdldEl0ZW0iLCJwdXNoIiwicmVtb3ZlSXRlbSIsImRpdiIsIm1haW4iLCJjbGFzc05hbWUiLCJzdmciLCJmaWxsIiwidmlld0JveCIsInhtbG5zIiwicGF0aCIsImZpbGwtcnVsZSIsImQiLCJjbGlwLXJ1bGUiLCJoMSIsImVtYWlsIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/page.tsx\n"));

/***/ })

});