"use server"

import {NextResponse} from "next/server";

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
    version: '2025-02-12',
    authenticator: new IamAuthenticator({
        apikey: "qlbsVOz1nD7krY8DoaMPl17cttyVdpqhwlHczoj-W0Hz"
    }),
    serviceUrl: "https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/f0d47658-0d2a-4a9e-a2b0-454062c0bf3d"
})

export async function GET(request) {
    try {
        const res = await assistant.createSession({
            assistantId: '7b6004ec-9cf4-4631-a286-fac63052422d'
        })

        return NextResponse.json({
            payload: res.result.session_id
        })
    } catch (err) {
        console.log(err)
        return NextResponse.json({
            message: "There was an error handling your request."
        })
    }
}
