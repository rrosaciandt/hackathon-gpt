export function select(arch: string){
    return `
        <script>
            function select_style(value) {
                const vscode = acquireVsCodeApi();
                vscode.postMessage({
                    command: 'change_style',
                    text: value
                })
            }
        </script>
        <select value="${arch}" style="display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            width: 100%;
            font-weight: bold;
            text-align: center;
            background-color: #121212;
            border: 1px solid #fff;
            color: #FFFFFF;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            cursor: pointer;" onchange="select_style(value)">
            <option ${arch == "SOLID" ? "selected" : ""} value="SOLID">SOLID</option>
            <option ${arch == "Clean Code" ? "selected" : ""} value="Clean Code">Clean Code</option>
            <option ${arch == "DRY" ? "selected" : ""} value="DRY">Dry</option>
            <option ${arch == "KISS" ? "selected" : ""} value="KISS">Kiss</option>
            <option ${arch == "YAGNI" ? "selected" : ""} value="YAGNI">Yagni</option>
        </select>
      `
}