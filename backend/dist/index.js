"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * note eta just beta project so please dont judge my spaghetti code
 * and arekta secret ami ashole production e test kori , :> but eibar tester on kora lagbbe , so choose your expertise
 * 10-aug-24
 */
const cors_1 = __importDefault(require("cors"));
const credential_1 = __importStar(require("./Middleware/credential"));
const express_1 = __importDefault(require("express"));
const logger_1 = require("./Middleware/logger");
const app = (0, express_1.default)();
const userRoute_1 = __importDefault(require("./Route/userRoute"));
const moongoose_1 = require("./Config/moongoose");
const PORT = 9000;
/**
 * this is the watcher , well not that good but at least somet'n
 */
app.use(logger_1.logger);
app.use(credential_1.default);
app.use((0, cors_1.default)(credential_1.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// just for the starter delete this not required !
app.use('/api/v1', userRoute_1.default);
// app.use('/', (req, res) => {
//   res.send('Hello Dakath!')
// })
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // database calling 
        yield (0, moongoose_1.connectionToDatabase)();
        app.listen(PORT, () => {
            // maybe remove when on live ?
            console.log(`Server started at : http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error(error);
    }
});
startServer();
