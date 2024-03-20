// "use strict";
// var __assign = (this && this.__assign) || function () {
//   __assign = Object.assign || function (t) {
//     for (var s, i = 1, n = arguments.length; i < n; i++) {
//       s = arguments[i];
//       for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
//         t[p] = s[p];
//     }
//     return t;
//   };
//   return __assign.apply(this, arguments);
// };
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//   function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//   return new (P || (P = Promise))(function (resolve, reject) {
//     function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//     function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//     function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//     step((generator = generator.apply(thisArg, _arguments || [])).next());
//   });
// };
// var __generator = (this && this.__generator) || function (thisArg, body) {
//   var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
//   return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
//   function verb(n) { return function (v) { return step([n, v]); }; }
//   function step(op) {
//     if (f) throw new TypeError("Generator is already executing.");
//     while (g && (g = 0, op[0] && (_ = 0)), _) try {
//       if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
//       if (y = 0, t) op = [op[0] & 2, t.value];
//       switch (op[0]) {
//         case 0: case 1: t = op; break;
//         case 4: _.label++; return { value: op[1], done: false };
//         case 5: _.label++; y = op[1]; op = [0]; continue;
//         case 7: op = _.ops.pop(); _.trys.pop(); continue;
//         default:
//           if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
//           if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
//           if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
//           if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
//           if (t[2]) _.ops.pop();
//           _.trys.pop(); continue;
//       }
//       op = body.call(thisArg, _);
//     } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
//     if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
//   }
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// var axios_1 = require("axios");
// var dayjs_1 = require("dayjs");
// var he_1 = require("he");
// var crypto_js_1 = require("crypto-js");
// var headers = {
//   "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
//   accept: "*/*",
//   "accept-encoding": "gzip, deflate, br",
//   "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
// };
// var cookie;
// /** 获取cid */
// function getCid(bvid, aid) {
//   return __awaiter(this, void 0, void 0, function () {
//     var params, cidRes;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0:
//           params = bvid
//             ? {
//               bvid: bvid,
//             }
//             : {
//               aid: aid,
//             };
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/web-interface/view?%s", {
//             headers: headers,
//             params: params,
//           })];
//         case 1:
//           cidRes = (_a.sent()).data;
//           return [2 /*return*/, cidRes];
//       }
//     });
//   });
// }
// /** 格式化 */
// function durationToSec(duration) {
//   if (typeof duration === "number") {
//     return duration;
//   }
//   if (typeof duration === "string") {
//     var dur = duration.split(":");
//     return dur.reduce(function (prev, curr) {
//       return 60 * prev + +curr;
//     }, 0);
//   }
//   return 0;
// }
// var searchHeaders = {
//   "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
//   accept: "application/json, text/plain, */*",
//   "accept-encoding": "gzip, deflate, br",
//   origin: "https://search.bilibili.com",
//   "sec-fetch-site": "same-site",
//   "sec-fetch-mode": "cors",
//   "sec-fetch-dest": "empty",
//   referer: "https://search.bilibili.com/",
//   "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
// };
// function getCookie() {
//   return __awaiter(this, void 0, void 0, function () {
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0:
//           if (!!cookie) return [3 /*break*/, 2];
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/frontend/finger/spi", {
//             headers: {
//               "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/114.0.0.0",
//             },
//           })];
//         case 1:
//           cookie = (_a.sent()).data.data;
//           _a.label = 2;
//         case 2: return [2 /*return*/];
//       }
//     });
//   });
// }
// var pageSize = 20;
// /** 搜索 */
// function searchBase(keyword, page, searchType) {
//   return __awaiter(this, void 0, void 0, function () {
//     var params, res;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0: return [4 /*yield*/, getCookie()];
//         case 1:
//           _a.sent();
//           params = {
//             context: "",
//             page: page,
//             order: "",
//             page_size: pageSize,
//             keyword: keyword,
//             duration: "",
//             tids_1: "",
//             tids_2: "",
//             __refresh__: true,
//             _extra: "",
//             highlight: 1,
//             single_column: 0,
//             platform: "pc",
//             from_source: "",
//             search_type: searchType,
//             dynamic_offset: 0,
//           };
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/web-interface/search/type", {
//             headers: __assign(__assign({}, searchHeaders), { cookie: "buvid3=".concat(cookie.b_3, ";buvid4=").concat(cookie.b_4) }),
//             params: params,
//           })];
//         case 2:
//           res = (_a.sent()).data;
//           return [2 /*return*/, res.data];
//       }
//     });
//   });
// }
// /** 获取收藏夹 */
// function getFavoriteList(id) {
//   return __awaiter(this, void 0, void 0, function () {
//     var result, pageSize, page, _a, medias, has_more, error_1;
//     return __generator(this, function (_b) {
//       switch (_b.label) {
//         case 0:
//           result = [];
//           pageSize = 20;
//           page = 1;
//           _b.label = 1;
//         case 1:
//           if (!true) return [3 /*break*/, 6];
//           _b.label = 2;
//         case 2:
//           _b.trys.push([2, 4, , 5]);
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/v3/fav/resource/list", {
//             params: {
//               media_id: id,
//               platform: "web",
//               ps: pageSize,
//               pn: page,
//             },
//           })];
//         case 3:
//           _a = (_b.sent()).data.data, medias = _a.medias, has_more = _a.has_more;
//           result.push.apply(result, medias);
//           if (!has_more) {
//             return [3 /*break*/, 6];
//           }
//           page += 1;
//           return [3 /*break*/, 5];
//         case 4:
//           error_1 = _b.sent();
//           console.warn(error_1);
//           return [3 /*break*/, 6];
//         case 5: return [3 /*break*/, 1];
//         case 6: return [2 /*return*/, result];
//       }
//     });
//   });
// }
// function formatMedia(result) {
//   var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//   var title = he_1.default.decode((_b = (_a = result.title) === null || _a === void 0 ? void 0 : _a.replace(/(\<em(.*?)\>)|(\<\/em\>)/g, "")) !== null && _b !== void 0 ? _b : "");
//   return {
//     id: (_d = (_c = result.cid) !== null && _c !== void 0 ? _c : result.bvid) !== null && _d !== void 0 ? _d : result.aid,
//     aid: result.aid,
//     bvid: result.bvid,
//     artist: (_e = result.author) !== null && _e !== void 0 ? _e : (_f = result.owner) === null || _f === void 0 ? void 0 : _f.name,
//     title: title,
//     alias: (_g = title.match(/《(.+?)》/)) === null || _g === void 0 ? void 0 : _g[1],
//     album: (_h = result.bvid) !== null && _h !== void 0 ? _h : result.aid,
//     artwork: ((_j = result.pic) === null || _j === void 0 ? void 0 : _j.startsWith("//"))
//       ? "http:".concat(result.pic)
//       : result.pic,
//     // description: result.description,
//     duration: durationToSec(result.duration),
//     tags: (_k = result.tag) === null || _k === void 0 ? void 0 : _k.split(","),
//     date: dayjs_1.default.unix(result.pubdate || result.created).format("YYYY-MM-DD"),
//   };
// }
// function searchAlbum(keyword, page) {
//   return __awaiter(this, void 0, void 0, function () {
//     var resultData, albums;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0: return [4 /*yield*/, searchBase(keyword, page, "video")];
//         case 1:
//           resultData = _a.sent();
//           albums = resultData.result.map(formatMedia);
//           return [2 /*return*/, {
//             isEnd: resultData.numResults <= page * pageSize,
//             data: albums,
//           }];
//       }
//     });
//   });
// }
// function searchArtist(keyword, page) {
//   return __awaiter(this, void 0, void 0, function () {
//     var resultData, artists;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0: return [4 /*yield*/, searchBase(keyword, page, "bili_user")];
//         case 1:
//           resultData = _a.sent();
//           artists = resultData.result.map(function (result) {
//             var _a;
//             return ({
//               name: result.uname,
//               id: result.mid,
//               fans: result.fans,
//               description: result.usign,
//               avatar: ((_a = result.upic) === null || _a === void 0 ? void 0 : _a.startsWith("//"))
//                 ? "https://".concat(result.upic)
//                 : result.upic,
//               worksNum: result.videos,
//             });
//           });
//           return [2 /*return*/, {
//             isEnd: resultData.numResults <= page * pageSize,
//             data: artists,
//           }];
//       }
//     });
//   });
// }
// function getMixinKey(e) {
//   var t = [];
//   return ([
//     46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5,
//     49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55,
//     40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57,
//     62, 11, 36, 20, 34, 44, 52,
//   ].forEach(function (r) {
//     e.charAt(r) && t.push(e.charAt(r));
//   }),
//     t.join("").slice(0, 32));
// }
// function getRid(params) {
//   var npi = "7cd084941338484aae1ad9425b84077c4932caff0ff746eab6f01bf08b70ac45";
//   var o = getMixinKey(npi);
//   var l = Object.keys(params).sort();
//   var c = [];
//   for (var d = 0, u = /[!'\(\)*]/g; d < l.length; ++d) {
//     var _a = [l[d], params[l[d]]], h = _a[0], p = _a[1];
//     p && "string" == typeof p && (p = p.replace(u, "")),
//       null != p &&
//       c.push("".concat(encodeURIComponent(h), "=").concat(encodeURIComponent(p)));
//   }
//   var f = c.join("&");
//   var w_rid = crypto_js_1.default.MD5(f + o).toString();
//   return w_rid;
// }
// function getArtistWorks(artistItem, page, type) {
//   return __awaiter(this, void 0, void 0, function () {
//     var queryHeaders, now, params, w_rid, res, resultData, albums;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0:
//           queryHeaders = {
//             "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
//             accept: "application/json, text/plain, */*",
//             "accept-encoding": "gzip, deflate, br",
//             origin: "https://space.bilibili.com",
//             "sec-fetch-site": "same-site",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-dest": "empty",
//             referer: "https://space.bilibili.com/".concat(artistItem.id, "/video"),
//           };
//           return [4 /*yield*/, getCookie()];
//         case 1:
//           _a.sent();
//           now = Math.round(Date.now() / 1e3);
//           params = {
//             mid: artistItem.id,
//             ps: 30,
//             tid: 0,
//             pn: page,
//             web_location: 1550101,
//             order_avoided: true,
//             order: "pubdate",
//             keyword: "",
//             platform: "web",
//             dm_img_list: "[]",
//             dm_img_str: "V2ViR0wgMS4wIChPcGVuR0wgRVMgMi4wIENocm9taXVtKQ",
//             dm_cover_img_str: "QU5HTEUgKE5WSURJQSwgTlZJRElBIEdlRm9yY2UgR1RYIDE2NTAgKDB4MDAwMDFGOTEpIERpcmVjdDNEMTEgdnNfNV8wIHBzXzVfMCwgRDNEMTEpR29vZ2xlIEluYy4gKE5WSURJQS",
//             dm_img_inter: '{"ds":[],"wh":[0,0,0],"of":[0,0,0]}',
//             wts: now.toString(),
//           };
//           w_rid = getRid(params);
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/space/wbi/arc/search", {
//             headers: __assign(__assign({}, queryHeaders), { cookie: "buvid3=".concat(cookie.b_3, ";buvid4=").concat(cookie.b_4) }),
//             params: __assign(__assign({}, params), { w_rid: w_rid }),
//           })];
//         case 2:
//           res = (_a.sent()).data;
//           resultData = res.data;
//           albums = resultData.list.vlist.map(formatMedia);
//           return [2 /*return*/, {
//             isEnd: resultData.page.pn * resultData.page.ps >= resultData.page.count,
//             data: albums,
//           }];
//       }
//     });
//   });
// }
// /** 获取音源 */
// function getMediaSource(musicItem, quality) {
//   var _a;
//   return __awaiter(this, void 0, void 0, function () {
//     var cid, _params, res, url, audios, hostUrl, _headers;
//     return __generator(this, function (_b) {
//       switch (_b.label) {
//         case 0:
//           cid = musicItem.cid;
//           if (!!cid) return [3 /*break*/, 2];
//           return [4 /*yield*/, getCid(musicItem.bvid, musicItem.aid)];
//         case 1:
//           cid = (_b.sent()).data.cid;
//           _b.label = 2;
//         case 2:
//           _params = musicItem.bvid
//             ? {
//               bvid: musicItem.bvid,
//             }
//             : {
//               aid: musicItem.aid,
//             };
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/player/playurl", {
//             headers: headers,
//             params: __assign(__assign({}, _params), { cid: cid, fnval: 16 }),
//           })];
//         case 3:
//           res = (_b.sent()).data;
//           if (res.data.dash) {
//             audios = res.data.dash.audio;
//             audios.sort(function (a, b) { return a.bandwidth - b.bandwidth; });
//             switch (quality) {
//               case "low":
//                 url = audios[0].baseUrl;
//                 break;
//               case "standard":
//                 url = audios[1].baseUrl;
//                 break;
//               case "high":
//                 url = audios[2].baseUrl;
//                 break;
//               case "super":
//                 url = audios[3].baseUrl;
//                 break;
//             }
//           }
//           else {
//             url = res.data.durl[0].url;
//           }
//           hostUrl = url.substring(url.indexOf("/") + 2);
//           _headers = {
//             "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
//             accept: "*/*",
//             host: hostUrl.substring(0, hostUrl.indexOf("/")),
//             "accept-encoding": "gzip, deflate, br",
//             connection: "keep-alive",
//             referer: "https://www.bilibili.com/video/".concat((_a = (musicItem.bvid !== null && musicItem.bvid !== undefined
//               ? musicItem.bvid
//               : musicItem.aid)) !== null && _a !== void 0 ? _a : ""),
//           };
//           return [2 /*return*/, {
//             url: url,
//             headers: _headers,
//           }];
//       }
//     });
//   });
// }
// function getTopLists() {
//   return __awaiter(this, void 0, void 0, function () {
//     var precious, weekly, weeklyRes, boardKeys, board;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0:
//           precious = {
//             title: "入站必刷",
//             data: [
//               {
//                 id: "popular/precious?page_size=100&page=1",
//                 title: "入站必刷",
//                 coverImg: "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_history.png",
//               },
//             ],
//           };
//           weekly = {
//             title: "每周必看",
//             data: [],
//           };
//           return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/web-interface/popular/series/list", {
//             headers: {
//               "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
//             },
//           })];
//         case 1:
//           weeklyRes = _a.sent();
//           weekly.data = weeklyRes.data.data.list.slice(0, 8).map(function (e) {
//             return ({
//               id: "popular/series/one?number=".concat(e.number),
//               title: e.subject,
//               description: e.name,
//               coverImg: "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_weekly.png",
//             });
//           });
//           boardKeys = [
//             {
//               id: "ranking/v2?rid=0&type=all",
//               title: "全站",
//             },
//             {
//               id: "ranking/v2?rid=3&type=all",
//               title: "音乐",
//             },
//             {
//               id: "ranking/v2?rid=1&type=all",
//               title: "动画",
//             },
//             {
//               id: "ranking/v2?rid=119&type=all",
//               title: "鬼畜",
//             },
//             {
//               id: "ranking/v2?rid=168&type=all",
//               title: "国创相关",
//             },
//             {
//               id: "ranking/v2?rid=129&type=all",
//               title: "舞蹈",
//             },
//             {
//               id: "ranking/v2?rid=4&type=all",
//               title: "游戏",
//             },
//             {
//               id: "ranking/v2?rid=36&type=all",
//               title: "知识",
//             },
//             {
//               id: "ranking/v2?rid=188&type=all",
//               title: "科技",
//             },
//             {
//               id: "ranking/v2?rid=234&type=all",
//               title: "运动",
//             },
//             {
//               id: "ranking/v2?rid=223&type=all",
//               title: "汽车",
//             },
//             {
//               id: "ranking/v2?rid=160&type=all",
//               title: "生活",
//             },
//             {
//               id: "ranking/v2?rid=211&type=all",
//               title: "美食",
//             },
//             {
//               id: "ranking/v2?rid=217&type=all",
//               title: "动物圈",
//             },
//             {
//               id: "ranking/v2?rid=155&type=all",
//               title: "时尚",
//             },
//             {
//               id: "ranking/v2?rid=5&type=all",
//               title: "娱乐",
//             },
//             {
//               id: "ranking/v2?rid=181&type=all",
//               title: "影视",
//             },
//             {
//               id: "ranking/v2?rid=0&type=origin",
//               title: "原创",
//             },
//             {
//               id: "ranking/v2?rid=0&type=rookie",
//               title: "新人",
//             },
//           ];
//           board = {
//             title: "排行榜",
//             data: boardKeys.map(function (_) { return (__assign(__assign({}, _), { coverImg: "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_rank.png" })); }),
//           };
//           return [2 /*return*/, [weekly, precious, board]];
//       }
//     });
//   });
// }
// function getTopListDetail(topListItem) {
//   return __awaiter(this, void 0, void 0, function () {
//     var res;
//     return __generator(this, function (_a) {
//       switch (_a.label) {
//         case 0: return [4 /*yield*/, axios_1.default.get("https://api.bilibili.com/x/web-interface/".concat(topListItem.id), {
//           headers: __assign(__assign({}, headers), { referer: "https://www.bilibili.com/" }),
//         })];
//         case 1:
//           res = _a.sent();
//           return [2 /*return*/, __assign(__assign({}, topListItem), { musicList: res.data.data.list.map(formatMedia) })];
//       }
//     });
//   });
// }
// function importMusicSheet(urlLike) {
//   var _a, _b, _c, _d;
//   return __awaiter(this, void 0, void 0, function () {
//     var id, musicSheet;
//     return __generator(this, function (_e) {
//       switch (_e.label) {
//         case 0:
//           if (!id) {
//             id = (_a = urlLike.match(/^\s*(\d+)\s*$/)) === null || _a === void 0 ? void 0 : _a[1];
//           }
//           if (!id) {
//             id = (_b = urlLike.match(/^(?:.*)fid=(\d+).*$/)) === null || _b === void 0 ? void 0 : _b[1];
//           }
//           if (!id) {
//             id = (_c = urlLike.match(/\/playlist\/pl(\d+)/i)) === null || _c === void 0 ? void 0 : _c[1];
//           }
//           if (!id) {
//             id = (_d = urlLike.match(/\/list\/ml(\d+)/i)) === null || _d === void 0 ? void 0 : _d[1];
//           }
//           if (!id) {
//             return [2 /*return*/];
//           }
//           return [4 /*yield*/, getFavoriteList(id)];
//         case 1:
//           musicSheet = _e.sent();
//           return [2 /*return*/, musicSheet.map(function (_) {
//             var _a, _b;
//             return ({
//               id: _.id,
//               aid: _.aid,
//               bvid: _.bvid,
//               artwork: _.cover,
//               title: _.title,
//               artist: (_a = _.upper) === null || _a === void 0 ? void 0 : _a.name,
//               album: (_b = _.bvid) !== null && _b !== void 0 ? _b : _.aid,
//               duration: durationToSec(_.duration),
//             });
//           })];
//       }
//     });
//   });
// }
// export default {
//   platform: "bilibili",
//   appVersion: ">=0.0",
//   version: "0.1.15",
//   author: "猫头猫",
//   cacheControl: "no-cache",
//   srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/bilibili/index.js",
//   primaryKey: ["id", "aid", "bvid", "cid"],
//   hints: {
//     importMusicSheet: [
//       "bilibili 移动端：APP点击我的，空间，右上角分享，复制链接，浏览器打开切换桌面版网站，点击播放全部视频，复制链接",
//       "bilibili H5/PC端：复制收藏夹URL，或者直接输入ID即可",
//       "非公开收藏夹无法导入，编辑收藏夹改为公开即可",
//       "导入时间和歌单大小有关，请耐心等待",
//     ],
//   },
//   supportedSearchType: ["music", "album", "artist"],
//   search: function (keyword, page, type) {
//     return __awaiter(this, void 0, void 0, function () {
//       return __generator(this, function (_a) {
//         switch (_a.label) {
//           case 0:
//             if (!(type === "album" || type === "music")) return [3 /*break*/, 2];
//             return [4 /*yield*/, searchAlbum(keyword, page)];
//           case 1: return [2 /*return*/, _a.sent()];
//           case 2:
//             if (!(type === "artist")) return [3 /*break*/, 4];
//             return [4 /*yield*/, searchArtist(keyword, page)];
//           case 3: return [2 /*return*/, _a.sent()];
//           case 4: return [2 /*return*/];
//         }
//       });
//     });
//   },
//   getMediaSource: getMediaSource,
//   getAlbumInfo: function (albumItem) {
//     var _a;
//     return __awaiter(this, void 0, void 0, function () {
//       var cidRes, _ref2, cid, pages, musicList;
//       return __generator(this, function (_b) {
//         switch (_b.label) {
//           case 0: return [4 /*yield*/, getCid(albumItem.bvid, albumItem.aid)];
//           case 1:
//             cidRes = _b.sent();
//             _ref2 = (_a = cidRes === null || cidRes === void 0 ? void 0 : cidRes.data) !== null && _a !== void 0 ? _a : {};
//             cid = _ref2.cid;
//             pages = _ref2.pages;
//             if (pages.length === 1) {
//               musicList = [__assign(__assign({}, albumItem), { cid: cid })];
//             }
//             else {
//               musicList = pages.map(function (_) {
//                 return __assign(__assign({}, albumItem), { cid: _.cid, title: _.part, duration: durationToSec(_.duration), id: _.cid });
//               });
//             }
//             return [2 /*return*/, {
//               musicList: musicList,
//             }];
//         }
//       });
//     });
//   },
//   getArtistWorks: getArtistWorks,
//   getTopLists: getTopLists,
//   getTopListDetail: getTopListDetail,
//   importMusicSheet: importMusicSheet,
// };
// // searchAlbum('周杰伦', 2)
// // {
// //   url: 'https://xy60x29x234x168xy.mcdn.bilivideo.cn:4483/upgcxcode/01/93/935359301/935359301-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1685552083&gen=playurlv2&os=mcdn&oi=1698964255&trid=0000c4b8722cca5a4b88b6ffceabb89e7330u&mid=0&platform=pc&upsig=5317110e9e7617d7a04a47fb15f3bd87&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=1003026&bvc=vod&nettype=0&orderid=0,3&buvid=&build=0&agrr=1&bw=13831&logo=A0000001',
// //   headers: {
// //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63',
// //     accept: '*/*',
// //     host: 'xy60x29x234x168xy.mcdn.bilivideo.cn:4483',
// //     'accept-encoding': 'gzip, deflate, br',
// //     connection: 'keep-alive',
// //     referer: 'https://www.bilibili.com/video/BV1Pv4y1z7A1'
// //   }
// // }
// // getMediaSource( {
// //   id: 'BV1r7411p7R4',
// //   aid: 86670567,
// //   bvid: 'BV1r7411p7R4',
// //   artist: 'zyl2012',
// //   title: '【4K修复】周杰伦 - 青花瓷MV 2160P修复版 经典中国风',
// //   album: 'BV1r7411p7R4',
// //   artwork: 'http://i2.hdslb.com/bfs/archive/d6d5176730f19c23e03d3304c7bd30041024d5d8.jpg',
// //   description: '转载自我自己修复\n' +
// //     'DVD修复伪1080P，修复仅为提升观感\n' +
// //     '---------------------\n' +
// //     '2021.4.9\n' +
// //     '重新修复伪4K，修复仅为提升观感',
// //   duration: 242,
// //   date: '2020-02-04'
// // }, 'standard').then(console.log)
// // getArtistWorks({
// //   name: '不想睡觉猫头猫',
// //   id: 12866223,
// //   fans: 1103,
// //   description: '不定期搞搞事情～点个关注吧\n(๑>؂<๑）',
// //   avatar: '//i1.hdslb.com/bfs/face/ec98b6458cdc8fdde2a72f705151b0e81cadff71.jpg',
// //   worksNum: 20
// // }, 1, 'music').then(console.log);
// // console.log(
// //   getRid({
// //     mid: 12866223,
// //     ps: 30,
// //     tid: 0,
// //     pn: 1,
// //     keyword: "",
// //     order: "pubdate",
// //     platform: "web",
// //     web_location: 1550101,
// //     order_avoided: true,
// //     dm_img_list: [],
// //     dm_img_str: "V2ViR0wgMS4wIChPcGVuR0wgRVMgMi4wIENocm9taXVtKQ",
// //     dm_cover_img_str:
// //       "QU5HTEUgKE5WSURJQSwgTlZJRElBIEdlRm9yY2UgR1RYIDE2NTAgKDB4MDAwMDFGOTEpIERpcmVjdDNEMTEgdnNfNV8wIHBzXzVfMCwgRDNEMTEpR29vZ2xlIEluYy4gKE5WSURJQS",
// //     wts: 1701483964,
// //   })
// // );
"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
          resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(thisArg, _arguments || [])).next()
      );
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const dayjs = require("dayjs");
const he = require("he");
const CryptoJs = require("crypto-js");
const headers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
  accept: "*/*",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
};
let cookie;
function getCid(bvid, aid) {
  return __awaiter(this, void 0, void 0, function* () {
    const params = bvid
      ? {
        bvid: bvid,
      }
      : {
        aid: aid,
      };
    const cidRes = (yield axios_1.default.get(
      "https://api.bilibili.com/x/web-interface/view?%s",
      {
        headers: headers,
        params: params,
      }
    )).data;
    return cidRes;
  });
}
function durationToSec(duration) {
  if (typeof duration === "number") {
    return duration;
  }
  if (typeof duration === "string") {
    var dur = duration.split(":");
    return dur.reduce(function (prev, curr) {
      return 60 * prev + +curr;
    }, 0);
  }
  return 0;
}
const searchHeaders = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
  accept: "application/json, text/plain, */*",
  "accept-encoding": "gzip, deflate, br",
  origin: "https://search.bilibili.com",
  "sec-fetch-site": "same-site",
  "sec-fetch-mode": "cors",
  "sec-fetch-dest": "empty",
  referer: "https://search.bilibili.com/",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
};
function getCookie() {
  return __awaiter(this, void 0, void 0, function* () {
    if (!cookie) {
      cookie = (yield axios_1.default.get(
        "https://api.bilibili.com/x/frontend/finger/spi",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/114.0.0.0",
          },
        }
      )).data.data;
    }
  });
}
const pageSize = 20;
function searchBase(keyword, page, searchType) {
  return __awaiter(this, void 0, void 0, function* () {
    yield getCookie();
    const params = {
      context: "",
      page: page,
      order: "",
      page_size: pageSize,
      keyword: keyword,
      duration: "",
      tids_1: "",
      tids_2: "",
      __refresh__: true,
      _extra: "",
      highlight: 1,
      single_column: 0,
      platform: "pc",
      from_source: "",
      search_type: searchType,
      dynamic_offset: 0,
    };
    const res = (yield axios_1.default.get(
      "https://api.bilibili.com/x/web-interface/search/type",
      {
        headers: Object.assign(Object.assign({}, searchHeaders), {
          cookie: `buvid3=${cookie.b_3};buvid4=${cookie.b_4}`,
        }),
        params: params,
      }
    )).data;
    return res.data;
  });
}
function getFavoriteList(id) {
  return __awaiter(this, void 0, void 0, function* () {
    const result = [];
    const pageSize = 20;
    let page = 1;
    while (true) {
      try {
        const {
          data: {
            data: { medias, has_more },
          },
        } = yield axios_1.default.get(
          "https://api.bilibili.com/x/v3/fav/resource/list",
          {
            params: {
              media_id: id,
              platform: "web",
              ps: pageSize,
              pn: page,
            },
          }
        );
        result.push(...medias);
        if (!has_more) {
          break;
        }
        page += 1;
      } catch (error) {
        console.warn(error);
        break;
      }
    }
    return result;
  });
}
function formatMedia(result) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  return {
    id:
      (_b =
        (_a = result.cid) !== null && _a !== void 0
          ? _a
          : result.bvid) !== null && _b !== void 0
        ? _b
        : result.aid,
    aid: result.aid,
    bvid: result.bvid,
    artist:
      (_c = result.author) !== null && _c !== void 0
        ? _c
        : (_d = result.owner) === null || _d === void 0
          ? void 0
          : _d.name,
    title: he.decode(
      (_f =
        (_e = result.title) === null || _e === void 0
          ? void 0
          : _e.replace(/(\<em(.*?)\>)|(\<\/em\>)/g, "")) !== null &&
        _f !== void 0
        ? _f
        : ""
    ),
    album: (_g = result.bvid) !== null && _g !== void 0 ? _g : result.aid,
    artwork: (
      (_h = result.pic) === null || _h === void 0
        ? void 0
        : _h.startsWith("//")
    )
      ? "http:".concat(result.pic)
      : result.pic,
    description: result.description,
    duration: durationToSec(result.duration),
    tags:
      (_j = result.tag) === null || _j === void 0
        ? void 0
        : _j.split(","),
    date: dayjs.unix(result.pubdate || result.created).format("YYYY-MM-DD"),
  };
}
function searchAlbum(keyword, page) {
  return __awaiter(this, void 0, void 0, function* () {
    const resultData = yield searchBase(keyword, page, "video");
    const albums = resultData.result.map(formatMedia);
    return {
      isEnd: resultData.numResults <= page * pageSize,
      data: albums,
    };
  });
}
function searchArtist(keyword, page) {
  return __awaiter(this, void 0, void 0, function* () {
    const resultData = yield searchBase(keyword, page, "bili_user");
    const artists = resultData.result.map((result) => ({
      name: result.uname,
      id: result.mid,
      fans: result.fans,
      description: result.usign,
      avatar: result.upic,
      worksNum: result.videos,
    }));
    return {
      isEnd: resultData.numResults <= page * pageSize,
      data: artists,
    };
  });
}
function getMixinKey(e) {
  var t = [];
  return (
    [
      46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43,
      5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16,
      24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59,
      6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
    ].forEach(function (r) {
      e.charAt(r) && t.push(e.charAt(r));
    }),
    t.join("").slice(0, 32)
  );
}
function getRid(params) {
  const npi =
    "4a1d4479a1ea4146bc7552eea71c28e9fa5812e23a204d10b332dc24d992432d";
  const o = getMixinKey(npi);
  const l = Object.keys(params).sort();
  let c = [];
  for (let d = 0, u = /[!'\(\)*]/g; d < l.length; ++d) {
    let [h, p] = [l[d], params[l[d]]];
    p && "string" == typeof p && (p = p.replace(u, "")),
      null != p &&
      c.push(
        ""
          .concat(encodeURIComponent(h), "=")
          .concat(encodeURIComponent(p))
      );
  }
  const f = c.join("&");
  const w_rid = CryptoJs.MD5(f + o).toString();
  return w_rid;
}
function getArtistWorks(artistItem, page, type) {
  return __awaiter(this, void 0, void 0, function* () {
    const queryHeaders = {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br",
      origin: "https://space.bilibili.com",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: `https://space.bilibili.com/${artistItem.id}/video`,
      "accept-language":
        "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    };
    yield getCookie();
    const now = Math.round(Date.now() / 1e3);
    const params = {
      mid: artistItem.id,
      ps: 30,
      tid: 0,
      pn: page,
      web_location: 1550101,
      order_avoided: true,
      order: "pubdate",
      platform: "web",
      wts: now.toString(),
    };
    const w_rid = getRid(params);
    const res = (yield axios_1.default.get(
      "https://api.bilibili.com/x/space/wbi/arc/search",
      {
        headers: Object.assign(Object.assign({}, queryHeaders), {
          cookie: `buvid3=${cookie.b_3};buvid4=${cookie.b_4}`,
        }),
        params: Object.assign(Object.assign({}, params), { w_rid }),
      }
    )).data;
    const resultData = res.data;
    const albums = resultData.list.vlist.map(formatMedia);
    return {
      isEnd:
        resultData.page.pn * resultData.page.ps >=
        resultData.page.count,
      data: albums,
    };
  });
}
function getMediaSource(musicItem, quality) {
  var _a;
  return __awaiter(this, void 0, void 0, function* () {
    let cid = musicItem.cid;
    if (!cid) {
      cid = (yield getCid(musicItem.bvid, musicItem.aid)).data.cid;
    }
    const _params = musicItem.bvid
      ? {
        bvid: musicItem.bvid,
      }
      : {
        aid: musicItem.aid,
      };
    const res = (yield axios_1.default.get(
      "https://api.bilibili.com/x/player/playurl",
      {
        headers: headers,
        params: Object.assign(Object.assign({}, _params), {
          cid: cid,
          fnval: 16,
        }),
      }
    )).data;
    let url;
    if (res.data.dash) {
      const audios = res.data.dash.audio;
      audios.sort((a, b) => a.bandwidth - b.bandwidth);
      switch (quality) {
        case "low":
          url = audios[0].baseUrl;
          break;
        case "standard":
          url = audios[1].baseUrl;
          break;
        case "high":
          url = audios[2].baseUrl;
          break;
        case "super":
          url = audios[3].baseUrl;
          break;
      }
    } else {
      url = res.data.durl[0].url;
    }
    const hostUrl = url.substring(url.indexOf("/") + 2);
    const _headers = {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63",
      accept: "*/*",
      host: hostUrl.substring(0, hostUrl.indexOf("/")),
      "accept-encoding": "gzip, deflate, br",
      connection: "keep-alive",
      referer: "https://www.bilibili.com/video/".concat(
        (_a =
          musicItem.bvid !== null && musicItem.bvid !== undefined
            ? musicItem.bvid
            : musicItem.aid) !== null && _a !== void 0
          ? _a
          : ""
      ),
    };
    return {
      url: url,
      headers: _headers,
    };
  });
}
function getTopLists() {
  return __awaiter(this, void 0, void 0, function* () {
    const precious = {
      title: "入站必刷",
      data: [
        {
          id: "popular/precious?page_size=100&page=1",
          title: "入站必刷",
          coverImg:
            "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_history.png",
        },
      ],
    };
    const weekly = {
      title: "每周必看",
      data: [],
    };
    const weeklyRes = yield axios_1.default.get(
      "https://api.bilibili.com/x/web-interface/popular/series/list",
      {
        headers: Object.assign(Object.assign({}, headers), {
          referer: "https://www.bilibili.com/",
        }),
      }
    );
    weekly.data = weeklyRes.data.data.list.slice(0, 8).map((e) => ({
      id: `popular/series/one?number=${e.number}`,
      title: e.subject,
      description: e.name,
      coverImg:
        "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_weekly.png",
    }));
    const boardKeys = [
      {
        id: "ranking/v2?rid=0&type=all",
        title: "全站",
      },
      {
        id: "ranking/v2?rid=3&type=all",
        title: "音乐",
      },
      {
        id: "ranking/v2?rid=1&type=all",
        title: "动画",
      },
      {
        id: "ranking/v2?rid=119&type=all",
        title: "鬼畜",
      },
      {
        id: "ranking/v2?rid=168&type=all",
        title: "国创相关",
      },
      {
        id: "ranking/v2?rid=129&type=all",
        title: "舞蹈",
      },
      {
        id: "ranking/v2?rid=4&type=all",
        title: "游戏",
      },
      {
        id: "ranking/v2?rid=36&type=all",
        title: "知识",
      },
      {
        id: "ranking/v2?rid=188&type=all",
        title: "科技",
      },
      {
        id: "ranking/v2?rid=234&type=all",
        title: "运动",
      },
      {
        id: "ranking/v2?rid=223&type=all",
        title: "汽车",
      },
      {
        id: "ranking/v2?rid=160&type=all",
        title: "生活",
      },
      {
        id: "ranking/v2?rid=211&type=all",
        title: "美食",
      },
      {
        id: "ranking/v2?rid=217&type=all",
        title: "动物圈",
      },
      {
        id: "ranking/v2?rid=115&type=all",
        title: "时尚",
      },
      {
        id: "ranking/v2?rid=5&type=all",
        title: "娱乐",
      },
      {
        id: "ranking/v2?rid=181&type=all",
        title: "影视",
      },
      {
        id: "ranking/v2?rid=0&type=origin",
        title: "原创",
      },
      {
        id: "ranking/v2?rid=0&type=rookie",
        title: "新人",
      },
    ];
    const board = {
      title: "排行榜",
      data: boardKeys.map((_) =>
        Object.assign(Object.assign({}, _), {
          coverImg:
            "https://s1.hdslb.com/bfs/static/jinkela/popular/assets/icon_rank.png",
        })
      ),
    };
    return [weekly, precious, board];
  });
}
function getTopListDetail(topListItem) {
  return __awaiter(this, void 0, void 0, function* () {
    const res = yield axios_1.default.get(
      `https://api.bilibili.com/x/web-interface/${topListItem.id}`,
      {
        headers: Object.assign(Object.assign({}, headers), {
          referer: "https://www.bilibili.com/",
        }),
      }
    );
    return Object.assign(Object.assign({}, topListItem), {
      musicList: res.data.data.list.map(formatMedia),
    });
  });
}
function importMusicSheet(urlLike) {
  var _a, _b, _c, _d;
  return __awaiter(this, void 0, void 0, function* () {
    let id;
    if (!id) {
      id =
        (_a = urlLike.match(/^\s*(\d+)\s*$/)) === null || _a === void 0
          ? void 0
          : _a[1];
    }
    if (!id) {
      id =
        (_b = urlLike.match(/^(?:.*)fid=(\d+).*$/)) === null ||
          _b === void 0
          ? void 0
          : _b[1];
    }
    if (!id) {
      id =
        (_c = urlLike.match(/\/playlist\/pl(\d+)/i)) === null ||
          _c === void 0
          ? void 0
          : _c[1];
    }
    if (!id) {
      id =
        (_d = urlLike.match(/\/list\/ml(\d+)/i)) === null ||
          _d === void 0
          ? void 0
          : _d[1];
    }
    if (!id) {
      return;
    }
    const musicSheet = yield getFavoriteList(id);
    return musicSheet.map((_) => {
      var _a, _b;
      return {
        id: _.id,
        aid: _.aid,
        bvid: _.bvid,
        artwork: _.cover,
        title: _.title,
        artist:
          (_a = _.upper) === null || _a === void 0 ? void 0 : _a.name,
        album: (_b = _.bvid) !== null && _b !== void 0 ? _b : _.aid,
        duration: durationToSec(_.duration),
      };
    });
  });
}
export default {
  platform: "bilibili",
  appVersion: ">=0.0",
  version: "0.1.6",
  defaultSearchType: "album",
  cacheControl: "no-cache",
  srcUrl: "https://gitee.com/maotoumao/MusicFreePlugins/raw/v0.1/dist/bilibili/index.js",
  primaryKey: ["id", "aid", "bvid", "cid"],
  hints: {
    importMusicSheet: [
      "bilibili 移动端：APP点击我的，空间，右上角分享，复制链接，浏览器打开切换桌面版网站，点击播放全部视频，复制链接",
      "bilibili H5/PC端：复制收藏夹URL，或者直接输入ID即可",
      "非公开收藏夹无法导入，编辑收藏夹改为公开即可",
      "导入时间和歌单大小有关，请耐心等待",
    ],
  },
  search(keyword, page, type) {
    return __awaiter(this, void 0, void 0, function* () {
      if (type === "album" || type === "music") {
        return yield searchAlbum(keyword, page);
      }
      if (type === "artist") {
        return yield searchArtist(keyword, page);
      }
    });
  },
  getMediaSource,
  getAlbumInfo(albumItem) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const cidRes = yield getCid(albumItem.bvid, albumItem.aid);
      const _ref2 =
        (_a =
          cidRes === null || cidRes === void 0
            ? void 0
            : cidRes.data) !== null && _a !== void 0
          ? _a
          : {};
      const cid = _ref2.cid;
      const pages = _ref2.pages;
      let musicList;
      if (pages.length === 1) {
        musicList = [
          Object.assign(Object.assign({}, albumItem), { cid: cid }),
        ];
      } else {
        musicList = pages.map(function (_) {
          return Object.assign(Object.assign({}, albumItem), {
            cid: _.cid,
            title: _.part,
            duration: durationToSec(_.duration),
            id: _.cid,
          });
        });
      }
      return {
        musicList,
      };
    });
  },
  getArtistWorks,
  getTopLists,
  getTopListDetail,
  importMusicSheet,
};
