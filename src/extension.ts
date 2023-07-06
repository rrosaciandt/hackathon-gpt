import * as vscode from 'vscode';
import { review } from './commands/review';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "hackathon-gpt" is now active!');

	let disposable = vscode.commands.registerCommand('hackathon-gpt.review', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) return;

		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var language = editor.document.languageId;
		var reviewText = review(text, language);

		let webview = vscode.window.createWebviewPanel("codeReview", "Code Review", {viewColumn: vscode.ViewColumn.Beside, preserveFocus: true}, { enableScripts: true });
		webview.webview.html = reviewText;
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
