"use server"

import {NextResponse} from "next/server";

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2025-02-12',
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
        return NextResponse.json({
            payload: res.result,
            status: "INPUT_SUCCESS"
        })
    } catch (err) {
        return NextResponse.json({
            status: "INPUT_FAIL"
        })
    }
}