import { useState } from "react";

const [queue, setQueue] = useState(["⭐ ", "🌙 ", "⭐ ", "🌙 ", "⭐ ", "🌕 "]);
const [isLooping, setIsLooping] = useState(false);
const [loopCurrent, setLoopCurrent] = useState(0);
const [loopQueue, setLoopQueue] = useState<string[]>([]);