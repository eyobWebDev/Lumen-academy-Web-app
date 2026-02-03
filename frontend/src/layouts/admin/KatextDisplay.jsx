import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";




export default function KatextDisplay() {
    const [value, setValue] = useState("");

    return <div>
        <div>
            <textarea className="input" value={value} onChange={(e) => setValue(e.target.value)} ></textarea>
            <button className="btn btn-error">TRY</button>
        </div>
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={value} />
    </div>
}