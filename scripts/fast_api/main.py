from fastapi import FastAPI
from pydantic import BaseModel
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_ibm import WatsonxEmbeddings
from pymilvus import MilvusClient
from openai import OpenAI

app = FastAPI()

credentials = {
    "url": "https://eu-gb.ml.cloud.ibm.com",
    "apikey": "bHJ7kUS3U7bIJ2oncxw9QN0pzlxYe0bpo2P5cX5S8haQ"
}

project_id = "a3cfda9a-7246-47f7-a5b2-1ef431af9741"

# Embedding
embedding = WatsonxEmbeddings(
    model_id="ibm/slate-30m-english-rtrvr",
    url=credentials.get('url'),
    apikey=credentials.get('apikey'),
    project_id=project_id
)

'''
# load document
loader = TextLoader("resources/docs.txt")
documents = loader.load()

# change into strings
texts = [doc.page_content for doc in documents]

# split strings
text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=0)
split_texts = text_splitter.split_text("\n".join(texts))

# generate embeddings
embeddings = embedding.embed_documents(texts=split_texts)
'''

# =========================== Milvus ==============================
client = MilvusClient("./milvus_demo.db")

'''
client.create_collection(
    collection_name="demo_collection",
    dimension=len(embeddings[0])
)

data = [ {"id": i, "vector": embeddings[i], "text": split_texts[i]} for i in range(len(embeddings)) ]
res = client.insert(
    collection_name="demo_collection",
    data=data
)
'''

# ============================= Request ============================

class QueryRequest(BaseModel):
    query: str

# ============================== Main ===============================
@app.post("/webhook")
async def webhook(payload: QueryRequest):

    original_query = payload.query
    vectors = embedding.embed_documents(texts=[original_query])

    res = client.search(
        collection_name="demo_collection",
        data=[vectors[0]],
        limit=2,
        output_fields=["text"],
    )

    knowledge = ""
    for context in res[0]:
        knowledge = knowledge + context.get('entity').get('text') + "\n"

    context = "You are a helpful assistant for University of Nottingham freshmen, you need to answer the question in details. \nAnd here are some background information for the questions the user going to ask:"
    final_query = context + knowledge + ". \nAnd this is the question:"+ original_query + " \nAnswer in full sentence and provide a detailed suggestion:"

    ai_client = OpenAI(api_key="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")

    re = ai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful duck assistant called Nock for University of Nottingham freshmen, you need to answer the question in details and give some suggestions."
                + "\nAnd here are some background information for the question the user going to ask:" + knowledge
            },
            {
                "role": "user",
                "content": original_query
            }
        ]
    )

    return {"result": re.choices[0].message.content}

