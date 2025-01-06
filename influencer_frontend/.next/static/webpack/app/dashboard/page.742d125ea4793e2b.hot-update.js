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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Dashboard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Dashboard() {\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Récupérer le token depuis l'URL via searchParams\n        const token = searchParams.get(\"token\");\n        if (token) {\n            localStorage.setItem(\"auth_token\", token);\n            // Utiliser le token pour récupérer les données de l'utilisateur\n            const fetchUserData = async ()=>{\n                try {\n                    const response = await fetch(\"http://localhost:3000/auth/user\", {\n                        method: \"GET\",\n                        headers: {\n                            \"Content-Type\": \"application/json\",\n                            Authorization: \"Bearer \".concat(token)\n                        },\n                        credentials: \"include\"\n                    });\n                    if (!response.ok) {\n                        throw new Error(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es.\");\n                    }\n                    const data = await response.json();\n                    console.log(\"data\", data);\n                    // Sauvegarder les données utilisateur dans le localStorage pour les prochaines ouvertures du popup\n                    localStorage.setItem(\"user_data\", JSON.stringify(data));\n                    console.log(localStorage);\n                    setUser(data);\n                    sendDataToExtension(data);\n                } catch (error) {\n                    setError(\"Erreur lors de la r\\xe9cup\\xe9ration des donn\\xe9es utilisateur.\");\n                } finally{\n                    setLoading(false);\n                }\n            };\n            fetchUserData();\n            // Send data to extension afeter user connected\n            const sendDataToExtension = async (userData)=>{\n                userData = JSON.parse(localStorage.getItem(\"user_data\") || \"null\");\n                if (!userData) {\n                    const updateUserData = await fetchUserData();\n                    if (updateUserData) {\n                        window.post;\n                    }\n                }\n                window.postMessage({\n                    action: \"sendData\",\n                    data: userData\n                }, window.location.origin);\n            };\n        } else {\n            setError(\"Aucun token trouv\\xe9 dans l'URL.\");\n            setLoading(false);\n        }\n    }, [\n        searchParams\n    ]);\n    // // Send data to extension afeter user connected\n    // const sendDataToExtension = (userData: any) => {\n    //   window.postMessage(\n    //     { action: \"sendData\", data: userData },\n    //     window.location.origin\n    //   );\n    // };\n    // Logout\n    const handleLogout = async ()=>{\n        try {\n            const token = localStorage.getItem(\"auth_token\");\n            if (!token) {\n                router.push(\"/login\");\n                return;\n            }\n            const response = await fetch(\"http://localhost:3000/auth/logout\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                credentials: \"include\"\n            });\n            if (!response.ok) {\n                throw new Error(\"Erreur lors de la d\\xe9connexion.\");\n            }\n            localStorage.removeItem(\"auth_token\");\n            sessionStorage.clear();\n            window.location.href = \"/login\";\n        } catch (error) {\n            console.error(\"Erreur pendant la d\\xe9connexion:\", error);\n        }\n    };\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Chargement...\"\n        }, void 0, false, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 121,\n            columnNumber: 12\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Erreur: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n            lineNumber: 125,\n            columnNumber: 12\n        }, this);\n    }\n    if (!user) {\n        router.push(\"/login\");\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-end px-4 pt-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                        src: user === null || user === void 0 ? void 0 : user.data.picture,\n                        alt: \"Photo de profil\",\n                        className: \"rounded-full w-8 h-8\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 137,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                    lineNumber: 136,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 135,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: [\n                    \"Bienvenue sur votre Dashboard \",\n                    user === null || user === void 0 ? void 0 : user.data.name,\n                    \"!\"\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 144,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            \"Email : \",\n                            user === null || user === void 0 ? void 0 : user.data.email\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 146,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleLogout,\n                        className: \"bg-red-500 text-white px-4 py-2 rounded\",\n                        children: \"D\\xe9connexion\"\n                    }, void 0, false, {\n                        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                        lineNumber: 147,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n                lineNumber: 145,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/viann/pandore/influenceurs/influencer_frontend/app/dashboard/page.tsx\",\n        lineNumber: 134,\n        columnNumber: 5\n    }, this);\n}\n_s(Dashboard, \"PG9jfsbDXnqLO4TTv/OSWCha0sc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Dashboard;\nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFbUQ7QUFDVTtBQUU5QyxTQUFTSzs7SUFDdEIsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdOLCtDQUFRQSxDQUFNO0lBQ3RDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQWdCO0lBRWxELE1BQU1XLGVBQWVULGdFQUFlQTtJQUNwQyxNQUFNVSxTQUFTVCwwREFBU0E7SUFFeEJGLGdEQUFTQSxDQUFDO1FBQ1IsbURBQW1EO1FBQ25ELE1BQU1ZLFFBQVFGLGFBQWFHLEdBQUcsQ0FBQztRQUUvQixJQUFJRCxPQUFPO1lBQ1RFLGFBQWFDLE9BQU8sQ0FBQyxjQUFjSDtZQUVuQyxnRUFBZ0U7WUFDaEUsTUFBTUksZ0JBQWdCO2dCQUNwQixJQUFJO29CQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxtQ0FBbUM7d0JBQzlEQyxRQUFRO3dCQUNSQyxTQUFTOzRCQUNQLGdCQUFnQjs0QkFDaEJDLGVBQWUsVUFBZ0IsT0FBTlQ7d0JBQzNCO3dCQUNBVSxhQUFhO29CQUNmO29CQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO3dCQUNoQixNQUFNLElBQUlDLE1BQU07b0JBQ2xCO29CQUVBLE1BQU1DLE9BQU8sTUFBTVIsU0FBU1MsSUFBSTtvQkFFaENDLFFBQVFDLEdBQUcsQ0FBQyxRQUFRSDtvQkFFcEIsbUdBQW1HO29CQUNuR1gsYUFBYUMsT0FBTyxDQUFDLGFBQWFjLEtBQUtDLFNBQVMsQ0FBQ0w7b0JBQ2pERSxRQUFRQyxHQUFHLENBQUNkO29CQUVaVCxRQUFRb0I7b0JBQ1JNLG9CQUFvQk47Z0JBQ3RCLEVBQUUsT0FBT2pCLE9BQU87b0JBQ2RDLFNBQVM7Z0JBQ1gsU0FBVTtvQkFDUkYsV0FBVztnQkFDYjtZQUNGO1lBRUFTO1lBRUEsK0NBQStDO1lBQy9DLE1BQU1lLHNCQUFzQixPQUFPQztnQkFDakNBLFdBQVdILEtBQUtJLEtBQUssQ0FBQ25CLGFBQWFvQixPQUFPLENBQUMsZ0JBQWdCO2dCQUUzRCxJQUFHLENBQUNGLFVBQVU7b0JBQ1osTUFBTUcsaUJBQWlCLE1BQU1uQjtvQkFFN0IsSUFBSW1CLGdCQUFnQjt3QkFDbEJDLE9BQU9DLElBQUk7b0JBQ2I7Z0JBQ0Y7Z0JBRUFELE9BQU9FLFdBQVcsQ0FDaEI7b0JBQUVDLFFBQVE7b0JBQVlkLE1BQU1PO2dCQUFTLEdBQ3JDSSxPQUFPSSxRQUFRLENBQUNDLE1BQU07WUFFMUI7UUFFRixPQUFPO1lBQ0xoQyxTQUFTO1lBQ1RGLFdBQVc7UUFDYjtJQUNGLEdBQUc7UUFBQ0c7S0FBYTtJQUVqQixrREFBa0Q7SUFDbEQsbURBQW1EO0lBQ25ELHdCQUF3QjtJQUN4Qiw4Q0FBOEM7SUFDOUMsNkJBQTZCO0lBQzdCLE9BQU87SUFDUCxLQUFLO0lBRUwsU0FBUztJQUNULE1BQU1nQyxlQUFlO1FBQ25CLElBQUk7WUFDRixNQUFNOUIsUUFBUUUsYUFBYW9CLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUN0QixPQUFPO2dCQUNWRCxPQUFPZ0MsSUFBSSxDQUFDO2dCQUNaO1lBQ0Y7WUFFQSxNQUFNMUIsV0FBVyxNQUFNQyxNQUFNLHFDQUFxQztnQkFDaEVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO29CQUNoQkMsZUFBZSxVQUFnQixPQUFOVDtnQkFDM0I7Z0JBQ0FVLGFBQWE7WUFDZjtZQUVBLElBQUksQ0FBQ0wsU0FBU00sRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQVYsYUFBYThCLFVBQVUsQ0FBQztZQUV4QkMsZUFBZUMsS0FBSztZQUVwQlYsT0FBT0ksUUFBUSxDQUFDTyxJQUFJLEdBQUc7UUFDekIsRUFBRSxPQUFPdkMsT0FBTztZQUNkbUIsUUFBUW5CLEtBQUssQ0FBQyxxQ0FBa0NBO1FBQ2xEO0lBQ0Y7SUFFQSxJQUFJRixTQUFTO1FBQ1gscUJBQU8sOERBQUMwQztzQkFBSTs7Ozs7O0lBQ2Q7SUFFQSxJQUFJeEMsT0FBTztRQUNULHFCQUFPLDhEQUFDd0M7O2dCQUFJO2dCQUFTeEM7Ozs7Ozs7SUFDdkI7SUFFQSxJQUFJLENBQUNKLE1BQU07UUFDVE8sT0FBT2dDLElBQUksQ0FBQztRQUNaLE9BQU87SUFDVDtJQUVBLHFCQUNFLDhEQUFDTTtRQUFLQyxXQUFVOzswQkFDZCw4REFBQ0Y7Z0JBQUlFLFdBQVU7MEJBQ2IsNEVBQUNGO29CQUFJRSxXQUFVOzhCQUNiLDRFQUFDQzt3QkFDQ0MsR0FBRyxFQUFFaEQsaUJBQUFBLDJCQUFBQSxLQUFNcUIsSUFBSSxDQUFDNEIsT0FBTzt3QkFDdkJDLEtBQUk7d0JBQ0pKLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSWhCLDhEQUFDSzs7b0JBQUc7b0JBQStCbkQsaUJBQUFBLDJCQUFBQSxLQUFNcUIsSUFBSSxDQUFDK0IsSUFBSTtvQkFBQzs7Ozs7OzswQkFDbkQsOERBQUNSO2dCQUFJRSxXQUFVOztrQ0FDYiw4REFBQ0Y7OzRCQUFJOzRCQUFTNUMsaUJBQUFBLDJCQUFBQSxLQUFNcUIsSUFBSSxDQUFDZ0MsS0FBSzs7Ozs7OztrQ0FDOUIsOERBQUNDO3dCQUNDQyxTQUFTakI7d0JBQ1RRLFdBQVU7a0NBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1UO0dBdEp3Qi9DOztRQUtERiw0REFBZUE7UUFDckJDLHNEQUFTQTs7O0tBTkZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9kYXNoYm9hcmQvcGFnZS50c3g/ZDEyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVNlYXJjaFBhcmFtcywgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXNoYm9hcmQoKSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVzZVNlYXJjaFBhcmFtcygpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFLDqWN1cMOpcmVyIGxlIHRva2VuIGRlcHVpcyBsJ1VSTCB2aWEgc2VhcmNoUGFyYW1zXG4gICAgY29uc3QgdG9rZW4gPSBzZWFyY2hQYXJhbXMuZ2V0KFwidG9rZW5cIik7XG5cbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYXV0aF90b2tlblwiLCB0b2tlbik7XG5cbiAgICAgIC8vIFV0aWxpc2VyIGxlIHRva2VuIHBvdXIgcsOpY3Vww6lyZXIgbGVzIGRvbm7DqWVzIGRlIGwndXRpbGlzYXRldXJcbiAgICAgIGNvbnN0IGZldGNoVXNlckRhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL3VzZXJcIiwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIGRvbm7DqWVzLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhXCIsIGRhdGEpO1xuXG4gICAgICAgICAgLy8gU2F1dmVnYXJkZXIgbGVzIGRvbm7DqWVzIHV0aWxpc2F0ZXVyIGRhbnMgbGUgbG9jYWxTdG9yYWdlIHBvdXIgbGVzIHByb2NoYWluZXMgb3V2ZXJ0dXJlcyBkdSBwb3B1cFxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcl9kYXRhXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UpXG5cbiAgICAgICAgICBzZXRVc2VyKGRhdGEpO1xuICAgICAgICAgIHNlbmREYXRhVG9FeHRlbnNpb24oZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgc2V0RXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgZG9ubsOpZXMgdXRpbGlzYXRldXIuXCIpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmZXRjaFVzZXJEYXRhKCk7XG5cbiAgICAgIC8vIFNlbmQgZGF0YSB0byBleHRlbnNpb24gYWZldGVyIHVzZXIgY29ubmVjdGVkXG4gICAgICBjb25zdCBzZW5kRGF0YVRvRXh0ZW5zaW9uID0gYXN5bmMgKHVzZXJEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9kYXRhXCIpIHx8IFwibnVsbFwiKTtcblxuICAgICAgICBpZighdXNlckRhdGEpIHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVVc2VyRGF0YSA9IGF3YWl0IGZldGNoVXNlckRhdGEoKTtcblxuICAgICAgICAgIGlmICh1cGRhdGVVc2VyRGF0YSkge1xuICAgICAgICAgICAgd2luZG93LnBvc3RcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoXG4gICAgICAgICAgeyBhY3Rpb246IFwic2VuZERhdGFcIiwgZGF0YTogdXNlckRhdGEgfSxcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEVycm9yKFwiQXVjdW4gdG9rZW4gdHJvdXbDqSBkYW5zIGwnVVJMLlwiKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW3NlYXJjaFBhcmFtc10pO1xuXG4gIC8vIC8vIFNlbmQgZGF0YSB0byBleHRlbnNpb24gYWZldGVyIHVzZXIgY29ubmVjdGVkXG4gIC8vIGNvbnN0IHNlbmREYXRhVG9FeHRlbnNpb24gPSAodXNlckRhdGE6IGFueSkgPT4ge1xuICAvLyAgIHdpbmRvdy5wb3N0TWVzc2FnZShcbiAgLy8gICAgIHsgYWN0aW9uOiBcInNlbmREYXRhXCIsIGRhdGE6IHVzZXJEYXRhIH0sXG4gIC8vICAgICB3aW5kb3cubG9jYXRpb24ub3JpZ2luXG4gIC8vICAgKTtcbiAgLy8gfTtcblxuICAvLyBMb2dvdXRcbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYXV0aF90b2tlblwiKTtcbiAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgcm91dGVyLnB1c2goXCIvbG9naW5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL2xvZ291dFwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgfSxcbiAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgZMOpY29ubmV4aW9uLlwiKTtcbiAgICAgIH1cblxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJhdXRoX3Rva2VuXCIpO1xuXG4gICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2xvZ2luXCI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgcGVuZGFudCBsYSBkw6ljb25uZXhpb246XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gPGRpdj5DaGFyZ2VtZW50Li4uPC9kaXY+O1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIDxkaXY+RXJyZXVyOiB7ZXJyb3J9PC9kaXY+O1xuICB9XG5cbiAgaWYgKCF1c2VyKSB7XG4gICAgcm91dGVyLnB1c2goXCIvbG9naW5cIik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIHB4LTQgcHQtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctOCBoLTggb3ZlcmZsb3ctaGlkZGVuIGJnLWdyYXktMTAwIHJvdW5kZWQtZnVsbCBkYXJrOmJnLWdyYXktNjAwXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPXt1c2VyPy5kYXRhLnBpY3R1cmV9XG4gICAgICAgICAgICBhbHQ9XCJQaG90byBkZSBwcm9maWxcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIHctOCBoLThcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8aDE+QmllbnZlbnVlIHN1ciB2b3RyZSBEYXNoYm9hcmQge3VzZXI/LmRhdGEubmFtZX0hPC9oMT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPGRpdj5FbWFpbCA6IHt1c2VyPy5kYXRhLmVtYWlsfTwvZGl2PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlTG9nb3V0fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXJlZC01MDAgdGV4dC13aGl0ZSBweC00IHB5LTIgcm91bmRlZFwiXG4gICAgICAgID5cbiAgICAgICAgICBEw6ljb25uZXhpb25cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVNlYXJjaFBhcmFtcyIsInVzZVJvdXRlciIsIkRhc2hib2FyZCIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwic2VhcmNoUGFyYW1zIiwicm91dGVyIiwidG9rZW4iLCJnZXQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZmV0Y2hVc2VyRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImNyZWRlbnRpYWxzIiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZW5kRGF0YVRvRXh0ZW5zaW9uIiwidXNlckRhdGEiLCJwYXJzZSIsImdldEl0ZW0iLCJ1cGRhdGVVc2VyRGF0YSIsIndpbmRvdyIsInBvc3QiLCJwb3N0TWVzc2FnZSIsImFjdGlvbiIsImxvY2F0aW9uIiwib3JpZ2luIiwiaGFuZGxlTG9nb3V0IiwicHVzaCIsInJlbW92ZUl0ZW0iLCJzZXNzaW9uU3RvcmFnZSIsImNsZWFyIiwiaHJlZiIsImRpdiIsIm1haW4iLCJjbGFzc05hbWUiLCJpbWciLCJzcmMiLCJwaWN0dXJlIiwiYWx0IiwiaDEiLCJuYW1lIiwiZW1haWwiLCJidXR0b24iLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/dashboard/page.tsx\n"));

/***/ })

});