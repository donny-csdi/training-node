"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prismaClient_config_1 = __importDefault(require("../config/prismaClient.config"));
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var promo, tags, article, car1, car2, iklan1, iklan2, blog1, blog2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_config_1.default.promo.create({
                    data: {
                        title: "Summar Sale",
                    },
                })];
            case 1:
                promo = _a.sent();
                return [4 /*yield*/, Promise.all([
                        prismaClient_config_1.default.tag.create({
                            data: {
                                name: "Technology",
                            },
                        }),
                        prismaClient_config_1.default.tag.create({
                            data: {
                                name: "Lifestyle",
                            },
                        }),
                    ])];
            case 2:
                tags = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.article.create({
                        data: {
                            title: "Getting Started with Prisma",
                            content: "This is a sample article about Prisma...",
                            promoId: promo.id,
                            articleTags: {
                                create: tags.map(function (tag) { return ({
                                    tagId: tag.id,
                                }); }),
                            },
                        },
                    })];
            case 3:
                article = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.car.create({
                        data: {
                            image: "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1717558.PNG",
                            name: "Toyota Camry",
                            model: "2023",
                            variant: "Hybrid",
                            price: 30000,
                            isNew: true,
                        },
                    })];
            case 4:
                car1 = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.car.create({
                        data: {
                            image: "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1717531.PNG",
                            name: "Honda Accord",
                            model: "2022",
                            variant: "Sport",
                            price: 27000,
                            isNew: false,
                        },
                    })];
            case 5:
                car2 = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.iklan.create({
                        data: {
                            name: "Promo Akhir Tahun",
                            content: "Dapatkan diskon besar untuk pembelian mobil baru.",
                            discount: 15.0,
                            image: "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767619.JPG",
                            carId: car1.id,
                        },
                    })];
            case 6:
                iklan1 = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.iklan.create({
                        data: {
                            name: "Promo Musim Panas",
                            content: "Diskon khusus untuk mobil bekas.",
                            discount: 10.0,
                            image: "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767421.JPG",
                            carId: car2.id,
                        },
                    })];
            case 7:
                iklan2 = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.blog.create({
                        data: {
                            title: "Tips Memilih Mobil Baru",
                            desc: "Panduan lengkap memilih mobil baru yang sesuai dengan kebutuhan Anda.",
                            content: "Isi konten blog di sini...",
                            image: "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/Banner-Wisata-Klaten.webp",
                            cars: {
                                connect: [{ id: car1.id }, { id: car2.id }],
                            },
                        },
                    })];
            case 8:
                blog1 = _a.sent();
                return [4 /*yield*/, prismaClient_config_1.default.blog.create({
                        data: {
                            title: "Perawatan Mobil Bekas",
                            desc: "Cara merawat mobil bekas agar tetap awet dan nyaman dikendarai.",
                            content: "Isi konten blog di sini...",
                            image: "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/oleh-oleh-batam.webp",
                            cars: {
                                connect: [{ id: car2.id }],
                            },
                        },
                    })];
            case 9:
                blog2 = _a.sent();
                console.log({
                    promo: promo,
                    tags: tags,
                    article: article,
                    car1: car1,
                    car2: car2,
                    iklan1: iklan1,
                    iklan2: iklan2,
                    blog1: blog1,
                    blog2: blog2,
                });
                return [2 /*return*/];
        }
    });
}); };
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_config_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=seed.js.map