import { testClaude } from "../../claude.js"

export default function Nutrition() {
    return (
        <button onClick = {() => testClaude("tell me the calories and protein in eggs")}>Test Claude</button>
    )
}