export default function button(text: string){
    return `
    <script>
        function replace_code() {
            document.getElementById("button-replace").innerText = "Aguarde...";
            const vscode = acquireVsCodeApi();
            if (!vscode) 
                document.getElementById("button-replace").innerText = "ERROR!";
            vscode.postMessage({
                command: 'replace'
            })
            document.getElementById("button-replace").innerText = "Feito!";
        }
    </script>
    <button style="width: 100%; font-size: 16px; display: block;padding: 10px 20px;font-size: 16px;font-weight: bold;text-align: center;text-decoration: none;background-color: #4CAF50;color: #FFFFFF;border-radius: 4px;border: none;transition: background-color 0.3s ease;cursor: pointer;" 
        id="button-replace" onclick="replace_code()">
        ${text}
    </button>
`
}