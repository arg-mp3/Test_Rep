
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from knowledge_graph.graph import KnowledgeGraph

app = FastAPI()

# Initialize the Knowledge Graph
graph = KnowledgeGraph()

# Data Models
class Node(BaseModel):
    id: str
    data: dict

class Edge(BaseModel):
    source: str
    target: str

class Query(BaseModel):
    question: str