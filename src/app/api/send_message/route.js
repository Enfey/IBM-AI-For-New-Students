/*
 * This api route is used to handle user input and return the response from Watson Assistant.
 * The input message and output response are translated into the user language if the input language is not English.
 */

import {NextResponse} from "next/server";
import {franc} from "franc";

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

export const dynamic = 'force-dynamic';

const assistant = new AssistantV2({
    version: '2025-04-02',
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY
    }),
    serviceUrl: process.env.APIURL
})

export async function POST(request) {
    let data = await request.json()

    // Check if message is English or not
    const lang = franc(data.message) ;

    // Add a short judgement if the message is too short
    let shortJudgement = false;
    if (data.message.length < 30 && /^[a-zA-Z\s]+$/.test(data.message)) {
        shortJudgement = true;
    }

    // make the translation
    let transText;

    if ((lang !== 'eng'|| lang === 'und') && !shortJudgement) {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.TRANSLATION_API_KEY
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional translator. Translate all user input to English."
                    },
                    {
                        role: "user",
                        content: data.message
                    }
                ],
                temperature: 0.3
            })
        });

        const result = await response.json();
        transText = result.choices[0].message.content;
    } else {
        transText = data.message;
    }

    // Clean up the translation invalid characters
    transText = String(transText).replace(/[\t\r\n]/g, ' ').replace(/\s+/g, ' ').trim();

    let params = {
        assistantId: '7b6004ec-9cf4-4631-a286-fac63052422d',
        sessionId: data.session_id,
        input: {
            'message_type': 'text',
            'text': transText,
            'options': {
                return_context : true
            }
        }
    }


    try {
        const res = await assistant.message(params)

        // Log response
        console.log(JSON.stringify(res.result))

        // Extract text responses
        let textResponses = [];
        textResponses = res.result.output.generic
            .filter(item => item.response_type === "text")
            .map(item => item.text);

        // Extract options
        let options = [];
        const optionItems = res.result.output.generic.find(item => item.response_type === "option");
        if (optionItems && optionItems.options) {
            options = optionItems.options.map(opt => opt.label);
        }

        // Extract suggestions
        let suggestions = [];
        const suggestionItems = res.result.output.generic.find(item => item.response_type === "suggestion");
        if (suggestionItems && suggestionItems.suggestions) {
            suggestions = suggestionItems.suggestions.map(sug => sug.label);
        }

        let sessionVariables = res.result.context.skills["actions skill"].skill_variables


        // Translate the output back to user language
        let transRes;

        if ((lang !== 'eng') && !shortJudgement && textResponses.length > 0) {
           const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
                   "Authorization": "Bearer " + process.env.TRANSLATION_API_KEY
               },
               body: JSON.stringify({
                   model: "deepseek-chat",
                   messages: [
                       {
                           role: "system",
                           content: "You are a professional translator only output the pure translation without any suggestion or options.. Translate all following responses into the same language as this sentence:" + data.message
                       },
                       {
                           role: "user",
                           content: textResponses.join(" ")
                       }
                   ],
                   temperature: 0.3
               })
           });

           const result = await response.json();
           transRes = result.choices[0].message.content;

            console.log("Translation result raw:", JSON.stringify(result));
            console.log("Translated response: ", transRes);

        } else {
           transRes = data.message;
        }

        // Return response
        return NextResponse.json({
            payload: res.result,
            texts: textResponses.length > 0? transRes: null,
            options: options,
            suggestions: suggestions,
            location: sessionVariables["target_location"],
            status: "INPUT_SUCCESS"
        })
    } catch (err) {
        // Handle errors
        console.log("err happened")
        console.log(JSON.stringify(err))
        return NextResponse.json({
            status: "INPUT_FAIL"
        })
    }

}