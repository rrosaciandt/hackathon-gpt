import button from '../styles/button';
import * as vscode from 'vscode';
import { codeBlock } from '../styles/codeBlock';
import { responseText } from '../styles/responseText';
import { marked } from 'marked';
import {process_review} from './process_review';

export async function review(selection: vscode.Selection, editor: vscode.TextEditor, arch: string, change_arch: (arch: string) => void): Promise<vscode.WebviewPanel>{
   return new Promise((resolve) => {
      vscode.window.withProgress({
         location: vscode.ProgressLocation.Notification,
         title: 'Revisando o código...',
         cancellable: false
      }, async (progress) => {
         var userLanguage = vscode.env.language
         var text = editor.document.getText(selection);
         var language = editor.document.languageId;

         var reviewText = await process_review(text, language, arch);
         
         const webview = vscode.window.createWebviewPanel("codeReview", "Code Review", {viewColumn: vscode.ViewColumn.Beside, preserveFocus: true}, { enableScripts: true });
         webview.webview.html = reviewText.html;
         webview.webview.onDidReceiveMessage(message => {
               console.log(message.command);
               switch (message.command) {
                  case 'replace':
                     editor.edit(editBuilder => {
                        editBuilder.replace(selection, reviewText.suggestion);
                     });
                     break;
                  case 'change_style':
                     change_arch(message.text);
                     break;
               }
            });
         resolve(webview);
      })
   })
}