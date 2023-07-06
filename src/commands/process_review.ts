import button from '../styles/button';
import { codeBlock } from '../styles/codeBlock';
import { responseText } from '../styles/responseText';
import { select } from '../styles/select';
import {ClientService} from '../validate';
import { marked } from 'marked';

export async function process_review(code: string, language: string, arch: string) {
   const userLanguage = "pt-br"
   const validate = new ClientService()
   const response = await validate.validate([`você poderia falar em uma lista o que pode melhorar no código de programação abaixo utilizando a linguagem de programação ${language} segundo os principios ${arch}: ${code}`, `Poderia dar uma sugestão para esse código em ${language} segundo os principios ${arch}, mande apenas o código: ${code}`]);
   const text = marked.parse(response.text, { gfm: true, breaks: true  });

   return {
      html:`<h2>Revisão do Código - ${arch}:</h2>${codeBlock(replaceAll(code, " ", "&ensp;"))}${responseText(text)}<h2>Sugestão:</h2>${codeBlock(replaceAll(response.suggestion, " ", "&ensp;"))}<br>${button("Substituir sugestão")}<br>${select(arch)}`,
      suggestion: response.suggestion,
   };
}

function replaceAll(text: string, replacer: string, replacement:string){
   return text.replace(new RegExp(replacer, 'g'), replacement);
}