import * as vscode from 'vscode';
import { review } from './commands/review';

let webview: vscode.WebviewPanel;
let arch = "SOLID"
let can_review = true

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "hackathon-gpt" is now active!');

	let disposable = vscode.commands.registerCommand('hackathon-gpt.review', async () => {
		if(!can_review) return;
		can_review = false

		var editor = vscode.window.activeTextEditor;
		if (!editor) {
		   vscode.window.showErrorMessage("Nenhum editor ativo")
		   return;
		}
		var selection = editor.selection;
		to_review(selection, editor, arch)

		can_review = true
	});

	context.subscriptions.push(disposable);
}

async function to_review(selection: vscode.Selection, editor: vscode.TextEditor, arch: string){
	if(webview) webview.dispose();
	webview = await review(selection, editor, arch, (newArch) => {
		arch = newArch
		to_review(selection, editor, arch)
	})
}

export function deactivate() {}
