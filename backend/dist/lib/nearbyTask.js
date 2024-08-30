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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearbyTasks = void 0;
const TaskGiver_model_1 = __importDefault(require("../Model/TaskGiver.model")); // Adjust the path to your Task model
const getNearbyTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitude } = req.query; // Get coordinates from the query
        const tasks = yield TaskGiver_model_1.default.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(longitude), parseFloat(latitude)], // Coordinates
                        2 / 6378 // 2km radius in radians
                    ]
                }
            }
        });
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error finding tasks:', error);
        return res.status(500).json({ error: 'Failed to find tasks' });
    }
});
exports.getNearbyTasks = getNearbyTasks;
