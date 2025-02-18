"use server"

import {NextResponse} from "next/server";

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2025-02-18',
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY
    }),
    serviceUrl: process.env.APIURL
})

export async function POST(request) {
    let data = await request.json()

    let params = {
        assistantId: '7b6004ec-9cf4-4631-a286-fac63052422d',
        sessionId: data.session_id,
        input: {
            'message_type': 'text',
            'text': data.message
        }
    }


    try {
        const res = await assistant.message(params)

        // Log response
        console.log(JSON.stringify(res.result.output.generic))

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

        // Return response
        return NextResponse.json({
            payload: res.result,
            texts: textResponses.length > 0? textResponses : null,
            options: options,
            suggestions: suggestions,
            status: "INPUT_SUCCESS"
        })
    } catch (err) {
        // Handle errors
        console.log(JSON.stringify(err))
        return NextResponse.json({
            status: "INPUT_FAIL"
        })
    }

}